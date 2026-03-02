import { useRef } from 'react'
import { useExportStore } from '../../store/exportStore'
import { useCanvasScale } from '../../hooks/useCanvasScale'
import { CanvasRenderer } from './CanvasRenderer'

interface CanvasWrapperProps {
  canvasRef: React.RefObject<HTMLDivElement | null>
}

export function CanvasWrapper({ canvasRef }: CanvasWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { customWidth: width, customHeight: height } = useExportStore()
  const scale = useCanvasScale(width, height, containerRef)

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 4px 60px rgba(0,0,0,0.5)',
          borderRadius: '4px',
        }}
      >
        <CanvasRenderer ref={canvasRef} />
      </div>
    </div>
  )
}
