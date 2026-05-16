'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'
import { programs, certificateBadges } from '@/lib/data'
import { staggerItem } from '@/lib/animations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const tabs = ['Tech & Engineering', 'Business & Commerce', 'Science & Law', 'Certificate Courses'] as const
type Tab = typeof tabs[number]

const tabCategoryMap: Record<string, typeof programs[number]['category']> = {
  'Tech & Engineering': 'tech',
  'Business & Commerce': 'business',
  'Science & Law': 'science',
  'Certificate Courses': 'certificate',
}

export default function Programs() {
  const [activeTab, setActiveTab] = useState<Tab>('Tech & Engineering')
  const { ref, isInView } = useScrollAnimation(0.1)

  const activePrograms = programs.filter((p) => p.category === tabCategoryMap[activeTab])

  return (
    <section id="programs" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-surface" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary mb-4">
            Programs
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Choose from 50+ industry-ready programs
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-accent to-highlight text-white'
                  : 'bg-white/[0.04] text-textSecondary hover:text-textPrimary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'Certificate Courses' ? (
              <div className="flex flex-wrap justify-center gap-3">
                {certificateBadges.map((badge) => (
                  <span
                    key={badge}
                    className="border border-accent/40 bg-accent/10 text-textPrimary rounded-full px-4 py-2 text-sm font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4">
                {activePrograms.map((program) => (
                  <motion.div
                    key={program.name}
                    variants={staggerItem}
                    className="w-[calc(25%-12px)] min-w-[220px]"
                  >
                    <BorderGlow
                      edgeSensitivity={25}
                      glowColor="0 85% 60%"
                      backgroundColor="#1C0A0A"
                      borderRadius={18}
                      glowRadius={35}
                      glowIntensity={1.2}
                      coneSpread={20}
                      animated={true}
                      isInView={isInView}
                      colors={['#EF4444', '#991B1B', '#F97316']}
                      fillOpacity={0.4}
                      className="h-full"
                    >
                      <div className="p-6 h-full flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-textPrimary mb-2 leading-snug">
                            {program.name}
                          </h3>
                          <span className="inline-block text-xs text-accent border border-accent/30 rounded-full px-2 py-0.5 mb-3">
                            {program.duration}
                          </span>
                          <p className="text-textSecondary text-sm leading-relaxed">
                            {program.description}
                          </p>
                        </div>
                        <a
                          href="#programs"
                          className="inline-flex items-center gap-1 text-accent text-sm font-medium mt-4 group-hover:gap-2 transition-all"
                        >
                          Learn More <ArrowRight size={14} />
                        </a>
                      </div>
                    </BorderGlow>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}