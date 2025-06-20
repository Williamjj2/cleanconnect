'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import useSound from 'use-sound'
import { FocusVisible } from './focus-visible'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = '', ...props }, ref) => {
    const [playFocus] = useSound('/sounds/focus.mp3', { volume: 0.2 })
    const [playType] = useSound('/sounds/type.mp3', { volume: 0.1 })

    const animation = useSpring({
      from: { y: 5, opacity: 0 },
      to: { y: 0, opacity: 1 },
      config: { tension: 300, friction: 10 },
    })

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-1"
      >
        <label
          htmlFor={props.id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
          {props.required && (
            <span className="text-red-500 dark:text-red-400 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>

        <animated.div style={animation}>
          <FocusVisible>
            <input
              ref={ref}
              className={`
                w-full px-3 py-2 border rounded-md
                disabled:opacity-50 disabled:cursor-not-allowed
                ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
                ${className}
              `}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={
                error ? `${props.id}-error` : hint ? `${props.id}-hint` : undefined
              }
              onFocus={() => playFocus()}
              onChange={(e) => {
                playType()
                props.onChange?.(e)
              }}
              {...props}
            />
          </FocusVisible>
        </animated.div>

        {error && (
          <motion.p
            id={`${props.id}-error`}
            className="text-sm text-red-500 dark:text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.p>
        )}

        {hint && !error && (
          <motion.p
            id={`${props.id}-hint`}
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {hint}
          </motion.p>
        )}
      </motion.div>
    )
  }
)

Input.displayName = 'Input'

export { Input } 