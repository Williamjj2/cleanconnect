'use client'

import { ThemeSelector } from '@/components/ui/theme-selector'

interface ClientLayoutProps {
  children: React.ReactNode
}

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="fixed top-4 right-4 z-50">
        <ThemeSelector />
      </div>
      {children}
    </div>
  )
} 