import { useCallback, useRef } from 'react'
import { useExportStore } from '../store/exportStore'
import { exportCanvasToPng, exportAllSizes } from '../lib/exportPipeline'
import { EXPORT_SIZE_PRESETS } from '../constants/exportSizes'
import { useDesignCollectionStore } from '../store/designCollectionStore'
import { loadEditorState } from '../lib/editorStateUtils'
import { captureThumbnail } from '../lib/thumbnailCapture'

export function useExport() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { getActiveDimensions, setExporting, setProgress } = useExportStore()

  const exportCurrent = useCallback(async () => {
    if (!canvasRef.current) return
    const { width, height } = getActiveDimensions()

    // Capture thumbnail of active design before export loop
    try {
      const activeId = useDesignCollectionStore.getState().activeDesignId
      const thumb = await captureThumbnail(canvasRef.current)
      useDesignCollectionStore.getState().setThumbnail(activeId, thumb)
    } catch {}

    // Save current state before export loop
    useDesignCollectionStore.getState().saveActiveDesignState()
    const { designs, activeDesignId } = useDesignCollectionStore.getState()

    setExporting(true)
    setProgress(0)

    try {
      for (let i = 0; i < designs.length; i++) {
        const design = designs[i]!
        // Load each design's state into the editor
        loadEditorState(design.state)
        // Wait for React to re-render the canvas
        await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())))
        await new Promise(r => setTimeout(r, 150))

        await exportCanvasToPng(canvasRef.current, {
          targetWidth: width,
          targetHeight: height,
          filename: `opengradient-${design.name.replace(/\s+/g, '-').toLowerCase()}-${width}x${height}.png`,
        })
        setProgress(((i + 1) / designs.length) * 100)
        if (i < designs.length - 1) {
          await new Promise(r => setTimeout(r, 200))
        }
      }
    } finally {
      // Restore the original active design
      const activeDesign = designs.find(d => d.id === activeDesignId)
      if (activeDesign) loadEditorState(activeDesign.state)
      setExporting(false)
      setProgress(0)
    }
  }, [getActiveDimensions, setExporting, setProgress])

  const exportAll = useCallback(async () => {
    if (!canvasRef.current) return
    const sizes = EXPORT_SIZE_PRESETS.filter(p => p.id !== 'custom')
    setExporting(true)
    setProgress(0)
    try {
      await exportAllSizes(canvasRef.current, sizes, (percent) => {
        setProgress(percent)
      })
    } finally {
      setExporting(false)
      setProgress(0)
    }
  }, [setExporting, setProgress])

  return { canvasRef, exportCurrent, exportAll }
}
