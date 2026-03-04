import { Sidebar } from './Sidebar'
import { CanvasArea } from './CanvasArea'
import { PropertiesPanel } from './PropertiesPanel'
import { useDesignCollectionStore } from '../../store/designCollectionStore'
import { useExportStore } from '../../store/exportStore'
import { Download } from 'lucide-react'

interface Props {
  canvasRef: React.RefObject<HTMLDivElement | null>
  onExport: () => void
  onExportAll: () => void
}

export function AppShell({ canvasRef, onExport, onExportAll }: Props) {
  const designCount = useDesignCollectionStore(s => s.designs.length)
  const isExporting = useExportStore(s => s.isExporting)
  const exportProgress = useExportStore(s => s.exportProgress)

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
          disabled={isExporting}
          className="flex items-center gap-2 bg-brand-cyan text-brand-dark-950 text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-cyan-400 transition-colors disabled:opacity-50"
        >
          <Download size={14} />
          {isExporting && exportProgress > 0
            ? `Exporting... ${Math.round(exportProgress)}%`
            : designCount > 1
              ? `Export All (${designCount})`
              : 'Export PNG'}
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
