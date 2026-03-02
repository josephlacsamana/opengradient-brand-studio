import { useCallback, useRef } from 'react'
import { useExportStore } from '../store/exportStore'
import { exportCanvasToPng, exportAllSizes } from '../lib/exportPipeline'
import { EXPORT_SIZE_PRESETS } from '../constants/exportSizes'

export function useExport() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { getActiveDimensions, setExporting, setProgress } = useExportStore()

  const exportCurrent = useCallback(async () => {
    if (!canvasRef.current) return
    const { width, height } = getActiveDimensions()
    setExporting(true)
    try {
      await exportCanvasToPng(canvasRef.current, {
        targetWidth: width,
        targetHeight: height,
      })
    } finally {
      setExporting(false)
    }
  }, [getActiveDimensions, setExporting])

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
