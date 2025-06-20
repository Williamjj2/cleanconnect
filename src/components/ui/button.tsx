'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { useButton } from '@react-aria/button'
import { AriaButtonProps } from '@react-types/button'
import useSound from 'use-sound'
import { Loading } from './loading'
import { FocusVisible } from './focus-visible'

interface ButtonProps extends AriaButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', fullWidth = false, isLoading = false, className = '', ...props }, ref) => {
    const buttonRef = ref as React.RefObject<HTMLButtonElement>
    const { buttonProps, isPressed } = useButton({
      ...props,
      isDisabled: props.isDisabled || isLoading,
    }, buttonRef)
    
    // Feedback sonoro
    const [playActive] = useSound('/sounds/click.mp3', { volume: 0.5 })
    const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.2 })

    // Animação do botão
    const animation = useSpring({
      scale: isPressed ? 0.95 : 1,
      config: { tension: 300, friction: 10 },
    })

    // Variantes de estilo
    const baseStyles = 'rounded-md font-medium transition-colors'
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark dark:bg-primary-light dark:hover:bg-primary',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary-light dark:text-primary-light dark:hover:bg-primary-light dark:hover:text-gray-900',
    }
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onHoverStart={() => !isLoading && !props.isDisabled && playHover()}
      >
        <FocusVisible>
          <animated.button
            {...buttonProps}
            ref={buttonRef}
            style={{ ...animation, width: fullWidth ? '100%' : 'auto' }}
            className={`
              ${baseStyles}
              ${variants[variant]}
              ${sizes[size]}
              ${className}
              ${isLoading ? 'cursor-not-allowed opacity-70' : ''}
              inline-flex items-center justify-center
            `}
            onClick={(e) => {
              if (!isLoading && !props.isDisabled) {
                playActive()
                props.onPress?.(e as any)
              }
            }}
          >
            {isLoading ? (
              <>
                <Loading size={size} className="mr-2" />
                {children}
              </>
            ) : (
              children
            )}
          </animated.button>
        </FocusVisible>
      </motion.div>
    )
  }
)

Button.displayName = 'Button'

export { Button } 