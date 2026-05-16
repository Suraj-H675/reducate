'use client'
import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, FlaskConical, Award } from 'lucide-react'
import { whyCards } from '@/lib/data'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { staggerContainer, staggerItem } from '@/lib/animations'

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, Briefcase, FlaskConical, Award,
}

export default function WhyJGU() {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-textPrimary mb-3">
            Why Students Choose JGU
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Built for the next generation of tech leaders
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {whyCards.map((card) => {
            const Icon = iconMap[card.icon] ?? GraduationCap
            return (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className="group bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-accent/20 to-highlight/20 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Icon className="text-accent" size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-textPrimary mb-2">{card.title}</h3>
                    <p className="text-textSecondary text-sm leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}