import { HTMLAttributes } from 'react'

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  id?: string
}

export default function SectionWrapper({
  id,
  className = '',
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}