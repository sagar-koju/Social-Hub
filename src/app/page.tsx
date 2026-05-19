'use client'

import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { HowItWorksSection } from '@/components/sections/how-it-works-section'
import { StatisticsSection } from '@/components/sections/statistics-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTABannerSection } from '@/components/sections/cta-banner-section'
import { AnimatedBackground } from '@/components/ui/animated-background'

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-background text-foreground transition-colors duration-300">
      <AnimatedBackground variant="blobs" />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatisticsSection />
      <Footer />
    </main>
  )
}
