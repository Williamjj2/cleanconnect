'use client'

import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import useSound from 'use-sound'

interface ToastProps {
  title?: string
  description?: string
  type?: 'success' | 'error' | 'info'
  duration?: number
  onClose?: () => void
}

const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ title, description, type = 'info', duration = 5000, onClose, ...props }, ref) => {
    const [playSound] = useSound('/sounds/notification.mp3', { volume: 0.3 })

    React.useEffect(() => {
      playSound()
    }, [playSound])

    const animation = useSpring({
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
      config: { tension: 300, friction: 20 },
    })

    const variants = {
      success: 'bg-green-50 border-green-500 text-green-900',
      error: 'bg-red-50 border-red-500 text-red-900',
      info: 'bg-blue-50 border-blue-500 text-blue-900',
    }

    const iconVariants = {
      success: '✓',
      error: '✕',
      info: 'ℹ',
    }

    return (
      <ToastPrimitives.Provider>
        <AnimatePresence>
          <ToastPrimitives.Root
            ref={ref}
            duration={duration}
            onOpenChange={(open) => !open && onClose?.()}
            {...props}
          >
            <animated.div
              style={animation}
              className={`
                pointer-events-auto flex w-full max-w-md rounded-lg border p-4 shadow-lg
                ${variants[type]}
              `}
            >
              <div className="flex-1">
                {title && (
                  <ToastPrimitives.Title className="text-sm font-medium">
                    <span className="mr-2">{iconVariants[type]}</span>
                    {title}
                  </ToastPrimitives.Title>
                )}
                {description && (
                  <ToastPrimitives.Description className="mt-1 text-sm">
                    {description}
                  </ToastPrimitives.Description>
                )}
              </div>
              <ToastPrimitives.Close
                className="text-gray-400 hover:text-gray-900"
                aria-label="Fechar"
              >
                ✕
              </ToastPrimitives.Close>
            </animated.div>
          </ToastPrimitives.Root>
        </AnimatePresence>
        <ToastPrimitives.Viewport className="fixed bottom-0 right-0 z-50 m-6 flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]" />
      </ToastPrimitives.Provider>
    )
  }
)

Toast.displayName = 'Toast'

export { Toast } 