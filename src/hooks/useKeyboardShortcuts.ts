import { useEffect } from 'react'

interface ShortcutHandlers {
  onUndo?: () => void
  onRedo?: () => void
  onExport?: () => void
  onDuplicate?: () => void
  onCopyToClipboard?: () => void
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrl = e.ctrlKey || e.metaKey

      if (isCtrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handlers.onUndo?.()
      }
      if (isCtrl && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        handlers.onRedo?.()
      }
      if (isCtrl && e.key === 'e') {
        e.preventDefault()
        handlers.onExport?.()
      }
      if (isCtrl && e.key === 'd') {
        e.preventDefault()
        handlers.onDuplicate?.()
      }
      if (isCtrl && e.shiftKey && e.key === 'C') {
        e.preventDefault()
        handlers.onCopyToClipboard?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlers])
}
