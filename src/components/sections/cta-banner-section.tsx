'use client'

import { motion } from 'framer-motion'
import EnhancedButton from '@/components/ui/enhanced-button'
import { Zap } from 'lucide-react'

export function CTABannerSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 to-slate-950" />

      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Ready to Get Started?
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Join millions of users on SocialHub today. Create your account in
            seconds and start connecting with the world.
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <EnhancedButton variant="gradient" size="lg">
              Start Your Journey
            </EnhancedButton>
            <EnhancedButton variant="outline" size="lg">
              Learn More
            </EnhancedButton>
          </motion.div>

          <motion.p
            className="text-sm text-slate-500 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            No credit card required • Free forever plan • Full access to
            features
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
