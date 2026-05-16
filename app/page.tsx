import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import WholeBrainLearning from '@/components/sections/WholeBrainLearning'
import Programs from '@/components/sections/Programs'
import WhyJGU from '@/components/sections/WhyJGU'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="bg-background text-textPrimary overflow-x-hidden">
      <Navbar />
      <Hero />
      <WholeBrainLearning />
      <Programs />
      <WhyJGU />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  )
}