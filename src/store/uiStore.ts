import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PanelSectionId =
  | 'text'
  | 'fonts'
  | 'background'
  | 'decorations'
  | 'hero-image'
  | 'logo'
  | 'community-grid'
  | 'export'

export type Theme = 'dark' | 'light'

interface UIState {
  focusedSection: PanelSectionId | null
  theme: Theme
}

interface UIActions {
  setFocusedSection: (section: PanelSectionId | null) => void
  toggleTheme: () => void
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      focusedSection: null,
      theme: 'dark',
      setFocusedSection: (section) => set({ focusedSection: section }),
      toggleTheme: () => set((state) => {
        const next: Theme = state.theme === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', next)
        return { theme: next }
      }),
    }),
    {
      name: 'og-brand-studio-ui',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme && state.theme !== 'dark') {
          document.documentElement.setAttribute('data-theme', state.theme)
        }
      },
    }
  )
)
