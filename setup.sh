#!/bin/bash

# Script de setup automático para CleanConnect
# Execute este script na pasta raiz do seu projeto Next.js

echo "🚀 Iniciando setup do CleanConnect..."

# Criar estrutura de pastas
echo "📁 Criando estrutura de pastas..."
mkdir -p src/app/{api/translate,api/webhooks/stripe,\(auth\)/login,\(auth\)/onboarding,\(dashboard\)/agenda,\(dashboard\)/clients,\(dashboard\)/profile}
mkdir -p src/app/\[username\]
mkdir -p src/components/{ui,dashboard,agenda,public-profile}
mkdir -p src/lib/{supabase,utils,hooks}
mkdir -p src/{store,types}
mkdir -p supabase/{migrations,functions}
mkdir -p public/{icons,images}

# Criar arquivo .env.local
echo "🔐 Criando arquivo .env.local..."
cat > .env.local << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# OpenAI
OPENAI_API_KEY=your-openai-key

# Twilio
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# Criar next.config.js
echo "⚙️ Criando next.config.js..."
cat > next.config.js << 'EOF'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
}

module.exports = withPWA(nextConfig)
EOF

# Criar src/lib/supabase/client.ts
echo "🔧 Criando cliente Supabase..."
cat > src/lib/supabase/client.ts << 'EOF'
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
EOF

# Criar src/lib/supabase/server.ts
cat > src/lib/supabase/server.ts << 'EOF'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle error in Server Component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle error in Server Component
          }
        },
      },
    }
  )
}
EOF

# Criar src/app/layout.tsx
echo "📄 Criando layout principal..."
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CleanConnect - Seu negócio de limpeza nos EUA, sem barreiras',
  description: 'Plataforma completa para profissionais brasileiras de limpeza nos Estados Unidos',
  manifest: '/manifest.json',
  themeColor: '#0066CC',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
EOF

# Criar src/app/providers.tsx
cat > src/app/providers.tsx << 'EOF'
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { Toaster } from '@/components/ui/toaster'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster />
    </QueryClientProvider>
  )
}
EOF

# Criar manifest.json
echo "📱 Criando manifest.json para PWA..."
cat > public/manifest.json << 'EOF'
{
  "name": "CleanConnect",
  "short_name": "CleanConnect",
  "description": "Seu negócio de limpeza nos EUA",
  "theme_color": "#0066CC",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
EOF

# Criar tailwind.config.ts atualizado
echo "🎨 Atualizando configuração do Tailwind..."
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          dark: '#0052A3',
          light: '#3385D6',
        },
        success: {
          DEFAULT: '#00AA44',
          light: '#00CC52',
        },
        warning: {
          DEFAULT: '#FFB700',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
EOF

# Criar página inicial básica
echo "🏠 Criando página inicial..."
cat > src/app/page.tsx << 'EOF'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
      <div className="text-center text-white p-8">
        <h1 className="text-5xl font-bold mb-4">CleanConnect</h1>
        <p className="text-xl mb-8 opacity-90">
          Seu negócio de limpeza nos EUA, sem barreiras
        </p>
        <div className="space-y-4">
          <Link 
            href="/login" 
            className="block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Entrar
          </Link>
          <Link 
            href="/onboarding" 
            className="block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </main>
  )
}
EOF

# Criar README atualizado
echo "📚 Criando README..."
cat > README.md << 'EOF'
# CleanConnect MVP

Plataforma para profissionais brasileiras de limpeza nos Estados Unidos.

## 🚀 Quick Start

1. Configure as variáveis de ambiente
```bash
# Edite .env.local com suas credenciais do Supabase, OpenAI, etc
```

2. Instale as dependências adicionais
```bash
npm install @supabase/ssr @hookform/resolvers react-hook-form zod
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-slot
npm install class-variance-authority clsx tailwind-merge
npm install date-fns react-day-picker
```

3. Configure o Supabase
- Crie um projeto em [supabase.com](https://supabase.com)
- Execute o schema SQL em `supabase/migrations/001_initial_schema.sql`
- Copie as chaves para `.env.local`

4. Inicie o desenvolvimento
```bash
npm run dev
```

## 📱 Features MVP

- ✅ Agenda inteligente com drag-and-drop
- ✅ IA para tradução e templates de mensagens
- ✅ Perfil público profissional
- ✅ Sistema de reviews
- ✅ PWA mobile-first

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **AI**: OpenAI GPT-4
- **SMS**: Twilio
- **Payments**: Stripe

## 📊 Estrutura do Banco

Ver arquivo `supabase/migrations/001_initial_schema.sql`

## 🎯 Próximos Passos

1. [ ] Implementar autenticação
2. [ ] Criar componentes base
3. [ ] Desenvolver dashboard
4. [ ] Integrar OpenAI
5. [ ] Configurar PWA
EOF

echo "✅ Setup concluído!"
echo ""
echo "⚠️  IMPORTANTE - Próximos passos:"
echo "1. Copie o SQL do schema para supabase/migrations/001_initial_schema.sql"
echo "2. Configure suas credenciais em .env.local"
echo "3. Instale as dependências adicionais listadas no README"
echo "4. Execute: npm run dev"
echo ""
echo "📚 Documentação completa no README.md"
