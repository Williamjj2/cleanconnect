import type { Config } from 'tailwindcss'
import { theme } from './src/lib/theme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: theme.colors,
      spacing: theme.spacing,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      lineHeight: theme.typography.lineHeight,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      transitionProperty: {
        DEFAULT: theme.transitions.DEFAULT,
        fast: theme.transitions.fast,
        slow: theme.transitions.slow,
      },
      zIndex: theme.zIndex,
      screens: theme.breakpoints,
    },
  },
  plugins: [],
}

export default config
