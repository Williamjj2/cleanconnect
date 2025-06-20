'use client'

import { useKeyboardFocus } from '@/hooks/use-keyboard-focus'

interface FocusVisibleProps {
  children: React.ReactNode
  className?: string
}

export function FocusVisible({ children, className = '' }: FocusVisibleProps) {
  const isKeyboardUser = useKeyboardFocus()

  return (
    <div
      className={`
        ${className}
        ${isKeyboardUser ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2' : ''}
      `}
    >
      {children}
    </div>
  )
} 