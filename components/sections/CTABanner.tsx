'use client'
import { motion } from 'framer-motion'
import { FileDown } from 'lucide-react'
import Button from '@/components/ui/Button'
import GradientText from '@/components/ui/GradientText'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { scaleIn } from '@/lib/animations'

export default function CTABanner() {
  const { ref, isInView } = useScrollAnimation(0.2)

  return (
    <section id="admissions" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background" ref={ref}>
      {/* Red glow border */}
      <div className="max-w-5xl mx-auto relative rounded-3xl p-px bg-gradient-to-r from-accent/60 via-highlight/60 to-accent/60">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/20 via-deep/30 to-highlight/20" />
        <div className="relative bg-surface rounded-[calc(1.5rem-1px)] p-12 md:p-16 text-center">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className="inline-block uppercase tracking-widest text-xs font-semibold text-accent mb-6">
              ADMISSIONS OPEN 2026–27
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary mb-4">
              Your Future in Tech Starts at{' '}
              <GradientText variant="accent">JGU.</GradientText>
            </h2>
            <p className="text-textSecondary text-lg max-w-xl mx-auto mb-10">
              Limited seats across AI, Engineering, Business and emerging tech.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Apply Now
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <FileDown size={18} />
                Download Brochure
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}