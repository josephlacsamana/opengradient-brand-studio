import { useEditorStore } from '../../store/editorStore'
import { templates } from '../../templates'

export function TemplateGrid() {
  const activeTemplateId = useEditorStore(s => s.activeTemplateId)
  const applyTemplate = useEditorStore(s => s.applyTemplate)

  return (
    <div className="grid grid-cols-2 gap-2 p-3">
      {templates.map(t => (
        <button
          key={t.id}
          onClick={() => applyTemplate(t.id)}
          className={`rounded-lg overflow-hidden text-left transition-all ${
            activeTemplateId === t.id
              ? 'ring-2 ring-brand-cyan'
              : 'ring-1 ring-white/10 hover:ring-white/30'
          }`}
        >
          <div
            className="h-20 w-full"
            style={{
              background: t.category === 'dark-technical'
                ? 'linear-gradient(135deg, #0A0F19, #0E4B5B)'
                : 'linear-gradient(135deg, #0E4B5B, #50C9E9, #E9F8FC)',
            }}
          />
          <div className="p-2 bg-brand-dark-800">
            <div className="text-xs font-medium text-white truncate">{t.name}</div>
            <div className="text-[10px] text-brand-dark-100 truncate">{t.description}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
