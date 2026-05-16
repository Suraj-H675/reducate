import { ButtonHTMLAttributes, forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50'

    const variants = {
      primary: 'bg-gradient-to-r from-accent to-highlight text-white hover:from-highlight hover:to-accent shadow-lg shadow-accent/25',
      secondary: 'bg-white/[0.04] text-textPrimary border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15]',
      ghost: 'bg-transparent text-textPrimary hover:bg-white/[0.04]',
      outline: 'bg-transparent border border-white/20 text-textPrimary hover:border-white/40 hover:bg-white/[0.04]',
    }

    const sizes = {
      sm: 'text-sm px-4 py-2',
      md: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = 'Button'
export default Button