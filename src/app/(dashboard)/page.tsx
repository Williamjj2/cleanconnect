'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function Dashboard() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      toast.error('Erro ao sair: ' + error.message)
    } else {
      toast.success('Logout realizado com sucesso! 👋')
      router.push('/')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow text-center">
      <h1 className="text-3xl font-bold text-primary mb-4">Dashboard</h1>
      <p className="mb-6">Você está logado. Bem-vindo(a) à CleanConnect!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded font-semibold transition"
      >
        Sair da Conta
      </button>
    </div>
  )
}

