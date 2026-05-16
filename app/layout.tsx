import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'JG University — Build What Comes Next',
  description: 'Future-ready tech university in Ahmedabad. 50+ programs in AI, ML, Quantum Computing, Business, and Law.',
  keywords: 'JG University, AI ML courses, tech university Gujarat, BBA MBA admissions, Ahmedabad university',
  openGraph: {
    title: 'JG University — Build What Comes Next',
    description: '50+ modern programs. Industry-led faculty. Experiential learning.',
    url: 'https://jguni.in',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${font.variable} font-sans bg-background antialiased`}>
        {children}
      </body>
    </html>
  )
}