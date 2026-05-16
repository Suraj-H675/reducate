'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Database, Shield, Layers, Rocket, Globe, Users } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { slideInLeft, slideInRight } from '@/lib/animations'

// Static logo with connecting lines that animate on scroll
// viewBox 700x300, logo positioned down+right, techy lines with corners + diagonals
const JGU_LOGO_STATIC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300">
  <defs>
    <linearGradient id="line-left-grad" x1="100%" y1="50%" x2="0%" y2="50%">
      <stop offset="0%" stop-color="#EF4444" stop-opacity="0"/>
      <stop offset="100%" stop-color="#EF4444" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="line-right-grad" x1="0%" y1="50%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="#F97316" stop-opacity="0"/>
      <stop offset="100%" stop-color="#F97316" stop-opacity="0.85"/>
    </linearGradient>
    <filter id="glow-red">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow-orange">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <style>
      .draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: drawAnim 0.9s ease-out forwards; }
      .draw-long { stroke-dasharray: 450; stroke-dashoffset: 450; animation: drawAnim 1.1s ease-out forwards; }
      @keyframes drawAnim { to { stroke-dashoffset: 0; } }
      .l1 { animation-delay: 0.05s; } .l2 { animation-delay: 0.2s; } .l3 { animation-delay: 0.35s; }
      .l4 { animation-delay: 0.5s; } .l5 { animation-delay: 0.6s; }
      .r1 { animation-delay: 0.9s; } .r2 { animation-delay: 1.05s; } .r3 { animation-delay: 1.2s; }
      .r4 { animation-delay: 1.35s; } .r5 { animation-delay: 1.45s; }
      .dot-in { animation: fadeIn 0.4s ease-out forwards; animation-delay: 0.7s; opacity: 0; }
      .dot-out { animation: fadeIn 0.4s ease-out forwards; animation-delay: 1.55s; opacity: 0; }
      @keyframes fadeIn { to { opacity: 1; } }
    </style>
  </defs>

  <!-- LEFT LINES (red) — techy with rounded corners and diagonals -->
  <path fill="none" stroke="url(#line-left-grad)" stroke-width="3" d="M15,70 L160,70 L205,105" class="draw l1" filter="url(#glow-red)"/>
  <circle cx="15" cy="70" r="6" fill="none" stroke="#EF4444" stroke-width="2" class="l1"/>
  <circle cx="205" cy="105" r="5" fill="#EF4444" class="dot-in"/>

  <path fill="none" stroke="url(#line-left-grad)" stroke-width="3" d="M10,150 L160,150" class="draw-long l2" filter="url(#glow-red)"/>
  <circle cx="10" cy="150" r="6" fill="none" stroke="#EF4444" stroke-width="2" class="l2"/>
  <circle cx="160" cy="150" r="5" fill="#EF4444" class="dot-in"/>

  <path fill="none" stroke="url(#line-left-grad)" stroke-width="3" d="M15,230 L160,230 L205,195" class="draw l3" filter="url(#glow-red)"/>
  <circle cx="15" cy="230" r="6" fill="none" stroke="#EF4444" stroke-width="2" class="l3"/>
  <circle cx="205" cy="195" r="5" fill="#EF4444" class="dot-in"/>

  <path fill="none" stroke="#EF4444" stroke-width="2.5" stroke-opacity="0.7" stroke-dasharray="5 7" d="M45,90 Q95,78 135,105" class="draw l4"/>
  <circle cx="45" cy="90" r="5" fill="none" stroke="#EF4444" stroke-width="2" class="l4"/>
  <circle cx="135" cy="105" r="4" fill="#EF4444" fill-opacity="0.8" class="dot-in"/>

  <path fill="none" stroke="#EF4444" stroke-width="2.5" stroke-opacity="0.7" stroke-dasharray="5 7" d="M45,210 Q95,222 135,195" class="draw l5"/>
  <circle cx="45" cy="210" r="5" fill="none" stroke="#EF4444" stroke-width="2" class="l5"/>
  <circle cx="135" cy="195" r="4" fill="#EF4444" fill-opacity="0.8" class="dot-in"/>

  <!-- RIGHT LINES (orange) — techy with rounded corners and diagonals -->
  <path fill="none" stroke="url(#line-right-grad)" stroke-width="3" d="M685,70 L540,70 L495,105" class="draw r1" filter="url(#glow-orange)"/>
  <circle cx="685" cy="70" r="6" fill="none" stroke="#F97316" stroke-width="2" class="r1"/>
  <circle cx="495" cy="105" r="5" fill="#F97316" class="dot-out"/>

  <path fill="none" stroke="url(#line-right-grad)" stroke-width="3" d="M690,150 L540,150" class="draw-long r2" filter="url(#glow-orange)"/>
  <circle cx="690" cy="150" r="6" fill="none" stroke="#F97316" stroke-width="2" class="r2"/>
  <circle cx="540" cy="150" r="5" fill="#F97316" class="dot-out"/>

  <path fill="none" stroke="url(#line-right-grad)" stroke-width="3" d="M685,230 L540,230 L495,195" class="draw r3" filter="url(#glow-orange)"/>
  <circle cx="685" cy="230" r="6" fill="none" stroke="#F97316" stroke-width="2" class="r3"/>
  <circle cx="495" cy="195" r="5" fill="#F97316" class="dot-out"/>

  <path fill="none" stroke="#F97316" stroke-width="2.5" stroke-opacity="0.7" stroke-dasharray="5 7" d="M655,90 Q605,78 565,105" class="draw r4"/>
  <circle cx="655" cy="90" r="5" fill="none" stroke="#F97316" stroke-width="2" class="r4"/>
  <circle cx="565" cy="105" r="4" fill="#F97316" fill-opacity="0.8" class="dot-out"/>

  <path fill="none" stroke="#F97316" stroke-width="2.5" stroke-opacity="0.7" stroke-dasharray="5 7" d="M655,210 Q605,222 565,195" class="draw r5"/>
  <circle cx="655" cy="210" r="5" fill="none" stroke="#F97316" stroke-width="2" class="r5"/>
  <circle cx="565" cy="195" r="4" fill="#F97316" fill-opacity="0.8" class="dot-out"/>

  <!-- CENTER LOGO — shifted down 35px and right 278px -->
  <g transform="translate(278, 35) scale(0.68)">
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M182.286,314.714H163.429a11.364,11.364,0,0,0-10.6,7.952c-2.667,8.083,4.333,14.5,9.083,14.5s-23.917.4-23.917.4-11.937.366-11.917,11.679,14.1,12.125,10.06,12.179c-6.83,1.259-14.821,3.914-21.226,12.238A31.32,31.32,0,0,0,110,383.188a46.649,46.649,0,0,0-1.937,11.438" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M135,361h36s4.979.333,8.333,3.417,3.573,8.177,3.573,8.177.219,5.031-3.156,8.323a19.007,19.007,0,0,1-8.25,4.333" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M147.5,388.5H122.25a23.9,23.9,0,0,0-14.75,7c-6.25,6.583-6.333,12-6.5,16s1.75,11.25,7.667,16.667A20.928,20.928,0,0,0,116.875,433c6.317,1.883,13.813.875,13.813.875" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M194.5,399.875s-.906,6-4.125,9.25-8.75,3.75-8.75,3.75h-33.5a11.926,11.926,0,0,0-10.75,9.813,11.325,11.325,0,0,0,2.813,9.875c3.019,3.217,7.938,4.188,7.938,4.188" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M112.75,431s-3.5,7.917,3.917,18.75a28.083,28.083,0,0,0,18.917,11.917h31.583s8.167-.167,12.25-3.583S183.5,448,183.5,448" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M135,461.25s-5.562,1.5-8,4.75-2.687,6.063-2.125,8.313A11.284,11.284,0,0,0,129.833,482c3.9,2.813,12.417,2,12.417,2" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#c21400" stroke-width="4" d="M142.25,485.5s1,26.333,27.625,24.25,24.625-25.5,24.625-25.5v-202" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M204,400.375s.906,5.823,4.25,9.042,9,3.333,9,3.333l38,.25a13.132,13.132,0,0,1,7.167,3.333c2.813,2.875,4.083,8.417,4.083,8.417" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#c21400" stroke-width="4" d="M225.813,460.469s-6.344.188-10.25-4.687a11.784,11.784,0,0,1-2.625-9.75,12.857,12.857,0,0,1,3.875-6.656,12.7,12.7,0,0,1,7-2.937H243.5s5.094.953,8.063,3.938,3.813,8,3.813,8v37.75s-.156,11.167-6.875,17.042a26.855,26.855,0,0,1-20,6.458c-5.312-.5-10.875-1.5-17.375-8s-7-15.458-7-15.458L204,304.25s.375-7.875,7.667-15.75,18.458-7.25,18.458-7.25,10.375,0,17.542,7.25a29.26,29.26,0,0,1,7.833,16.833v32.833" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M214.75,326.625a14.609,14.609,0,0,1,3-8.125,12.678,12.678,0,0,1,7.5-3.875h10.375s4.031.375,6.344,2.719a12.687,12.687,0,0,1,3.406,6.625,11.3,11.3,0,0,1-2.344,9.281c-3.156,4.219-8.594,4.031-8.594,4.031l25.5.281a11.662,11.662,0,0,1,8.406,3.156,13.216,13.216,0,0,1,3.75,8.531s-.062,4.75-2.844,7.813-8,4.438-8,4.438" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M289.75,394.848a40.009,40.009,0,0,0-1.375-11.285,34.431,34.431,0,0,0-5.062-9.75,40.067,40.067,0,0,0-9.875-8.5,39.559,39.559,0,0,0-12.187-4.062h-35.5a10.655,10.655,0,0,0-7.437,3.75,11.905,11.905,0,0,0,0,15.875,15.579,15.579,0,0,0,8.5,4.688" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M250,388.375h25.25s9.125.875,15.25,6.875,6.688,15.25,6.688,15.25.063,9.25-5.75,16-16.187,8-16.187,8" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M285.75,431.375A28.451,28.451,0,0,1,281,450.417c-6.333,9.083-18.25,11.208-18.25,11.208H241" transform="translate(-86 -263)"/>
    <path fill="none" stroke="#d1ad3e" stroke-width="4" d="M264.625,461.625a13.028,13.028,0,0,1,6.844,4.688,12.482,12.482,0,0,1,2.063,7.781,11.816,11.816,0,0,1-4.219,7.188,12.033,12.033,0,0,1-8.146,2.552H228.833" transform="translate(-86 -263)"/>
    <circle fill="#d1ad3e" r="5" cx="96" cy="52"/>
    <circle fill="#d1ad3e" r="5" cx="78" cy="75"/>
    <circle fill="#d1ad3e" r="5" cx="85" cy="122"/>
    <circle fill="#d1ad3e" r="5" cx="61" cy="125"/>
    <circle fill="#d1ad3e" r="5" cx="45" cy="171"/>
    <circle fill="#d1ad3e" r="5" cx="63" cy="173"/>
    <circle fill="#d1ad3e" r="5" cx="98" cy="186"/>
    <circle fill="#d1ad3e" r="5" cx="155" cy="199"/>
    <circle fill="#d1ad3e" r="5" cx="189" cy="171"/>
    <circle fill="#d1ad3e" r="5" cx="180" cy="162"/>
    <circle fill="#d1ad3e" r="5" cx="164" cy="125"/>
    <circle fill="#d1ad3e" r="5" cx="141" cy="122"/>
    <circle fill="#d1ad3e" r="5" cx="149" cy="74"/>
    <circle fill="#d1ad3e" r="5" cx="129" cy="63"/>
    <circle fill="#c21400" r="5" cx="108" cy="20"/>
    <circle fill="#d1ad3e" r="5" cx="144" cy="221"/>
    <circle fill="#c21400" r="5" cx="57" cy="221"/>
    <circle fill="#c21400" r="5" cx="140" cy="198"/>
  </g>
