import { useEditorStore } from '../../store/editorStore'
import { FONT_REGISTRY, FONT_CATEGORIES } from '../../constants/fonts'

export function FontSelector() {
  const store = useEditorStore()

  return (
    <div className="space-y-3 p-3">
      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Headline Font</label>
        <select
          value={store.headlineFontFamily}
          onChange={e => store.setField('headlineFontFamily', e.target.value)}
          className="w-full bg-brand-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-cyan/50"
        >
          {FONT_CATEGORIES.map(cat => (
            <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}>
              {FONT_REGISTRY.filter(f => f.category === cat).map(f => (
                <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
                  {f.family}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Subtitle Font</label>
        <select
          value={store.subtitleFontFamily}
          onChange={e => store.setField('subtitleFontFamily', e.target.value)}
          className="w-full bg-brand-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-cyan/50"
        >
          {FONT_CATEGORIES.map(cat => (
            <optgroup key={cat} label={cat.charAt(0).toUpperCase() + cat.slice(1)}>
              {FONT_REGISTRY.filter(f => f.category === cat).map(f => (
                <option key={f.family} value={f.family} style={{ fontFamily: f.family }}>
                  {f.family}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    </div>
  )
}
