import type { DecorationConfig, CommunitySection } from './template'

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
  imageEnabled: boolean;
  imageSrc: string | null;
  imageX: number;
  imageY: number;
  imageScale: number;
  imageOpacity: number;
}

export interface Design {
  id: string
  name: string
  state: EditorState
  thumbnail: string | null
}

export interface DesignCollectionState {
  designs: Design[]
  activeDesignId: string
}

export interface DesignCollectionActions {
  duplicateDesign: () => void
  addNewDesign: () => void
  switchDesign: (designId: string) => void
  deleteDesign: (designId: string) => void
  renameDesign: (designId: string, name: string) => void
  saveActiveDesignState: () => void
  moveDesign: (designId: string, direction: 'up' | 'down') => void
  setThumbnail: (designId: string, dataUrl: string) => void
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
  setCommunityMemberImage: (sectionIndex: number, memberIndex: number, imageUrl: string | null) => void;
  setCommunityMemberUsername: (sectionIndex: number, memberIndex: number, username: string) => void;
  setCommunityTitle: (sectionIndex: number, title: string) => void;
  addCommunityMember: (sectionIndex: number) => void;
  removeCommunityMember: (sectionIndex: number, memberIndex: number) => void;
  addCommunitySection: () => void;
  removeCommunitySection: (sectionIndex: number) => void;
}
