import { useState } from 'react'
import { useExportStore } from '../../store/exportStore'
import { useDesignCollectionStore } from '../../store/designCollectionStore'
import { EXPORT_SIZE_PRESETS } from '../../constants/exportSizes'
import { Download, Layers, Clipboard, Check, ChevronDown } from 'lucide-react'

const BATCH_PRESETS = EXPORT_SIZE_PRESETS.filter(p => p.id !== 'custom')

interface Props {
  onExport: () => void
  onExportAll: (selectedSizeIds: string[]) => void
  onCopyToClipboard: () => Promise<boolean | undefined>
}

export function ExportControls({ onExport, onExportAll, onCopyToClipboard }: Props) {
  const { selectedPresetId, customWidth, customHeight, isExporting, exportProgress, setPreset, setCustomDimensions } = useExportStore()
  const designCount = useDesignCollectionStore(s => s.designs.length)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [batchOpen, setBatchOpen] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(() => new Set(BATCH_PRESETS.map(p => p.id)))

  const toggleSize = (id: string) => {
    setSelectedSizes(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleAll = () => {
    if (selectedSizes.size === BATCH_PRESETS.length) {
      setSelectedSizes(new Set())
    } else {
      setSelectedSizes(new Set(BATCH_PRESETS.map(p => p.id)))
    }
  }

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

        <div>
          <button
            onClick={() => setBatchOpen(!batchOpen)}
            disabled={isExporting}
            className="w-full flex items-center justify-center gap-2 bg-brand-dark-950 text-brand-dark-100 border border-ui-border-subtle py-2 rounded-lg hover:text-ui-primary hover:border-ui-border-medium transition-colors disabled:opacity-50"
          >
            <Layers size={16} />
            Batch Export
            <ChevronDown size={14} className={`transition-transform ${batchOpen ? 'rotate-180' : ''}`} />
          </button>

          {batchOpen && (
            <div className="mt-2 bg-brand-dark-950 border border-ui-border-subtle rounded-lg p-2 space-y-1">
              <button
                onClick={toggleAll}
                className="text-[10px] text-brand-cyan hover:text-brand-cyan-400 transition-colors mb-1"
              >
                {selectedSizes.size === BATCH_PRESETS.length ? 'Deselect all' : 'Select all'}
              </button>

              {BATCH_PRESETS.map(p => (
                <label
                  key={p.id}
                  className="flex items-center gap-2 px-2 py-1 rounded hover:bg-ui-hover-overlay cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSizes.has(p.id)}
                    onChange={() => toggleSize(p.id)}
                    className="accent-brand-cyan w-3.5 h-3.5"
                  />
                  <span className="text-xs text-ui-primary flex-1">{p.label}</span>
                  <span className="text-[10px] text-brand-dark-100">{p.width}x{p.height}</span>
                </label>
              ))}

              <button
                onClick={() => onExportAll(Array.from(selectedSizes))}
                disabled={isExporting || selectedSizes.size === 0}
                className="w-full flex items-center justify-center gap-2 bg-brand-cyan text-ui-on-accent font-semibold py-2 rounded-lg hover:bg-brand-cyan-400 transition-colors disabled:opacity-50 mt-2 text-xs"
              >
                <Download size={14} />
                {isExporting && exportProgress > 0
                  ? `Exporting... ${Math.round(exportProgress)}%`
                  : `Export ${selectedSizes.size} Size${selectedSizes.size !== 1 ? 's' : ''}`}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={async () => {
            const success = await onCopyToClipboard()
            setCopyStatus(success ? 'copied' : 'failed')
            setTimeout(() => setCopyStatus('idle'), 2000)
          }}
          disabled={isExporting}
          className={`w-full flex items-center justify-center gap-2 border py-2 rounded-lg transition-colors disabled:opacity-50 ${
            copyStatus === 'copied'
              ? 'bg-green-500/20 text-green-400 border-green-500/30'
              : copyStatus === 'failed'
                ? 'bg-red-500/20 text-red-400 border-red-500/30'
                : 'bg-brand-dark-950 text-brand-dark-100 border-ui-border-subtle hover:text-ui-primary hover:border-ui-border-medium'
          }`}
        >
          {copyStatus === 'copied' ? <Check size={16} /> : <Clipboard size={16} />}
          {copyStatus === 'copied'
            ? 'Copied!'
            : copyStatus === 'failed'
              ? 'Copy failed'
              : 'Copy to Clipboard'}
        </button>
      </div>
    </div>
  )
}
