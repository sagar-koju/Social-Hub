'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import GlassCard from '@/components/ui/glass-card'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Alex Johnson',
      handle: '@alexjohn',
      avatar: 'AJ',
      content:
        'SocialHub has completely changed how I connect with my audience. The features are intuitive and the community is incredible!',
      rating: 5,
      color: 'from-blue-400 to-purple-600',
    },
    {
      name: 'Maria Chen',
      handle: '@mariachen',
      avatar: 'MC',
      content:
        'I love the privacy-first approach. Finally a social platform that respects my data while letting me express myself freely.',
      rating: 5,
      color: 'from-purple-400 to-pink-600',
    },
    {
      name: 'David Smith',
      handle: '@davidsmith',
      avatar: 'DS',
      content:
        'The analytics dashboard is amazing. I can track my growth and engagement in real-time. Highly recommended!',
      rating: 5,
      color: 'from-pink-400 to-rose-600',
    },
    {
      name: 'Sophie Laurent',
      handle: '@sophiel',
      avatar: 'SL',
      content:
        'The community features are what make SocialHub special. Meeting people with shared interests has never been easier.',
      rating: 5,
      color: 'from-rose-400 to-orange-600',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950/20" />

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
              Loved by Our Community
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            See what users are saying about their SocialHub experience.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative h-96 md:h-80 mb-12">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute w-full"
          >
            <GlassCard hover={false}>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[currentIndex].color} flex items-center justify-center font-bold text-white`}
                    >
                      {testimonials[currentIndex].avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {testimonials[currentIndex].handle}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      )
                    )}
                  </div>
                </div>

                <p className="text-lg text-slate-300 leading-relaxed">
                  "{testimonials[currentIndex].content}"
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-gradient-to-r from-blue-400 to-purple-600 w-8'
                  : 'bg-slate-700 w-2 hover:bg-slate-600'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
