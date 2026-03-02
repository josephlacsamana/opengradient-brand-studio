import { useEditorStore } from '../../store/editorStore'
import { BACKGROUND_PRESETS } from '../../constants/brand'

export function BackgroundControls() {
  const backgroundPresetId = useEditorStore(s => s.backgroundPresetId)
  const setField = useEditorStore(s => s.setField)

  const brandPresets = BACKGROUND_PRESETS.filter(p => p.category === 'brand-gradient')
  const darkPresets = BACKGROUND_PRESETS.filter(p => p.category === 'dark-technical')

  const selectPreset = (id: string) => {
    const preset = BACKGROUND_PRESETS.find(p => p.id === id)
    if (!preset) return
    setField('backgroundPresetId', id)
    setField('backgroundType', preset.type === 'solid' ? 'solid' : 'gradient')
  }

  return (
    <div className="space-y-3 p-3">
      <div>
        <label className="block text-xs text-brand-dark-100 mb-2">Brand Gradient</label>
        <div className="grid grid-cols-3 gap-2">
          {brandPresets.map(p => (
            <button
              key={p.id}
              onClick={() => selectPreset(p.id)}
              className={`h-12 rounded-lg transition-all ${
                backgroundPresetId === p.id
                  ? 'ring-2 ring-brand-cyan'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              }`}
              style={{ background: p.value }}
              title={p.label}
            />
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-2">Dark Technical</label>
        <div className="grid grid-cols-3 gap-2">
          {darkPresets.map(p => (
            <button
              key={p.id}
              onClick={() => selectPreset(p.id)}
              className={`h-12 rounded-lg transition-all ${
                backgroundPresetId === p.id
                  ? 'ring-2 ring-brand-cyan'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              }`}
              style={{ background: p.value }}
              title={p.label}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
