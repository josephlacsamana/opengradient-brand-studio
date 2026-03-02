import type { ExportSizePreset } from '../types/export'

export const EXPORT_SIZE_PRESETS: ExportSizePreset[] = [
  { id: 'twitter-post', label: 'Twitter / X Post', width: 1200, height: 675 },
  { id: 'twitter-header', label: 'Twitter / X Header', width: 1500, height: 500 },
  { id: 'profile-pic', label: 'Profile Picture', width: 400, height: 400 },
  { id: 'linkedin-post', label: 'LinkedIn Post', width: 1200, height: 627 },
  { id: 'instagram-square', label: 'Instagram Square', width: 1080, height: 1080 },
  { id: 'blog-cover', label: 'Blog Cover', width: 1600, height: 900 },
  { id: 'custom', label: 'Custom Size', width: 1200, height: 675 },
];

export function getPresetById(id: string): ExportSizePreset | undefined {
  return EXPORT_SIZE_PRESETS.find(p => p.id === id);
}
