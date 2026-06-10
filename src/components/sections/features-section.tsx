'use client'

import { motion } from 'framer-motion'
import GlassCard from '@/components/ui/glass-card'
import {
  Sparkles,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Globe,
} from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: 'Smart Feed',
      description:
        'AI-powered personalized feed that shows you what matters most',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description:
        'Your data is encrypted and your privacy is our top priority',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Ultra-optimized performance for seamless experience',
    },
    {
      icon: Users,
      title: 'Community',
      description:
        'Join communities of like-minded people from around the world',
    },
    {
      icon: TrendingUp,
      title: 'Analytics',
      description: 'Track your growth with detailed insights and metrics',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description:
        'Connect with millions of users across every continent',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="features"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-950"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-slate-900 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to share, connect, and grow. Packed with
            features designed for modern social networking.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <GlassCard delay={index * 0.05} hover>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-white to-slate-300 dark:from-blue-500/30 dark:to-purple-500/30 flex items-center justify-center"
                  >
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-slate-900 dark:text-slate-400">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
