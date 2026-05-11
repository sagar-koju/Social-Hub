'use client'

import { motion } from 'framer-motion'
import { UserPlus, Share2, TrendingUp } from 'lucide-react'

export function HowItWorksSection() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description:
        'Sign up with your email or social media account. It takes less than a minute to get started.',
      number: '01',
    },
    {
      icon: Share2,
      title: 'Start Connecting',
      description:
        'Find friends, follow creators, and join communities that match your interests.',
      number: '02',
    },
    {
      icon: TrendingUp,
      title: 'Grow & Engage',
      description:
        'Share your moments, engage with others, and watch your influence grow.',
      number: '03',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="how-it-works"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              How It Works
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Get started in three simple steps and unlock the power of social
            connection.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-12"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="flex gap-8 items-center">
                {/* Step Number & Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse" />
                    <div className="relative w-24 h-24 bg-slate-900 rounded-2xl border border-white/10 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-1">
                        {step.number}
                      </div>
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-h-24">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-lg">{step.description}</p>
                </div>

                {/* Connector Line (Desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-12 top-full h-20 w-1 bg-gradient-to-b from-blue-500/50 to-purple-600/50" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
