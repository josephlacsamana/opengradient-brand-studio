import { useEditorStore } from '../../store/editorStore'

interface TextLayerProps {
  onLayerClick?: () => void
}

export function TextLayer({ onLayerClick }: TextLayerProps) {
  const {
    headline, subtitle,
    headlineFontFamily, headlineFontSize, headlineFontWeight, headlineColor,
    subtitleFontFamily, subtitleFontSize, subtitleFontWeight, subtitleColor,
    textAlignment, textVerticalPosition, textPaddingX, textPaddingY,
  } = useEditorStore()

  const justifyMap = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
  } as const

  const alignMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  } as const

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyMap[textVerticalPosition],
        alignItems: alignMap[textAlignment],
        padding: `${textPaddingY}px ${textPaddingX}px`,
        pointerEvents: 'none',
      }}
    >
      {headline && (
        <div
          onClick={(e) => { e.stopPropagation(); onLayerClick?.() }}
          style={{
            fontFamily: `'${headlineFontFamily}', sans-serif`,
            fontSize: `${headlineFontSize}px`,
            fontWeight: headlineFontWeight,
            color: headlineColor,
            lineHeight: 1.1,
            textAlign: textAlignment,
            whiteSpace: 'pre-line',
            maxWidth: '100%',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          {headline}
        </div>
      )}
      {subtitle && (
        <div
          onClick={(e) => { e.stopPropagation(); onLayerClick?.() }}
          style={{
            fontFamily: `'${subtitleFontFamily}', sans-serif`,
            fontSize: `${subtitleFontSize}px`,
            fontWeight: subtitleFontWeight,
            color: subtitleColor,
            lineHeight: 1.4,
            textAlign: textAlignment,
            marginTop: `${Math.round(headlineFontSize * 0.3)}px`,
            whiteSpace: 'pre-line',
            maxWidth: '100%',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  )
}
