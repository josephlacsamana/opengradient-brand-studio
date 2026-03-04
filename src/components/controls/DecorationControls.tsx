import { useEditorStore } from '../../store/editorStore'
import type { DecorationConfig } from '../../types/template'

const DECORATION_LABELS: Record<keyof DecorationConfig, string> = {
  particles: 'Particle Field',
  cubes: 'Geometric Cubes',
  radialLines: 'Radial Lines',
  streaks: 'Horizontal Streaks',
  nodes: 'Connected Nodes',
  glow: 'Glow Orb',
}

export function DecorationControls() {
  const decorations = useEditorStore(s => s.decorations)
  const setDecoration = useEditorStore(s => s.setDecoration)

  const entries = Object.entries(decorations) as Array<[keyof DecorationConfig, DecorationConfig[keyof DecorationConfig]]>

  return (
    <div className="space-y-3 p-3">
      {entries.map(([type, config]) => (
        <div key={type} className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs text-ui-primary">{DECORATION_LABELS[type]}</label>
            <button
              onClick={() => setDecoration(type, 'enabled', !config.enabled)}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                config.enabled ? 'bg-brand-cyan' : 'bg-brand-dark-700'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  config.enabled ? 'left-[18px]' : 'left-0.5'
                }`}
              />
            </button>
          </div>
          {config.enabled && (
            <div className="pl-1">
              <label className="block text-[10px] text-brand-dark-100 mb-0.5">
                Opacity: {Math.round(config.opacity * 100)}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(config.opacity * 100)}
                onChange={e => setDecoration(type, 'opacity', Number(e.target.value) / 100)}
                className="w-full accent-brand-cyan"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
