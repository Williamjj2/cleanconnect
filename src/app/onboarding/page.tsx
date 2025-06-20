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

export default function OnboardingPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {}

    if (!name) {
      newErrors.name = 'Nome é obrigatório'
    }

    if (!email) {
      newErrors.email = 'E-mail é obrigatório'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido'
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres'
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
    
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (signUpError) {
      Toast({
        title: 'Erro ao criar conta',
        description: signUpError.message,
        type: 'error'
      })
    } else {
      Toast({
        title: 'Conta criada com sucesso!',
        description: 'Verifique seu e-mail para confirmar o cadastro.',
        type: 'success'
      })
      router.push('/login')
    }

    setLoading(false)
  }

  return (
    <>
      <SkipLink targetId="signup-form">
        Pular para o formulário de cadastro
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
            Criar Conta na CleanConnect
          </motion.h1>
          
          <form
            id="signup-form"
            onSubmit={handleSubmit}
            className="space-y-4"
            tabIndex={-1}
          >
            <motion.div variants={itemVariants}>
              <Input
                id="name"
                label="Nome Completo"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />
            </motion.div>

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
                hint="Mínimo de 6 caracteres"
                required
                minLength={6}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                isLoading={loading}
                fullWidth
                aria-label={loading ? 'Criando conta...' : 'Criar Conta'}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </>
  )
} 