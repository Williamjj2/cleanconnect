import { Inter } from 'next/font/google'
import { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'
import { ClientLayout } from '@/components/client-layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CleanConnect - Seu negócio de limpeza nos EUA, sem barreiras',
  description: 'Plataforma completa para profissionais brasileiras de limpeza nos Estados Unidos',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  )
}
