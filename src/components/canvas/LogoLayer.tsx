import { useEditorStore } from '../../store/editorStore'
import { getLogoPath } from '../../constants/logos'

interface LogoLayerProps {
  onLayerClick?: () => void
}

export function LogoLayer({ onLayerClick }: LogoLayerProps) {
  const logoEnabled = useEditorStore(s => s.logoEnabled)
  const logoVariant = useEditorStore(s => s.logoVariant)
  const logoColor = useEditorStore(s => s.logoColor)
  const logoPosition = useEditorStore(s => s.logoPosition)
  const logoScale = useEditorStore(s => s.logoScale)
  const logoPadding = useEditorStore(s => s.logoPadding)

  if (!logoEnabled) return null

  const src = getLogoPath(logoVariant, logoColor)

  const isSymbol = logoVariant === 'symbol'
  const baseHeight = isSymbol ? 48 : 32
  const height = baseHeight * logoScale

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 5,
  }

  if (logoPosition.includes('top')) posStyle.top = `${logoPadding}px`
  if (logoPosition.includes('bottom')) posStyle.bottom = `${logoPadding}px`
  if (logoPosition.includes('left')) posStyle.left = `${logoPadding}px`
  if (logoPosition.includes('right')) posStyle.right = `${logoPadding}px`
  if (logoPosition.includes('center')) {
    posStyle.left = '50%'
    posStyle.transform = 'translateX(-50%)'
  }

  return (
    <img
      src={src}
      alt="OpenGradient"
      onClick={(e) => { e.stopPropagation(); onLayerClick?.() }}
      style={{
        ...posStyle,
        height: `${height}px`,
        width: 'auto',
        objectFit: 'contain',
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    />
  )
}
