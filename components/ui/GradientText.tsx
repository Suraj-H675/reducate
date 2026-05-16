import { HTMLAttributes } from 'react'

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'accent' | 'highlight'
}

export default function GradientText({
  variant = 'accent',
  className = '',
  children,
  ...props
}: GradientTextProps) {
  const variants = {
    accent: 'bg-gradient-to-r from-accent via-[#991B1B] to-highlight bg-clip-text text-transparent',
    highlight: 'bg-gradient-to-r from-highlight to-accent bg-clip-text text-transparent',
  }

  return (
    <span className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}