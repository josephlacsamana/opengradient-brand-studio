import { useEffect, useState, type RefObject } from 'react'

export function useCanvasScale(
  canvasWidth: number,
  canvasHeight: number,
  containerRef: RefObject<HTMLElement | null>
): number {
  const [scale, setScale] = useState(0.5)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateScale = () => {
      const rect = container.getBoundingClientRect()
      const padding = 64
      const scaleX = (rect.width - padding) / canvasWidth
      const scaleY = (rect.height - padding) / canvasHeight
      setScale(Math.min(scaleX, scaleY, 1))
    }

    const observer = new ResizeObserver(updateScale)
    observer.observe(container)
    updateScale()

    return () => observer.disconnect()
  }, [canvasWidth, canvasHeight, containerRef])

  return scale
}
