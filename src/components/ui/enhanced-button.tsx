'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { cn } from '@/lib/utils'

interface EnhancedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const EnhancedButton = React.forwardRef<
  HTMLButtonElement,
  EnhancedButtonProps
>(
  (
    { variant = 'primary', size = 'md', className, children, ...props },
    ref
  ) => {
    const baseStyles = 'font-semibold transition-all duration-300 relative'
    const sizeStyles = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-2xl',
    }
    const variantStyles = {
      primary:
        'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105',
      secondary:
        'bg-slate-800 text-white hover:bg-slate-700 hover:scale-105 border border-slate-700',
      outline:
        'border-2 border-slate-500 text-slate-700 dark:text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20',
      gradient:
        'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105',
    }

    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="inline-block"
      >
        <button
          ref={ref}
          className={cn(
            baseStyles,
            sizeStyles[size],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          {children}
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </button>
      </motion.div>
    )
  }
)

EnhancedButton.displayName = 'EnhancedButton'
export default EnhancedButton
