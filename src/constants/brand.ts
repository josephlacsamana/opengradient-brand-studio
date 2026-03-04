// Official Brand Palette (4 core colors from brand guide)
export const BRAND_CORE = {
  tealDarkBlue: '#0E4B5B',   // Teal Dark Blue — primary dark
  caribbeanBlue: '#24BCE3',   // Caribbean Blue — primary accent
  clearSkies: '#E9F8FC',      // Clear Skies — light background
  white: '#FFFFFF',            // White
} as const;

// Extended palette for gradients and UI (derived from core)
export const BRAND_COLORS = {
  primary: {
    50: '#E9F8FC',
    100: '#E9F8FC',
    200: '#BDEBF7',
    300: '#A7E4F4',
    400: '#50C9E9',
    500: '#24BCE3',
    600: '#1D96B6',
    700: '#167188',
    800: '#0E4B5B',
    900: '#041317',
  },
  secondary: {
    100: '#BFC8DC',
    700: '#1D2C4B',
    800: '#141E32',
    950: '#0A0F19',
  },
  logoCyan: '#40D1DB',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export interface BackgroundPreset {
  id: string;
  label: string;
  category: 'brand-gradient' | 'dark-technical';
  type: 'linear' | 'radial' | 'solid';
  value: string; // CSS background value
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  // Official Brand Gradients (from brand guide)
  {
    id: 'brand-header-gradient',
    label: 'Header Gradient',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(180deg, #0E4B5B 0%, #0E4B5B 25%, #24BCE3 60%, #E9F8FC 100%)',
  },
  {
    id: 'brand-footer-gradient',
    label: 'Footer Gradient',
    category: 'brand-gradient',
    type: 'radial',
    value: 'radial-gradient(ellipse at 50% 100%, #0E4B5B 0%, #24BCE3 35%, #E9F8FC 65%, #E9F8FC 100%)',
  },
  {
    id: 'brand-section-gradient',
    label: 'Section Gradient',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(135deg, #0E4B5B 0%, #24BCE3 50%, #E9F8FC 100%)',
  },
  // Additional Brand Gradient presets
  {
    id: 'brand-gradient-vertical',
    label: 'Brand Vertical',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(180deg, #0E4B5B 0%, #24BCE3 50%, #E9F8FC 100%)',
  },
  {
    id: 'brand-gradient-diagonal',
    label: 'Brand Diagonal',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(135deg, #0E4B5B 0%, #167188 30%, #A7E4F4 70%, #E9F8FC 100%)',
  },
  {
    id: 'brand-gradient-center',
    label: 'Brand Radial',
    category: 'brand-gradient',
    type: 'radial',
    value: 'radial-gradient(ellipse at center, #24BCE3 0%, #0E4B5B 60%, #041317 100%)',
  },
  {
    id: 'brand-gradient-soft',
    label: 'Brand Soft',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(180deg, #167188 0%, #50C9E9 35%, #BDEBF7 70%, #FFFFFF 100%)',
  },
  {
    id: 'brand-gradient-warm',
    label: 'Brand Warm',
    category: 'brand-gradient',
    type: 'linear',
    value: 'linear-gradient(160deg, #0E4B5B 0%, #1D96B6 40%, #50C9E9 70%, #E9F8FC 100%)',
  },
  // Dark Technical presets
  {
    id: 'dark-deepest',
    label: 'Deepest Dark',
    category: 'dark-technical',
    type: 'solid',
    value: '#0A0F19',
  },
  {
    id: 'dark-navy',
    label: 'Dark Navy',
    category: 'dark-technical',
    type: 'solid',
    value: '#141E32',
  },
  {
    id: 'dark-teal-glow',
    label: 'Teal Glow',
    category: 'dark-technical',
    type: 'radial',
    value: 'radial-gradient(ellipse at center, #0E4B5B 0%, #0A0F19 70%)',
  },
  {
    id: 'dark-gradient-vertical',
    label: 'Dark Vertical',
    category: 'dark-technical',
    type: 'linear',
    value: 'linear-gradient(180deg, #141E32 0%, #0A0F19 100%)',
  },
  {
    id: 'dark-gradient-teal',
    label: 'Dark Teal',
    category: 'dark-technical',
    type: 'linear',
    value: 'linear-gradient(180deg, #0E4B5B 0%, #041317 100%)',
  },
  {
    id: 'dark-gradient-bottom-glow',
    label: 'Bottom Glow',
    category: 'dark-technical',
    type: 'radial',
    value: 'radial-gradient(ellipse at 50% 100%, #0E4B5B 0%, #0A0F19 60%)',
  },
];

export function getBackgroundCSS(preset: BackgroundPreset): string {
  if (preset.type === 'solid') {
    return preset.value;
  }
  return preset.value;
}
