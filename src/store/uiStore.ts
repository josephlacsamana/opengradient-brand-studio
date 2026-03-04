import { create } from 'zustand'

export type PanelSectionId =
  | 'text'
  | 'fonts'
  | 'background'
  | 'decorations'
  | 'logo'
  | 'community-grid'
  | 'export'

interface UIState {
  focusedSection: PanelSectionId | null
}

interface UIActions {
  setFocusedSection: (section: PanelSectionId | null) => void
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  focusedSection: null,
  setFocusedSection: (section) => set({ focusedSection: section }),
}))
