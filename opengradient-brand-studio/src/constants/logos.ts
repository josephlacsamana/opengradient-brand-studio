export interface LogoVariant {
  id: 'symbol' | 'lockup-horizontal' | 'logotype' | 'logotype-stacked';
  label: string;
  colors: {
    cyan: string;
    white: string;
    black: string;
  };
}

export const LOGO_VARIANTS: LogoVariant[] = [
  {
    id: 'symbol',
    label: 'Symbol',
    colors: {
      cyan: '/logos/symbol-cyan.svg',
      white: '/logos/symbol-white.svg',
      black: '/logos/symbol-black.svg',
    },
  },
  {
    id: 'lockup-horizontal',
    label: 'Full Lockup',
    colors: {
      cyan: '/logos/lockup-horizontal-cyan.svg',
      white: '/logos/lockup-horizontal-white.svg',
      black: '/logos/lockup-horizontal-black.svg',
    },
  },
  {
    id: 'logotype',
    label: 'Logotype',
    colors: {
      cyan: '/logos/logotype-cyan.svg',
      white: '/logos/logotype-white.svg',
      black: '/logos/logotype-black.svg',
    },
  },
  {
    id: 'logotype-stacked',
    label: 'Stacked',
    colors: {
      cyan: '/logos/logotype-stacked-cyan.svg',
      white: '/logos/logotype-stacked-white.svg',
      black: '/logos/logotype-stacked-black.svg',
    },
  },
];

export function getLogoPath(
  variant: LogoVariant['id'],
  color: 'cyan' | 'white' | 'black'
): string {
  const v = LOGO_VARIANTS.find(l => l.id === variant);
  return v ? v.colors[color] : '/logos/symbol-cyan.svg';
}