</svg>`

const leftBrainFeatures = [
  { icon: Cpu, label: 'AI & Machine Learning' },
  { icon: Database, label: 'Data-Driven Decisions' },
  { icon: Shield, label: 'Cybersecurity & Ethics' },
  { icon: Shield, label: 'Computational Thinking' },
]

const rightBrainFeatures = [
  { icon: Layers, label: 'Interdisciplinary Design' },
  { icon: Rocket, label: 'Entrepreneurship & Startups' },
  { icon: Globe, label: 'Global Perspective' },
  { icon: Users, label: 'Collaborative Problem Solving' },
]

export default function WholeBrainLearning() {
  const { ref, isInView } = useScrollAnimation(0.2)
  const [drawKey, setDrawKey] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      setDrawKey((k: number) => k + 1)
    }
  }, [isInView])

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary mb-4">
            The Whole Brain Approach
          </h2>
          <p className="text-textSecondary text-lg max-w-2xl mx-auto">
            Where analytical thinking meets creative innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_60px_rgba(239,68,68,0.15)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <Cpu className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-textPrimary">Left Brain</h3>
                <p className="text-sm text-accent">Logic & Technology</p>
              </div>
            </div>
            <ul className="space-y-4">
              {leftBrainFeatures.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="text-accent" size={16} />
                  </div>
                  <span className="text-textSecondary text-sm">{f.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="hidden md:flex flex-col items-center justify-center">
            <div className="relative h-full flex flex-col items-center">
              <div className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
              <div className="relative bg-background px-2 py-4 z-10">
                <div
                  key={drawKey}
                  dangerouslySetInnerHTML={{ __html: JGU_LOGO_STATIC }}
                  className="w-[400px] h-[180px]"
                />
              </div>
            </div>
          </div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_60px_rgba(249,115,22,0.15)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-highlight/20 to-highlight/5 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-textPrimary">Right Brain</h3>
                <p className="text-sm text-highlight">Creativity & Innovation</p>
              </div>
            </div>
            <ul className="space-y-4">
              {rightBrainFeatures.map((f) => (
                <li key={f.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-highlight/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="text-highlight" size={16} />
                  </div>
                  <span className="text-textSecondary text-sm">{f.label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}