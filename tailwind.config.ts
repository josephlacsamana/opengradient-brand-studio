import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: {
            DEFAULT: '#40D1DB',
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
          dark: {
            DEFAULT: 'var(--ui-surface-base)',
            950: 'var(--ui-surface-base)',
            800: 'var(--ui-surface-raised)',
            700: 'var(--ui-surface-hover)',
            100: 'var(--ui-text-muted)',
          },
        },
        ui: {
          primary: 'var(--ui-text-primary)',
          'on-accent': 'var(--ui-on-accent)',
          border: 'var(--ui-border)',
          'border-subtle': 'var(--ui-border-subtle)',
          'border-medium': 'var(--ui-border-medium)',
          'border-strong': 'var(--ui-border-strong)',
          'hover-overlay': 'var(--ui-hover-overlay)',
          'hover-overlay-strong': 'var(--ui-hover-overlay-strong)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
