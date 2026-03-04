import { useEditorStore } from '../../store/editorStore'
import { useExportStore } from '../../store/exportStore'

interface ImageLayerProps {
  onLayerClick?: () => void
}

export function ImageLayer({ onLayerClick }: ImageLayerProps) {
  const imageEnabled = useEditorStore(s => s.imageEnabled)
  const imageSrc = useEditorStore(s => s.imageSrc)
  const imageX = useEditorStore(s => s.imageX)
  const imageY = useEditorStore(s => s.imageY)
  const imageScale = useEditorStore(s => s.imageScale)
  const imageOpacity = useEditorStore(s => s.imageOpacity)
  const canvasWidth = useExportStore(s => s.customWidth)

  if (!imageEnabled || !imageSrc) return null

  const imageWidth = canvasWidth * imageScale

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <img
        src={imageSrc}
        alt=""
        onClick={(e) => { e.stopPropagation(); onLayerClick?.() }}
        style={{
          position: 'absolute',
          left: `${imageX}%`,
          top: `${imageY}%`,
          transform: 'translate(-50%, -50%)',
          width: `${imageWidth}px`,
          height: 'auto',
          objectFit: 'contain',
          opacity: imageOpacity,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
      />
    </div>
  )
}
