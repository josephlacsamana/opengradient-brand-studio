import { AppShell } from './components/layout/AppShell'
import { useExport } from './hooks/useExport'
import { useFontLoader } from './hooks/useFontLoader'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useDesignCollectionStore } from './store/designCollectionStore'

function App() {
  const { canvasRef, exportCurrent, exportAll } = useExport()
  const fontsLoaded = useFontLoader()
  const duplicateDesign = useDesignCollectionStore(s => s.duplicateDesign)

  useKeyboardShortcuts({
    onExport: exportCurrent,
    onDuplicate: duplicateDesign,
  })

  if (!fontsLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-brand-dark-950">
        <div className="text-center">
          <img src="/logos/symbol-cyan.svg" alt="" className="h-12 w-12 mx-auto mb-4 animate-pulse" />
          <p className="text-sm text-brand-dark-100">Loading Brand Studio...</p>
        </div>
      </div>
    )
  }

  return (
    <AppShell
      canvasRef={canvasRef}
      onExport={exportCurrent}
      onExportAll={exportAll}
    />
  )
}

export default App
