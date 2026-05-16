import { MapPin, Mail, Phone, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'
import GradientText from '@/components/ui/GradientText'

const footerLinks = {
  programs: ['B.Tech AI & ML', 'BBA', 'MBA', 'Law', 'Science', 'Certificate Courses'],
  university: ['About', 'Admissions', 'Campus', 'Faculty', 'Research', 'NEP 2020'],
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Col 1: Logo + tagline */}
          <div>
            <a href="#" className="inline-flex items-center gap-1 mb-4">
              <span className="bg-gradient-to-r from-accent to-highlight bg-clip-text text-transparent font-bold text-xl">JG</span>
              <span className="text-textPrimary font-semibold text-xl">University</span>
            </a>
            <p className="text-textSecondary text-sm leading-relaxed mb-6">
              Future-ready tech education in the heart of Ahmedabad. Building leaders since 1965.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-textSecondary hover:text-accent hover:border-accent/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Programs */}
          <div>
            <h4 className="text-textPrimary font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link}>
                  <a href="#programs" className="text-textSecondary hover:text-textPrimary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: University */}
          <div>
            <h4 className="text-textPrimary font-semibold mb-4">University</h4>
            <ul className="space-y-2">
              {footerLinks.university.map((link) => (
                <li key={link}>
                  <a href="#about" className="text-textSecondary hover:text-textPrimary transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-textPrimary font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-textSecondary text-sm">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <span>JG University, SG Highway, Ahmedabad, Gujarat 380015</span>
              </li>
              <li className="flex items-center gap-2 text-textSecondary text-sm">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:admissions@jguni.in" className="hover:text-textPrimary transition-colors">admissions@jguni.in</a>
              </li>
              <li className="flex items-center gap-2 text-textSecondary text-sm">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+917926820100" className="hover:text-textPrimary transition-colors">+91 79 2682 0100</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-textSecondary text-sm">
            © 2026 JG University. All rights reserved.
          </p>
          <p className="text-textSecondary text-sm">
            Designed for the next generation ✦
          </p>
        </div>
      </div>
    </footer>
  )
}