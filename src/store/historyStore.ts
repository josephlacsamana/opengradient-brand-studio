import { create } from 'zustand'
import type { EditorState } from '../types/editor'

interface HistoryState {
  past: EditorState[]
  future: EditorState[]
  canUndo: boolean
  canRedo: boolean
  pushState: (state: EditorState) => void
  undo: () => EditorState | null
  redo: () => EditorState | null
  clear: () => void
}

const MAX_HISTORY = 50

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  future: [],
  canUndo: false,
  canRedo: false,

  pushState: (state: EditorState) => {
    set(prev => {
      const newPast = [...prev.past, state].slice(-MAX_HISTORY)
      return {
        past: newPast,
        future: [],
        canUndo: newPast.length > 0,
        canRedo: false,
      }
    })
  },

  undo: () => {
    const { past } = get()
    if (past.length === 0) return null
    const previous = past[past.length - 1]!
    set(prev => ({
      past: prev.past.slice(0, -1),
      future: [...prev.future],
      canUndo: prev.past.length > 1,
      canRedo: true,
    }))
    return previous
  },

  redo: () => {
    const { future } = get()
    if (future.length === 0) return null
    const next = future[future.length - 1]!
    set(prev => ({
      past: [...prev.past],
      future: prev.future.slice(0, -1),
      canUndo: true,
      canRedo: prev.future.length > 1,
    }))
    return next
  },

  clear: () => {
    set({ past: [], future: [], canUndo: false, canRedo: false })
  },
}))
