'use client'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import Aurora from '@/components/ui/Aurora'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
import { StaggeredText } from '@/components/ui/AnimatedText'
import ArtPanel from '@/components/ui/ArtPanel'
import { useCountUp } from '@/hooks/useCountUp'
import { stats } from '@/lib/data'

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const count = useCountUp(value, 2000)
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold">
        <GradientText variant="accent">{count}{suffix}</GradientText>
      </div>
      <div className="text-xs text-textSecondary mt-1 uppercase tracking-wider">{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Layer 0: base bg */}
      <div className="absolute inset-0 bg-background z-0" />

      {/* Layer 1: Aurora WebGL */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={['#EF4444', '#7C0000', '#F97316']}
          speed={0.4}
          blend={0.6}
          amplitude={1.2}
        />
      </div>

      {/* Layer 2: Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded-full px-4 py-1.5 mb-6"
            >
              <span className="text-accent text-sm font-semibold">Admissions Open 2026–27</span>
            </motion.div>

            {/* H1 — mobile: smaller, tighter */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="block text-textPrimary"><StaggeredText text="Build What" wordDelay={0.08} /></span>
              <span className="block"><GradientText variant="accent"><StaggeredText text="Comes Next." wordDelay={0.08} /></GradientText></span>
            </h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-textSecondary leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              JG University prepares future tech leaders through AI, Quantum Computing, and hands-on experiential learning. Your career starts here.
            </motion.p>

            {/* CTAs — stack on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start mb-10"
            >
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center">Explore Programs</Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto justify-center flex items-center gap-2">
                <PlayCircle size={20} />
                Watch Our Story
              </Button>
            </motion.div>

            {/* Stats — 2x2 on mobile, 4-col on desktop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
            >
              {stats.map((stat) => (
                <StatItem key={stat.label} {...stat} />
              ))}
            </motion.div>
          </div>

          {/* Right: SVG art panel */}
          <div className="hidden lg:flex items-center h-[520px] pl-32">
            <ArtPanel />
          </div>
        </div>
      </div>
    </section>
  )
}