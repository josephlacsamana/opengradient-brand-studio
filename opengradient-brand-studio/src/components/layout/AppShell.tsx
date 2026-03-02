import { Sidebar } from './Sidebar'
import { CanvasArea } from './CanvasArea'
import { PropertiesPanel } from './PropertiesPanel'

interface Props {
  canvasRef: React.RefObject<HTMLDivElement | null>
  onExport: () => void
  onExportAll: () => void
}

export function AppShell({ canvasRef, onExport, onExportAll }: Props) {
  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="h-14 bg-brand-dark-800 border-b border-white/5 flex items-center justify-between px-5 shrink-0">
        <div className="flex items-center gap-3">
          <img src="/logos/symbol-cyan.svg" alt="" className="h-7 w-7" />
          <span className="text-sm font-semibold text-white">OpenGradient Brand Studio</span>
        </div>
        <button
          onClick={onExport}
          className="bg-brand-cyan text-brand-dark-950 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-cyan-400 transition-colors"
        >
          Export PNG
        </button>
      </header>

      {/* Main content: 3 columns */}
      <div className="flex-1 flex overflow-hidden">
        <div className="w-60 shrink-0">
          <Sidebar />
        </div>
        <div className="flex-1 min-w-0">
          <CanvasArea canvasRef={canvasRef} />
        </div>
        <div className="w-80 shrink-0">
          <PropertiesPanel onExport={onExport} onExportAll={onExportAll} />
        </div>
      </div>
    </div>
  )
}
