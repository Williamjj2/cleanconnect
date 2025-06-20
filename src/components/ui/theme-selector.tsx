'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/hooks/use-theme'
import { FocusVisible } from './focus-visible'

const themes = [
  {
    id: 'light',
    label: 'Claro',
    icon: '☀️',
  },
  {
    id: 'dark',
    label: 'Escuro',
    icon: '🌙',
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: '💻',
  },
] as const

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      {themes.map(({ id, label, icon }) => (
        <FocusVisible key={id}>
          <motion.button
            type="button"
            onClick={() => setTheme(id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              p-2 rounded-md
              ${theme === id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}
              transition-colors
            `}
            aria-label={`Tema ${label}`}
            title={`Tema ${label}`}
          >
            <span role="img" aria-hidden="true">
              {icon}
            </span>
          </motion.button>
        </FocusVisible>
      ))}
    </div>
  )
} 