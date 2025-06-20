'use client'

import { useEffect, useState } from 'react'

export function useKeyboardFocus() {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false)

  useEffect(() => {
    function handleFirstTab(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true)
        window.removeEventListener('keydown', handleFirstTab)
      }
    }

    window.addEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', () => setIsKeyboardUser(false))
    window.addEventListener('touchstart', () => setIsKeyboardUser(false))

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', () => setIsKeyboardUser(false))
      window.removeEventListener('touchstart', () => setIsKeyboardUser(false))
    }
  }, [])

  return isKeyboardUser
} 