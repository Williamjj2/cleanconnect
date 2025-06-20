import { motion } from 'framer-motion'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
}

const Loading = ({ size = 'md', color = 'currentColor', className = '' }: LoadingProps) => {
  return (
    <div
      role="status"
      aria-label="Carregando..."
      className={`inline-flex items-center justify-center ${className}`}
    >
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-t-transparent`}
        style={{ borderColor: `${color} transparent transparent transparent` }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <span className="sr-only">Carregando...</span>
    </div>
  )
}

export { Loading } 