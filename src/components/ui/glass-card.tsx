'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', delay = 0, hover = true }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, delay }}
        viewport={{ once: true, margin: '-100px' }}
        whileHover={
          hover
            ? { y: -5, boxShadow: '0 25px 50px rgba(59, 130, 246, 0.1)' }
            : {}
        }
        className={`
          relative rounded-2xl border border-slate-500/20 dark:border-white/10 bg-blue-100/60 dark:bg-white/5
          backdrop-blur-md p-6 hover:bg-blue-100/80
          dark:hover:border-white/20 transition-all duration-500
          ${className}
        `}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="relative z-10">{children}</div>
      </motion.div>
    )
  }
)

GlassCard.displayName = 'GlassCard'
export default GlassCard
