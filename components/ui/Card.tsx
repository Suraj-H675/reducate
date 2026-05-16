import { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'glass' | 'standard'
  children?: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'glass', className = '', children, ...props }, ref) => {
    const base = 'rounded-2xl transition-all duration-300'

    const variants = {
      glass: 'bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl',
      standard: 'bg-surface border border-white/[0.06]',
    }

    return (
      <motion.div
        ref={ref}
        whileHover={{ y: -4 }}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = 'Card'
export default Card