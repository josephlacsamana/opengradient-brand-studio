export interface ExportSizePreset {
  id: string;
  label: string;
  width: number;
  height: number;
}

export interface ExportState {
  selectedPresetId: string;
  customWidth: number;
  customHeight: number;
  isExporting: boolean;
  exportProgress: number;
}

export interface ExportActions {
  setPreset: (presetId: string) => void;
  setCustomDimensions: (width: number, height: number) => void;
  setExporting: (isExporting: boolean) => void;
  setProgress: (progress: number) => void;
  getActiveDimensions: () => { width: number; height: number };
}
