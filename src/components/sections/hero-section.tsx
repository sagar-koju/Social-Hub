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
     <section id='home' className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-10 w-96 h-96  rounded-full blur-3xl"
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
              className="text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight"
            >
              Connect. Share. Engage.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl dark:text-slate-300 leading-relaxed max-w-lg"
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
                <div className="text-3xl font-bold dark:text-blue-400">50M+</div>
                <p className="text-slate-800 dark:text-slate-400">Active Users</p>
              </div>
              <div>
                <div className="text-3xl font-bold dark:text-purple-400">1B+</div>
                <p className="text-slate-800 dark:text-slate-400">Posts Shared</p>
              </div>
              <div>
                <div className="text-3xl font-bold dark:text-pink-400">24/7</div>
                <p className="text-slate-900 dark:text-slate-400">Support</p>
              </div>
            </motion.div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative h-[500px] hidden md:block">
            {/* Central dashboard mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 bg-gradient-to-br from-slate-200 dark:from-slate-800/50 to-slate-300 dark:to-slate-900/50 rounded-3xl border border-black/10 dark:border-white/10 backdrop-blur-xl p-6 shadow-2xl"
            >
              <div className="h-full bg-gradient-to-br border border-slate-500/20 from-blue-900/40 via-purple-900/0 to-slate-900/20 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-slate-900/20 rounded-2xl flex items-center justify-center">
                <Zap className="w-24 h-24 text-blue-400 dark:text-blue-400/30" />
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
                className={`absolute w-32 h-32 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md p-4 flex flex-col items-center justify-center cursor-pointer dark:hover:border-white/20 transition-all ${
                  index === 0
                    ? 'top-0 -left-10'
                    : index === 1
                      ? 'top-32 -right-20'
                      : 'bottom-10 left-1/2'
                }`}
              >
                <card.icon className="w-8 h-8 text-blue-400 mb-2" />
                <span className="text-sm font-semibold dark:text-slate-300">
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
