import type { DecorationConfig } from './template'

export interface EditorState {
  activeTemplateId: string;

  headline: string;
  subtitle: string;
  headlineFontFamily: string;
  headlineFontSize: number;
  headlineFontWeight: number;
  headlineColor: string;
  subtitleFontFamily: string;
  subtitleFontSize: number;
  subtitleFontWeight: number;
  subtitleColor: string;
  textAlignment: 'left' | 'center' | 'right';
  textVerticalPosition: 'top' | 'center' | 'bottom';
  textPaddingX: number;
  textPaddingY: number;

  backgroundType: 'gradient' | 'solid';
  backgroundPresetId: string;
  gradientColors: string[];
  gradientAngle: number;
  solidColor: string;

  decorations: DecorationConfig;

  logoEnabled: boolean;
  logoVariant: 'symbol' | 'lockup-horizontal' | 'logotype' | 'logotype-stacked';
  logoColor: 'cyan' | 'white' | 'black';
  logoPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  logoScale: number;
  logoPadding: number;
}

export interface EditorActions {
  applyTemplate: (templateId: string) => void;
  setField: <K extends keyof EditorState>(key: K, value: EditorState[K]) => void;
  setDecoration: <T extends keyof DecorationConfig>(
    type: T,
    field: keyof DecorationConfig[T],
    value: DecorationConfig[T][keyof DecorationConfig[T]]
  ) => void;
  reset: () => void;
}
