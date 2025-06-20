'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Toast } from '@/components/ui/toast'
import { Input } from '@/components/ui/input'
import { SkipLink } from '@/components/ui/skip-link'

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      Toast({
        title: 'Erro ao fazer login',
        description: error.message,
        type: 'error'
      })
    } else {
      Toast({
        title: 'Login realizado com sucesso!',
        type: 'success'
      })
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <>
      <SkipLink targetId="login-form">
        Pular para o formulário de login
      </SkipLink>

      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
          variants={itemVariants}
        >
          <motion.h1
            className="text-2xl font-bold text-center text-primary mb-6"
            variants={itemVariants}
          >
            Entrar na CleanConnect
          </motion.h1>
          
          <form
            id="login-form"
            onSubmit={handleSubmit}
            className="space-y-4"
            tabIndex={-1}
          >
            <motion.div variants={itemVariants}>
              <Input
                id="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Input
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                isLoading={loading}
                fullWidth
                aria-label={loading ? 'Entrando...' : 'Entrar'}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
} 