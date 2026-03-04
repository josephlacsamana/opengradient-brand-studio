import { useState, useRef, useEffect } from 'react'
import { Copy, Plus, X } from 'lucide-react'
import { useDesignCollectionStore } from '../../store/designCollectionStore'

export function DesignTabs() {
  const designs = useDesignCollectionStore(s => s.designs)
  const activeDesignId = useDesignCollectionStore(s => s.activeDesignId)
  const switchDesign = useDesignCollectionStore(s => s.switchDesign)
  const duplicateDesign = useDesignCollectionStore(s => s.duplicateDesign)
  const deleteDesign = useDesignCollectionStore(s => s.deleteDesign)
  const renameDesign = useDesignCollectionStore(s => s.renameDesign)
  const addNewDesign = useDesignCollectionStore(s => s.addNewDesign)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingId])

  const handleDoubleClick = (id: string, name: string) => {
    setEditingId(id)
    setEditValue(name)
  }

  const commitRename = () => {
    if (editingId && editValue.trim()) {
      renameDesign(editingId, editValue.trim())
    }
    setEditingId(null)
  }

  return (
    <div className="flex items-center gap-1 px-3 pt-3 pb-0 overflow-x-auto shrink-0">
      {designs.map(design => {
        const isActive = design.id === activeDesignId
        const isEditing = editingId === design.id

        return (
          <div
            key={design.id}
            className={`group relative flex items-center gap-1 px-3 py-1.5 rounded-t-lg text-xs cursor-pointer transition-colors select-none ${
              isActive
                ? 'bg-brand-dark-950 text-white border-b-2 border-brand-cyan'
                : 'bg-brand-dark-800 text-brand-dark-100 hover:text-white hover:bg-brand-dark-700'
            }`}
            onClick={() => switchDesign(design.id)}
            onDoubleClick={() => handleDoubleClick(design.id, design.name)}
          >
            {isEditing ? (
              <input
                ref={inputRef}
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onBlur={commitRename}
                onKeyDown={e => {
                  if (e.key === 'Enter') commitRename()
                  if (e.key === 'Escape') setEditingId(null)
                }}
                onClick={e => e.stopPropagation()}
                className="bg-transparent border-b border-brand-cyan text-white text-xs outline-none w-24"
              />
            ) : (
              <span className="truncate max-w-[120px]">{design.name}</span>
            )}

            {/* Duplicate button */}
            <button
              onClick={e => {
                e.stopPropagation()
                if (!isActive) switchDesign(design.id)
                duplicateDesign()
              }}
              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-brand-dark-100 hover:text-brand-cyan transition-all"
              title="Duplicate design"
            >
              <Copy size={12} />
            </button>

            {/* Delete button (hidden when only 1 design) */}
            {designs.length > 1 && (
              <button
                onClick={e => {
                  e.stopPropagation()
                  deleteDesign(design.id)
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 text-brand-dark-100 hover:text-red-400 transition-all"
                title="Delete design"
              >
                <X size={12} />
              </button>
            )}
          </div>
        )
      })}

      {/* Add new design button */}
      <button
        onClick={addNewDesign}
        className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs text-brand-dark-100 hover:text-brand-cyan hover:bg-brand-dark-800 transition-colors"
        title="New design"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
