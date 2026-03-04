import { useEditorStore } from '../../store/editorStore'
import { LOGO_VARIANTS, LOGO_SCALE_CONFIG } from '../../constants/logos'

const POSITIONS = [
  { id: 'top-left', label: 'TL' },
  { id: 'top-center', label: 'TC' },
  { id: 'top-right', label: 'TR' },
  { id: 'bottom-left', label: 'BL' },
  { id: 'bottom-center', label: 'BC' },
  { id: 'bottom-right', label: 'BR' },
] as const

export function LogoControls() {
  const store = useEditorStore()

  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between">
        <label className="text-xs text-ui-primary">Show Logo</label>
        <button
          onClick={() => store.setField('logoEnabled', !store.logoEnabled)}
          className={`w-9 h-5 rounded-full transition-colors relative ${
            store.logoEnabled ? 'bg-brand-cyan' : 'bg-brand-dark-700'
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              store.logoEnabled ? 'left-[18px]' : 'left-0.5'
            }`}
          />
        </button>
      </div>

      {store.logoEnabled && (
        <>
          <div>
            <label className="block text-xs text-brand-dark-100 mb-1">Variant</label>
            <select
              value={store.logoVariant}
              onChange={e => {
                const variant = e.target.value as typeof store.logoVariant
                store.setField('logoVariant', variant)
                const cfg = LOGO_SCALE_CONFIG[variant]
                const clamped = Math.max(cfg.min, Math.min(cfg.max, store.logoScale))
                if (clamped !== store.logoScale || store.logoScale < cfg.min) {
                  store.setField('logoScale', cfg.default)
                }
              }}
              className="w-full bg-brand-dark-950 border border-ui-border-subtle rounded-lg px-3 py-2 text-sm text-ui-primary focus:outline-none focus:border-brand-cyan/50"
            >
              {LOGO_VARIANTS.map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-brand-dark-100 mb-1">Color</label>
            <div className="flex gap-1">
              {(['cyan', 'white', 'black'] as const).map(c => (
                <button
                  key={c}
                  onClick={() => store.setField('logoColor', c)}
                  className={`flex-1 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                    store.logoColor === c
                      ? 'bg-brand-cyan/20 text-brand-cyan'
                      : 'bg-brand-dark-950 text-brand-dark-100 hover:text-ui-primary'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-brand-dark-100 mb-1">Position</label>
            <div className="grid grid-cols-3 gap-1">
              {POSITIONS.map(p => (
                <button
                  key={p.id}
                  onClick={() => store.setField('logoPosition', p.id)}
                  className={`py-1.5 rounded-lg text-xs transition-colors ${
                    store.logoPosition === p.id
                      ? 'bg-brand-cyan/20 text-brand-cyan'
                      : 'bg-brand-dark-950 text-brand-dark-100 hover:text-ui-primary'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {(() => {
              const cfg = LOGO_SCALE_CONFIG[store.logoVariant]
              return (
                <>
                  <label className="block text-xs text-brand-dark-100 mb-1">
                    Scale: {store.logoScale.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min={Math.round(cfg.min * 100)}
                    max={Math.round(cfg.max * 100)}
                    value={Math.round(store.logoScale * 100)}
                    onChange={e => store.setField('logoScale', Number(e.target.value) / 100)}
                    className="w-full accent-brand-cyan"
                  />
                </>
              )
            })()}
          </div>
        </>
      )}
    </div>
  )
}
