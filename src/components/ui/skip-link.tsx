'use client'

import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SkipLinkProps {
  targetId: string
  children: React.ReactNode
}

export function SkipLink({ targetId, children }: SkipLinkProps) {
  const [isFocused, setIsFocused] = useState(false)

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    target?.focus()
    target?.scrollIntoView({ behavior: 'smooth' })
  }, [targetId])

  return (
    <AnimatePresence>
      {isFocused && (
        <motion.a
          href={`#${targetId}`}
          onClick={handleClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="
            fixed top-4 left-4 z-50
            bg-primary text-white
            px-4 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
            transition-transform transform
          "
        >
          {children}
        </motion.a>
      )}
    </AnimatePresence>
  )
} 