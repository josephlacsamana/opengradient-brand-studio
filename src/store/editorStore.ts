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

  setCommunityMemberImage: (sectionIndex, memberIndex, imageUrl) => {
    const sections = structuredClone(get().communitySections)
    if (sections[sectionIndex]?.members[memberIndex]) {
      sections[sectionIndex].members[memberIndex].imageUrl = imageUrl
      set({ communitySections: sections })
    }
  },

  setCommunityMemberUsername: (sectionIndex, memberIndex, username) => {
    const sections = structuredClone(get().communitySections)
    if (sections[sectionIndex]?.members[memberIndex]) {
      sections[sectionIndex].members[memberIndex].username = username
      set({ communitySections: sections })
    }
  },

  setCommunityTitle: (sectionIndex, title) => {
    const sections = structuredClone(get().communitySections)
    if (sections[sectionIndex]) {
      sections[sectionIndex].title = title
      set({ communitySections: sections })
    }
  },

  addCommunityMember: (sectionIndex) => {
    const sections = structuredClone(get().communitySections)
    if (sections[sectionIndex]) {
      sections[sectionIndex].members.push({ imageUrl: null, username: '@username' })
      set({ communitySections: sections })
    }
  },

  removeCommunityMember: (sectionIndex, memberIndex) => {
    const sections = structuredClone(get().communitySections)
    if (sections[sectionIndex]?.members[memberIndex]) {
      sections[sectionIndex].members.splice(memberIndex, 1)
      set({ communitySections: sections })
    }
  },

  addCommunitySection: () => {
    const sections = structuredClone(get().communitySections)
    sections.push({ title: 'New Section', members: [{ imageUrl: null, username: '@username' }] })
    set({ communitySections: sections })
  },

  removeCommunitySection: (sectionIndex) => {
    const sections = structuredClone(get().communitySections)
    sections.splice(sectionIndex, 1)
    set({ communitySections: sections })
  },
}))
