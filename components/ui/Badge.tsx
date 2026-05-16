import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline'
}

export default function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  const base = 'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider'

  const variants = {
    default: 'bg-white/[0.04] text-textSecondary border border-white/[0.08]',
    accent: 'bg-accent/10 text-accent border border-accent/30',
    outline: 'bg-transparent text-textPrimary border border-white/20',
  }

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}