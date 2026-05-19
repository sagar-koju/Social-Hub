'use client'
import { motion } from 'framer-motion'
import EnhancedButton from '@/components/ui/enhanced-button'
import { Heart, MessageCircle, Router, Share2, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function HeroSection() {
  const router = useRouter();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  }

  const floatingCards = [
    { icon: Heart, label: 'Likes', delay: 0 },
    { icon: MessageCircle, label: 'Chat', delay: 0.2 },
    { icon: Share2, label: 'Share', delay: 0.4 },
  ]

  return (
    <section id='home' className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 h-96 w-96 rounded-full bg-linear-to-br from-blue-500/20 to-cyan-500/20 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.h1
              variants={itemVariants}
              className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-black leading-tight text-transparent md:text-6xl lg:text-7xl"
            >
              Connect. Share. Engage.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl leading-relaxed max-w-lg text-muted"
            >
              The next generation of social media. Real connections, authentic
              moments, and endless possibilities. Join millions of creators and
              influencers today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <EnhancedButton onClick={()=>{
                router.push('/signup')
              }} variant="gradient" size="lg">
                Get Started Free
              </EnhancedButton>
              <EnhancedButton variant="outline" size="lg">
                Watch Demo
              </EnhancedButton>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-8"
            >
              <div>
                <div className="text-3xl font-bold text-blue-400">50M+</div>
                <p className="text-muted">Active Users</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">1B+</div>
                <p className="text-muted">Posts Shared</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">24/7</div>
                <p className="text-muted">Support</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative hidden h-125 md:block">
            {/* Central dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 rounded-3xl border border-border bg-card/80 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex h-full items-center justify-center rounded-2xl bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10">
                <Zap className="w-24 h-24 text-blue-400/30" />
              </div>
            </motion.div>

            {/* Floating Cards */}
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + card.delay,
                }}
                whileHover={{ y: -10, scale: 1.05 }}
                className={`absolute flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-border bg-background/80 p-4 backdrop-blur-md transition-all hover:border-border/80 ${
                  index === 0
                    ? 'top-0 -left-10'
                    : index === 1
                      ? 'top-32 -right-20'
                      : 'bottom-10 left-1/2'
                }`}
              >
                <card.icon className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-sm font-semibold text-foreground">
                  {card.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
