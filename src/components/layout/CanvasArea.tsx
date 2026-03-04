import { useState, useEffect, useRef, useCallback } from 'react'
import { Copy, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { CanvasWrapper } from '../canvas/CanvasWrapper'
import { useDesignCollectionStore } from '../../store/designCollectionStore'
import { useExportStore } from '../../store/exportStore'
import { captureThumbnail } from '../../lib/thumbnailCapture'

interface Props {
  canvasRef: React.RefObject<HTMLDivElement | null>
}

export function CanvasArea({ canvasRef }: Props) {
  const designs = useDesignCollectionStore(s => s.designs)
  const activeDesignId = useDesignCollectionStore(s => s.activeDesignId)
  const switchDesign = useDesignCollectionStore(s => s.switchDesign)
  const duplicateDesign = useDesignCollectionStore(s => s.duplicateDesign)
  const deleteDesign = useDesignCollectionStore(s => s.deleteDesign)
  const renameDesign = useDesignCollectionStore(s => s.renameDesign)
  const addNewDesign = useDesignCollectionStore(s => s.addNewDesign)
  const moveDesign = useDesignCollectionStore(s => s.moveDesign)
  const setThumbnail = useDesignCollectionStore(s => s.setThumbnail)
  const customWidth = useExportStore(s => s.customWidth)
  const customHeight = useExportStore(s => s.customHeight)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const activePageRef = useRef<HTMLDivElement>(null)

  // Scroll active page into view when activeDesignId changes
  useEffect(() => {
    requestAnimationFrame(() => {
      activePageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }, [activeDesignId])

  const captureAndSwitch = useCallback((targetId: string) => {
    if (targetId === activeDesignId) return
    // Fire-and-forget thumbnail capture (don't block the switch)
    if (canvasRef.current) {
      const currentId = activeDesignId
      captureThumbnail(canvasRef.current)
        .then(dataUrl => setThumbnail(currentId, dataUrl))
        .catch(() => {})
    }
    switchDesign(targetId)
  }, [activeDesignId, canvasRef, switchDesign, setThumbnail])

  const handleDuplicate = useCallback((designId: string, isActive: boolean) => {
    if (!isActive) {
      captureAndSwitch(designId)
    }
    // Small delay to let switchDesign settle before duplicating
    setTimeout(() => duplicateDesign(), isActive ? 0 : 50)
  }, [captureAndSwitch, duplicateDesign])

  const commitRename = () => {
    if (editingId && editValue.trim()) {
      renameDesign(editingId, editValue.trim())
    }
    setEditingId(null)
  }

  return (
    <main className="h-full overflow-y-auto bg-brand-dark-950">
      <div className="flex flex-col items-center gap-6 p-6">
        {designs.map((design, index) => {
          const isActive = design.id === activeDesignId

          return (
            <div
              key={design.id}
              ref={isActive ? activePageRef : undefined}
              className="w-full max-w-4xl flex flex-col"
            >
              {/* Per-page toolbar */}
              <div className="flex items-center justify-between px-1 py-1.5 mb-1">
                <div className="flex items-center gap-2">
                  {editingId === design.id ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={commitRename}
                      onKeyDown={e => {
                        if (e.key === 'Enter') commitRename()
                        if (e.key === 'Escape') setEditingId(null)
                      }}
                      onClick={e => e.stopPropagation()}
                      className="bg-transparent border-b border-brand-cyan text-white text-xs outline-none w-32"
                    />
                  ) : (
                    <span
                      className="text-xs text-brand-dark-100 cursor-pointer hover:text-white select-none"
                      onDoubleClick={() => {
                        setEditingId(design.id)
                        setEditValue(design.name)
                      }}
                    >
                      Page {index + 1} — {design.name}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-0.5">
                  <button
                    onClick={() => moveDesign(design.id, 'up')}
                    disabled={index === 0}
                    className="p-1 rounded hover:bg-white/10 text-brand-dark-100 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => moveDesign(design.id, 'down')}
                    disabled={index === designs.length - 1}
                    className="p-1 rounded hover:bg-white/10 text-brand-dark-100 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    onClick={() => handleDuplicate(design.id, isActive)}
                    className="p-1 rounded hover:bg-white/10 text-brand-dark-100 hover:text-brand-cyan transition-colors"
                    title="Duplicate"
                  >
                    <Copy size={14} />
                  </button>
                  {designs.length > 1 && (
                    <button
                      onClick={() => deleteDesign(design.id)}
                      className="p-1 rounded hover:bg-white/10 text-brand-dark-100 hover:text-red-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Page card */}
              <div
                onClick={() => { if (!isActive) captureAndSwitch(design.id) }}
                className={`rounded-lg overflow-hidden border-2 transition-colors ${
                  isActive
                    ? 'border-brand-cyan shadow-lg shadow-brand-cyan/20'
                    : 'border-white/10 hover:border-white/30 cursor-pointer'
                }`}
              >
                {isActive ? (
                  <div style={{ width: '100%', aspectRatio: `${customWidth} / ${customHeight}` }}>
                    <CanvasWrapper canvasRef={canvasRef} />
                  </div>
                ) : (
                  <div className="bg-brand-dark-950">
                    {design.thumbnail ? (
                      <img
                        src={design.thumbnail}
                        alt={design.name}
                        className="w-full h-auto block"
                        draggable={false}
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center text-brand-dark-100 text-xs"
                        style={{ aspectRatio: `${customWidth} / ${customHeight}` }}
                      >
                        Click to edit
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Add page button */}
        <button
          onClick={addNewDesign}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-white/20 text-brand-dark-100 hover:text-brand-cyan hover:border-brand-cyan/40 transition-colors text-xs"
        >
          <Plus size={14} />
          Add Page
        </button>
      </div>
    </main>
  )
}
