'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-xl bg-background/80 border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1">
          <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent font-bold text-xl">JG</span>
          <span className="text-textPrimary font-semibold text-xl">University</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-textSecondary hover:text-textPrimary transition-colors text-sm font-medium"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="#admissions"
            className="bg-gradient-to-r from-accent to-highlight text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-accent/30 transition-all"
          >
            Apply Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-textPrimary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <ul className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="block text-textSecondary hover:text-textPrimary transition-colors py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#admissions"
                  className="block bg-gradient-to-r from-accent to-highlight text-white px-6 py-3 rounded-full text-center font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  Apply Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}