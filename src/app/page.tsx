'use client'

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
            href="/auth/login"
            className="block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Entrar
          </Link>
          <Link
            href="/auth/onboarding"
            className="block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
          >
            Começar Grátis
          </Link>
        </div>
      </div>
    </main>
  )
}

