export interface FontDefinition {
  family: string;
  category: 'sans-serif' | 'serif' | 'display' | 'monospace';
  weights: number[];
  googleFontsName: string;
}

export const FONT_REGISTRY: FontDefinition[] = [
  // Sans-Serif
  { family: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900], googleFontsName: 'Inter' },
  { family: 'Roboto', category: 'sans-serif', weights: [400, 500, 700, 900], googleFontsName: 'Roboto' },
  { family: 'Open Sans', category: 'sans-serif', weights: [400, 600, 700, 800], googleFontsName: 'Open+Sans' },
  { family: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700, 800], googleFontsName: 'Poppins' },
  { family: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700, 800, 900], googleFontsName: 'Montserrat' },
  { family: 'Lato', category: 'sans-serif', weights: [400, 700, 900], googleFontsName: 'Lato' },
  { family: 'Manrope', category: 'sans-serif', weights: [400, 500, 600, 700, 800], googleFontsName: 'Manrope' },
  { family: 'Space Grotesk', category: 'sans-serif', weights: [400, 500, 600, 700], googleFontsName: 'Space+Grotesk' },
  { family: 'DM Sans', category: 'sans-serif', weights: [400, 500, 600, 700], googleFontsName: 'DM+Sans' },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', weights: [400, 500, 600, 700, 800], googleFontsName: 'Plus+Jakarta+Sans' },
  // Serif
  { family: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900], googleFontsName: 'Playfair+Display' },
  { family: 'Merriweather', category: 'serif', weights: [400, 700, 900], googleFontsName: 'Merriweather' },
  { family: 'Lora', category: 'serif', weights: [400, 500, 600, 700], googleFontsName: 'Lora' },
  { family: 'Cormorant Garamond', category: 'serif', weights: [400, 500, 600, 700], googleFontsName: 'Cormorant+Garamond' },
  // Display
  { family: 'Sora', category: 'display', weights: [400, 500, 600, 700, 800], googleFontsName: 'Sora' },
  { family: 'Outfit', category: 'display', weights: [400, 500, 600, 700, 800], googleFontsName: 'Outfit' },
  { family: 'Orbitron', category: 'display', weights: [400, 500, 600, 700, 800, 900], googleFontsName: 'Orbitron' },
  { family: 'Bebas Neue', category: 'display', weights: [400], googleFontsName: 'Bebas+Neue' },
  { family: 'Oswald', category: 'display', weights: [400, 500, 600, 700], googleFontsName: 'Oswald' },
  { family: 'Raleway', category: 'display', weights: [400, 500, 600, 700, 800, 900], googleFontsName: 'Raleway' },
  // Monospace
  { family: 'JetBrains Mono', category: 'monospace', weights: [400, 500, 600, 700, 800], googleFontsName: 'JetBrains+Mono' },
  { family: 'Fira Code', category: 'monospace', weights: [400, 500, 600, 700], googleFontsName: 'Fira+Code' },
  { family: 'Space Mono', category: 'monospace', weights: [400, 700], googleFontsName: 'Space+Mono' },
];

export const FONT_CATEGORIES = ['sans-serif', 'serif', 'display', 'monospace'] as const;

export function getFontsByCategory(category: FontDefinition['category']): FontDefinition[] {
  return FONT_REGISTRY.filter(f => f.category === category);
}

export function buildGoogleFontsUrl(fonts: FontDefinition[] = FONT_REGISTRY): string {
  const families = fonts.map(f =>
    `family=${f.googleFontsName}:wght@${f.weights.join(';')}`
  ).join('&');
  return `https://fonts.googleapis.com/css2?${families}&display=swap`;
}
