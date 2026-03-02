import { useEditorStore } from '../../store/editorStore'
import { getLogoPath } from '../../constants/logos'

export function LogoLayer() {
  const { logoEnabled, logoVariant, logoColor, logoPosition, logoScale, logoPadding } =
    useEditorStore(s => ({
      logoEnabled: s.logoEnabled,
      logoVariant: s.logoVariant,
      logoColor: s.logoColor,
      logoPosition: s.logoPosition,
      logoScale: s.logoScale,
      logoPadding: s.logoPadding,
    }))

  if (!logoEnabled) return null

  const src = getLogoPath(logoVariant, logoColor)

  const isSymbol = logoVariant === 'symbol'
  const baseHeight = isSymbol ? 48 : 32
  const height = baseHeight * logoScale

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    zIndex: 4,
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
      style={{
        ...posStyle,
        height: `${height}px`,
        width: 'auto',
        objectFit: 'contain',
      }}
    />
  )
}
