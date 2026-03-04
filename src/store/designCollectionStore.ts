import { create } from 'zustand'
import type { Design, DesignCollectionState, DesignCollectionActions } from '../types/editor'
import { extractEditorState, loadEditorState } from '../lib/editorStateUtils'
import { templates } from '../templates'

const DEFAULT_TEMPLATE_ID = 'dark-tech-announcement'

let designCounter = 1

function generateId(): string {
  return crypto.randomUUID()
}

function createDesignFromTemplate(templateId: string, name: string): Design {
  const template = templates.find(t => t.id === templateId) ?? templates[0]!
  return {
    id: generateId(),
    name,
    thumbnail: null,
    state: structuredClone({
      activeTemplateId: template.id,
      ...template.defaults,
    }),
  }
}

export const useDesignCollectionStore = create<DesignCollectionState & DesignCollectionActions>(
  (set, get) => {
    const initialDesign: Design = {
      id: generateId(),
      name: `Design ${designCounter++}`,
      thumbnail: null,
      state: extractEditorState(),
    }

    return {
      designs: [initialDesign],
      activeDesignId: initialDesign.id,

      saveActiveDesignState: () => {
        const currentState = extractEditorState()
        set(prev => ({
          designs: prev.designs.map(d =>
            d.id === prev.activeDesignId
              ? { ...d, state: currentState }
              : d
          ),
        }))
      },

      duplicateDesign: () => {
        get().saveActiveDesignState()

        const { designs, activeDesignId } = get()
        const activeDesign = designs.find(d => d.id === activeDesignId)
        if (!activeDesign) return

        const newDesign: Design = {
          id: generateId(),
          name: `${activeDesign.name} (Copy)`,
          thumbnail: activeDesign.thumbnail,
          state: structuredClone(activeDesign.state),
        }

        const activeIndex = designs.findIndex(d => d.id === activeDesignId)
        const newDesigns = [...designs]
        newDesigns.splice(activeIndex + 1, 0, newDesign)

        set({ designs: newDesigns, activeDesignId: newDesign.id })
        loadEditorState(newDesign.state)
      },

      addNewDesign: () => {
        get().saveActiveDesignState()

        const newDesign = createDesignFromTemplate(
          DEFAULT_TEMPLATE_ID,
          `Design ${designCounter++}`,
        )

        set(prev => ({
          designs: [...prev.designs, newDesign],
          activeDesignId: newDesign.id,
        }))
        loadEditorState(newDesign.state)
      },

      switchDesign: (designId: string) => {
        const { activeDesignId, designs } = get()
        if (designId === activeDesignId) return

        const target = designs.find(d => d.id === designId)
        if (!target) return

        get().saveActiveDesignState()
        set({ activeDesignId: designId })
        loadEditorState(target.state)
      },

      deleteDesign: (designId: string) => {
        const { designs, activeDesignId } = get()
        if (designs.length <= 1) return

        const newDesigns = designs.filter(d => d.id !== designId)

        if (designId === activeDesignId) {
          const deletedIndex = designs.findIndex(d => d.id === designId)
          const newActive = newDesigns[Math.min(deletedIndex, newDesigns.length - 1)]!
          set({ designs: newDesigns, activeDesignId: newActive.id })
          loadEditorState(newActive.state)
        } else {
          set({ designs: newDesigns })
        }
      },

      renameDesign: (designId: string, name: string) => {
        set(prev => ({
          designs: prev.designs.map(d =>
            d.id === designId ? { ...d, name } : d
          ),
        }))
      },

      moveDesign: (designId: string, direction: 'up' | 'down') => {
        set(prev => {
          const idx = prev.designs.findIndex(d => d.id === designId)
          if (idx === -1) return prev
          const targetIdx = direction === 'up' ? idx - 1 : idx + 1
          if (targetIdx < 0 || targetIdx >= prev.designs.length) return prev
          const newDesigns = [...prev.designs]
          const temp = newDesigns[idx]!
          newDesigns[idx] = newDesigns[targetIdx]!
          newDesigns[targetIdx] = temp
          return { designs: newDesigns }
        })
      },

      setThumbnail: (designId: string, dataUrl: string) => {
        set(prev => ({
          designs: prev.designs.map(d =>
            d.id === designId ? { ...d, thumbnail: dataUrl } : d
          ),
        }))
      },
    }
  }
)
