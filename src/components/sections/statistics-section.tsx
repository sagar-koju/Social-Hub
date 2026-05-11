'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlassCard from '@/components/ui/glass-card'

export function StatisticsSection() {
  const [stats, setStats] = useState([
    { label: 'Active Users', value: 0, target: 50 },
    { label: 'Posts Created', value: 0, target: 1000 },
    { label: 'Daily Interactions', value: 0, target: 5 },
    { label: 'Countries', value: 0, target: 195 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: Math.min(stat.value + stat.target / 30, stat.target),
        }))
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const avatarStack = [
    { initials: 'AJ', color: 'from-blue-400 to-purple-600' },
    { initials: 'MK', color: 'from-purple-400 to-pink-600' },
    { initials: 'SK', color: 'from-pink-400 to-rose-600' },
    { initials: 'PR', color: 'from-rose-400 to-orange-600' },
    { initials: 'LP', color: 'from-orange-400 to-yellow-600' },
  ]

  return (
    <section
      id="community"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Join Our Global Community
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Millions of people around the world are already connecting,
            creating, and growing on SocialHub.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard>
                <div className="text-center">
                  <motion.div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                      {Math.round(stat.value)}M+
                    </span>
                  </motion.div>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Avatar Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center items-center gap-4 flex-wrap"
        >
          <span className="text-slate-400 font-medium">Join with us:</span>
          <div className="flex -space-x-4">
            {avatarStack.map((avatar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + index * 0.1,
                }}
                whileHover={{ scale: 1.2, zIndex: 50 }}
                className={`w-12 h-12 rounded-full border-2 border-slate-900 bg-gradient-to-br ${avatar.color} flex items-center justify-center font-bold text-white cursor-pointer transition-transform`}
                title={`User ${avatar.initials}`}
              >
                {avatar.initials}
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-sm text-slate-400 font-bold"
            >
              +10k
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
