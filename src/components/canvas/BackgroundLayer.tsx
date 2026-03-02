import { BACKGROUND_PRESETS } from '../../constants/brand'
import { useEditorStore } from '../../store/editorStore'

export function BackgroundLayer() {
  const backgroundType = useEditorStore(s => s.backgroundType)
  const backgroundPresetId = useEditorStore(s => s.backgroundPresetId)
  const solidColor = useEditorStore(s => s.solidColor)

  let background: string
  if (backgroundType === 'solid') {
    const preset = BACKGROUND_PRESETS.find(p => p.id === backgroundPresetId)
    background = preset?.type === 'solid' ? preset.value : solidColor
  } else {
    const preset = BACKGROUND_PRESETS.find(p => p.id === backgroundPresetId)
    background = preset?.value ?? solidColor
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background,
        zIndex: 1,
      }}
    />
  )
}
