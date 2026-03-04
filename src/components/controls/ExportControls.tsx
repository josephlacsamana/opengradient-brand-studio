import { useExportStore } from '../../store/exportStore'
import { useDesignCollectionStore } from '../../store/designCollectionStore'
import { EXPORT_SIZE_PRESETS } from '../../constants/exportSizes'
import { Download, Layers } from 'lucide-react'

interface Props {
  onExport: () => void
  onExportAll: () => void
}

export function ExportControls({ onExport, onExportAll }: Props) {
  const { selectedPresetId, customWidth, customHeight, isExporting, exportProgress, setPreset, setCustomDimensions } = useExportStore()
  const designCount = useDesignCollectionStore(s => s.designs.length)

  return (
    <div className="space-y-3 p-3">
      <div>
        <label className="block text-xs text-brand-dark-100 mb-2">Size Preset</label>
        <div className="grid grid-cols-2 gap-1">
          {EXPORT_SIZE_PRESETS.map(p => (
            <button
              key={p.id}
              onClick={() => setPreset(p.id)}
              className={`py-1.5 px-2 rounded-lg text-xs text-left transition-colors ${
                selectedPresetId === p.id
                  ? 'bg-brand-cyan/20 text-brand-cyan'
                  : 'bg-brand-dark-950 text-brand-dark-100 hover:text-ui-primary'
              }`}
            >
              <div className="font-medium">{p.label}</div>
              {p.id !== 'custom' && (
                <div className="text-[10px] opacity-60">{p.width}x{p.height}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedPresetId === 'custom' && (
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-brand-dark-100 mb-1">Width</label>
            <input
              type="number"
              value={customWidth}
              onChange={e => setCustomDimensions(Number(e.target.value), customHeight)}
              className="w-full bg-brand-dark-950 border border-ui-border-subtle rounded-lg px-3 py-2 text-sm text-ui-primary focus:outline-none focus:border-brand-cyan/50"
              min={100}
              max={4000}
            />
          </div>
          <div>
            <label className="block text-xs text-brand-dark-100 mb-1">Height</label>
            <input
              type="number"
              value={customHeight}
              onChange={e => setCustomDimensions(customWidth, Number(e.target.value))}
              className="w-full bg-brand-dark-950 border border-ui-border-subtle rounded-lg px-3 py-2 text-sm text-ui-primary focus:outline-none focus:border-brand-cyan/50"
              min={100}
              max={4000}
            />
          </div>
        </div>
      )}

      <div className="text-center text-xs text-brand-dark-100">
        {customWidth} x {customHeight}px
      </div>

      <div className="space-y-2">
        <button
          onClick={onExport}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 bg-brand-cyan text-ui-on-accent font-semibold py-2.5 rounded-lg hover:bg-brand-cyan-400 transition-colors disabled:opacity-50"
        >
          <Download size={16} />
          {isExporting && exportProgress > 0
            ? `Exporting... ${Math.round(exportProgress)}%`
            : designCount > 1
              ? `Export All Designs (${designCount})`
              : 'Export PNG'}
        </button>

        <button
          onClick={onExportAll}
          disabled={isExporting}
          className="w-full flex items-center justify-center gap-2 bg-brand-dark-950 text-brand-dark-100 border border-ui-border-subtle py-2 rounded-lg hover:text-ui-primary hover:border-ui-border-medium transition-colors disabled:opacity-50"
        >
          <Layers size={16} />
          {isExporting && exportProgress > 0
            ? `Exporting... ${Math.round(exportProgress)}%`
            : 'Export All Sizes'}
        </button>
      </div>
    </div>
  )
}
