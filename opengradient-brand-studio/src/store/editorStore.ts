import { create } from 'zustand'
import type { EditorState, EditorActions } from '../types/editor'
import type { DecorationConfig } from '../types/template'
import { templates } from '../templates'

const DEFAULT_TEMPLATE_ID = 'dark-tech-announcement'

function getDefaultState(): EditorState {
  const template = templates.find(t => t.id === DEFAULT_TEMPLATE_ID) ?? templates[0]!
  return {
    activeTemplateId: template.id,
    ...template.defaults,
  }
}

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  ...getDefaultState(),

  applyTemplate: (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return
    set({
      activeTemplateId: templateId,
      ...template.defaults,
    })
  },

  setField: (key, value) => {
    set({ [key]: value } as Partial<EditorState>)
  },

  setDecoration: (type, field, value) => {
    const current = get().decorations
    set({
      decorations: {
        ...current,
        [type]: {
          ...current[type],
          [field]: value,
        },
      },
    })
  },

  reset: () => {
    set(getDefaultState())
  },
}))
