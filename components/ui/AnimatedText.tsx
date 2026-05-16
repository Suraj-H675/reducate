import { motion, type Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
  variants?: Variants
  className?: string
  delay?: number
}

export function AnimatedText({
  children,
  variants,
  className = '',
  delay = 0,
}: AnimatedTextProps) {
  const defaultVariants: Variants = variants ?? {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay },
    },
  }

  return (
    <motion.span
      variants={defaultVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.span>
  )
}

interface StaggeredTextProps {
  text: string
  className?: string
  wordDelay?: number
}

export function StaggeredText({ text, className = '', wordDelay = 0.1 }: StaggeredTextProps) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.25em]">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
              delay: i * wordDelay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}