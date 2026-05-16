'use client'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '@/lib/data'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { staggerContainer, staggerItem } from '@/lib/animations'

export default function Testimonials() {
  const { ref, isInView } = useScrollAnimation(0.1)

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary mb-4">
            Students Who Built Their Future Here
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-6"
            >
              {/* Quote mark */}
              <div className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent text-6xl opacity-40 font-serif leading-none mb-2">
                "
              </div>
              {/* Quote */}
              <p className="text-textSecondary italic text-base md:text-lg mb-6 leading-relaxed">
                {t.quote}
              </p>
              {/* Divider */}
              <div className="border-t border-white/10 mb-4" />
              {/* Avatar + info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-highlight flex items-center justify-center text-white font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <div className="text-textPrimary font-semibold text-sm">{t.name}</div>
                  <div className="text-textSecondary text-xs">{t.program} · {t.year}</div>
                </div>
              </div>
              {/* Stars */}
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}