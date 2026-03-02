import { create } from 'zustand'
import type { ExportState, ExportActions } from '../types/export'
import { EXPORT_SIZE_PRESETS } from '../constants/exportSizes'

export const useExportStore = create<ExportState & ExportActions>((set, get) => ({
  selectedPresetId: 'twitter-post',
  customWidth: 1200,
  customHeight: 675,
  isExporting: false,
  exportProgress: 0,

  setPreset: (presetId: string) => {
    const preset = EXPORT_SIZE_PRESETS.find(p => p.id === presetId)
    if (preset && presetId !== 'custom') {
      set({
        selectedPresetId: presetId,
        customWidth: preset.width,
        customHeight: preset.height,
      })
    } else {
      set({ selectedPresetId: presetId })
    }
  },

  setCustomDimensions: (width: number, height: number) => {
    set({ customWidth: width, customHeight: height, selectedPresetId: 'custom' })
  },

  setExporting: (isExporting: boolean) => {
    set({ isExporting })
  },

  setProgress: (progress: number) => {
    set({ exportProgress: progress })
  },

  getActiveDimensions: () => {
    const state = get()
    return { width: state.customWidth, height: state.customHeight }
  },
}))
