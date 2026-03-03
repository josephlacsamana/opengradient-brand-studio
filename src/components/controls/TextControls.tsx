import { useEditorStore } from '../../store/editorStore'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

const TEXT_COLOR_PRESETS = [
  { color: '#FFFFFF', label: 'White' },
  { color: '#E9F8FC', label: 'Lightest Cyan' },
  { color: '#A7E4F4', label: 'Light Cyan' },
  { color: '#40D1DB', label: 'Logo Cyan' },
  { color: '#24BCE3', label: 'Primary' },
  { color: '#0E4B5B', label: 'Dark Teal' },
  { color: '#BFC8DC', label: 'Light Gray' },
  { color: '#141E32', label: 'Dark Navy' },
  { color: '#0A0F19', label: 'Deepest Dark' },
  { color: '#000000', label: 'Black' },
]

function ColorSwatches({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-1.5">
      {TEXT_COLOR_PRESETS.map(({ color, label }) => (
        <button
          key={color}
          title={label}
          onClick={() => onChange(color)}
          className="relative w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
          style={{
            backgroundColor: color,
            borderColor: value === color ? '#24BCE3' : 'rgba(255,255,255,0.15)',
            boxShadow: value === color ? '0 0 0 2px rgba(36,188,227,0.4)' : 'none',
          }}
        />
      ))}
    </div>
  )
}

export function TextControls() {
  const store = useEditorStore()

  return (
    <div className="space-y-4 p-3">
      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Headline</label>
        <textarea
          value={store.headline}
          onChange={e => store.setField('headline', e.target.value)}
          className="w-full bg-brand-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-brand-cyan/50"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Subtitle</label>
        <textarea
          value={store.subtitle}
          onChange={e => store.setField('subtitle', e.target.value)}
          className="w-full bg-brand-dark-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-brand-cyan/50"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Alignment</label>
        <div className="flex gap-1">
          {(['left', 'center', 'right'] as const).map(align => (
            <button
              key={align}
              onClick={() => store.setField('textAlignment', align)}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center transition-colors ${
                store.textAlignment === align
                  ? 'bg-brand-cyan/20 text-brand-cyan'
                  : 'bg-brand-dark-950 text-brand-dark-100 hover:text-white'
              }`}
            >
              {align === 'left' && <AlignLeft size={16} />}
              {align === 'center' && <AlignCenter size={16} />}
              {align === 'right' && <AlignRight size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Vertical Position</label>
        <div className="flex gap-1">
          {(['top', 'center', 'bottom'] as const).map(pos => (
            <button
              key={pos}
              onClick={() => store.setField('textVerticalPosition', pos)}
              className={`flex-1 py-1.5 rounded-lg text-xs capitalize transition-colors ${
                store.textVerticalPosition === pos
                  ? 'bg-brand-cyan/20 text-brand-cyan'
                  : 'bg-brand-dark-950 text-brand-dark-100 hover:text-white'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Headline Size: {store.headlineFontSize}px
        </label>
        <input
          type="range"
          min={24}
          max={140}
          value={store.headlineFontSize}
          onChange={e => store.setField('headlineFontSize', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Headline Weight: {store.headlineFontWeight}
        </label>
        <input
          type="range"
          min={300}
          max={900}
          step={100}
          value={store.headlineFontWeight}
          onChange={e => store.setField('headlineFontWeight', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">
          Subtitle Size: {store.subtitleFontSize}px
        </label>
        <input
          type="range"
          min={12}
          max={60}
          value={store.subtitleFontSize}
          onChange={e => store.setField('subtitleFontSize', Number(e.target.value))}
          className="w-full accent-brand-cyan"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Headline Color</label>
        <ColorSwatches
          value={store.headlineColor}
          onChange={c => store.setField('headlineColor', c)}
        />
        <input
          type="color"
          value={store.headlineColor}
          onChange={e => store.setField('headlineColor', e.target.value)}
          className="w-full h-7 rounded cursor-pointer bg-transparent"
        />
      </div>

      <div>
        <label className="block text-xs text-brand-dark-100 mb-1">Subtitle Color</label>
        <ColorSwatches
          value={store.subtitleColor}
          onChange={c => store.setField('subtitleColor', c)}
        />
        <input
          type="color"
          value={store.subtitleColor}
          onChange={e => store.setField('subtitleColor', e.target.value)}
          className="w-full h-7 rounded cursor-pointer bg-transparent"
        />
      </div>
    </div>
  )
}
