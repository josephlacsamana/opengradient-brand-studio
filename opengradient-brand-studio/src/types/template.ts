export interface DecorationConfig {
  particles: { enabled: boolean; opacity: number; density: number; color: string };
  cubes: { enabled: boolean; opacity: number; count: number; color: string };
  radialLines: { enabled: boolean; opacity: number; color: string };
  streaks: { enabled: boolean; opacity: number; count: number; color: string };
  nodes: { enabled: boolean; opacity: number; nodeCount: number; color: string };
  glow: { enabled: boolean; opacity: number; color: string; x: number; y: number };
}

export interface CommunityMember {
  imageUrl: string | null;
  username: string;
}

export interface CommunitySection {
  title: string;
  members: CommunityMember[];
}

export interface TemplateDefaults {
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
  communityEnabled: boolean;
  communitySections: CommunitySection[];
  communityAvatarSize: number;
  communityAvatarBorderColor: string;
  communityAvatarBorderWidth: number;
  communitySectionTitleColor: string;
  communitySectionTitleSize: number;
  communityUsernameColor: string;
  communityUsernameSize: number;
  communityColumnsPerRow: number;
}

export interface TemplateDefinition {
  id: string;
  name: string;
  description: string;
  category: 'brand-gradient' | 'dark-technical';
  defaults: TemplateDefaults;
}
