import { useEditorStore } from '../../store/editorStore'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'

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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-brand-dark-100 mb-1">Headline Color</label>
          <input
            type="color"
            value={store.headlineColor}
            onChange={e => store.setField('headlineColor', e.target.value)}
            className="w-full h-8 rounded cursor-pointer bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs text-brand-dark-100 mb-1">Subtitle Color</label>
          <input
            type="color"
            value={store.subtitleColor}
            onChange={e => store.setField('subtitleColor', e.target.value)}
            className="w-full h-8 rounded cursor-pointer bg-transparent"
          />
        </div>
      </div>
    </div>
  )
}
