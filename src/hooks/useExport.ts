import { useCallback, useRef } from 'react'
import { useExportStore } from '../store/exportStore'
import { exportCanvasToPng, exportAllSizes } from '../lib/exportPipeline'
import { EXPORT_SIZE_PRESETS } from '../constants/exportSizes'
import { useDesignCollectionStore } from '../store/designCollectionStore'
import { loadEditorState } from '../lib/editorStateUtils'

export function useExport() {
  const canvasRef = useRef<HTMLDivElement>(null)

  const exportCurrent = useCallback(async () => {
    if (!canvasRef.current) return
    const { customWidth: width, customHeight: height } = useExportStore.getState()

    // Save current state before export loop
    useDesignCollectionStore.getState().saveActiveDesignState()
    const { designs, activeDesignId } = useDesignCollectionStore.getState()

    useExportStore.getState().setExporting(true)
    useExportStore.getState().setProgress(0)

    try {
      for (let i = 0; i < designs.length; i++) {
        const design = designs[i]!
        // Load each design's state into the editor
        loadEditorState(design.state)
        // Wait for React to re-render the canvas
        await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))
        await new Promise(r => setTimeout(r, 300))

        await exportCanvasToPng(canvasRef.current, {
          targetWidth: width,
          targetHeight: height,
          filename: `opengradient-${design.name.replace(/\s+/g, '-').toLowerCase()}-${width}x${height}.png`,
        })
        useExportStore.getState().setProgress(((i + 1) / designs.length) * 100)
        if (i < designs.length - 1) {
          await new Promise(r => setTimeout(r, 200))
        }
      }
    } finally {
      // Restore the original active design
      const activeDesign = designs.find(d => d.id === activeDesignId)
      if (activeDesign) loadEditorState(activeDesign.state)
      useExportStore.getState().setExporting(false)
      useExportStore.getState().setProgress(0)
    }
  }, [])

  const exportAll = useCallback(async () => {
    if (!canvasRef.current) return
    const sizes = EXPORT_SIZE_PRESETS.filter(p => p.id !== 'custom')
    useExportStore.getState().setExporting(true)
    useExportStore.getState().setProgress(0)
    try {
      await exportAllSizes(canvasRef.current, sizes, (percent) => {
        useExportStore.getState().setProgress(percent)
      })
    } finally {
      useExportStore.getState().setExporting(false)
      useExportStore.getState().setProgress(0)
    }
  }, [])

  return { canvasRef, exportCurrent, exportAll }
}
