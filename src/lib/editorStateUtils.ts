import type { EditorState } from '../types/editor'
import { useEditorStore } from '../store/editorStore'

/**
 * Extract only the data fields (no action functions) from the editor store.
 * Returns a deep clone safe for snapshotting.
 */
export function extractEditorState(): EditorState {
  const store = useEditorStore.getState()
  const snapshot: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(store)) {
    if (typeof value !== 'function') {
      snapshot[key] = value
    }
  }
  return structuredClone(snapshot as EditorState)
}

/**
 * Load an EditorState snapshot into the live editor store.
 */
export function loadEditorState(state: EditorState): void {
  useEditorStore.setState(structuredClone(state))
}
