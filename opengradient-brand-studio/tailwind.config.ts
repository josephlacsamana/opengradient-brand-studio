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
            DEFAULT: '#0A0F19',
            950: '#0A0F19',
            800: '#141E32',
            700: '#1D2C4B',
            100: '#BFC8DC',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
