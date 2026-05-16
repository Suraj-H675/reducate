export interface Program {
  name: string
  duration: string
  description: string
  icon: string
  category: 'tech' | 'business' | 'science' | 'certificate'
}

export interface Testimonial {
  quote: string
  name: string
  program: string
  year: number
  initial: string
}

export interface WhyCard {
  icon: string
  title: string
  description: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
}

export const programs: Program[] = [
  // Tech & Engineering
  { name: 'B.Tech Programs', duration: '4 Years', description: 'Engineering excellence with AI and emerging tech', icon: 'BrainCircuit', category: 'tech' },
  { name: 'BCA | BCA (Hons)', duration: '3 Years', description: 'Computer Applications and Software Development', icon: 'Code2', category: 'tech' },
  { name: 'Integrated BCA + MCA', duration: '5 Years', description: 'Seamless BCA to MCA pathway', icon: 'Globe', category: 'tech' },
  { name: 'Integrated BSc + MSc (IT)', duration: '5 Years', description: 'Integrated IT Science program', icon: 'Atom', category: 'tech' },
  { name: 'B.Sc. / B.Sc. (Hons) / iMSc', duration: '3 Years', description: 'Bachelor or Integrated MSc in Science', icon: 'FlaskConical', category: 'tech' },
  { name: 'MCA - AI / Full Stack Development', duration: '2 Years', description: 'AI and Full Stack Development', icon: 'Code2', category: 'tech' },
  { name: 'MSc (IT-Specialization)', duration: '2 Years', description: 'Specialized IT Masters', icon: 'Globe', category: 'tech' },
  // Business & Commerce
  { name: 'BBA | BBA (Hons)', duration: '3 Years', description: 'Bachelor of Business Administration', icon: 'Briefcase', category: 'business' },
  { name: 'BBA / BBA (Hons) / iMBA', duration: '3-5 Years', description: 'BBA with optional Integrated MBA pathway', icon: 'TrendingUp', category: 'business' },
  { name: 'Integrated BBA + MBA', duration: '5 Years', description: 'Integrated BBA + MBA program', icon: 'TrendingUp', category: 'business' },
  { name: 'Integrated BBA + MBA - Global Business', duration: '5 Years', description: 'Global Business specialisation', icon: 'Globe', category: 'business' },
  { name: 'BBA | BBA (Hons) - International Trade & Finance', duration: '3 Years', description: 'International Trade and Finance specialisation', icon: 'Globe', category: 'business' },
  { name: 'Integrated BBA + MBA - Aviation, Hospitality, & Travel Management', duration: '5 Years', description: 'Aviation, Hospitality and Travel Management', icon: 'Plane', category: 'business' },
  { name: 'Integrated BBA + MBA - International Trade & Finance', duration: '5 Years', description: 'International Trade and Finance Integrated', icon: 'TrendingUp', category: 'business' },
  { name: 'B.Com | B.Com (Hons)', duration: '3 Years', description: 'Bachelor of Commerce', icon: 'FileText', category: 'business' },
  { name: 'B.Com (Hons) with ACCA', duration: '3 Years', description: 'ACCA accredited Commerce degree', icon: 'FileText', category: 'business' },
  { name: 'M.Com (Hons) - International Accounting & Taxation', duration: '2 Years', description: 'International Accounting and Taxation', icon: 'FileText', category: 'business' },
  { name: 'MBA', duration: '2 Years', description: 'Master of Business Administration', icon: 'Briefcase', category: 'business' },
  { name: 'Masters in International Trade & Finance', duration: '2 Years', description: 'International Trade and Finance Masters', icon: 'Globe', category: 'business' },
  { name: 'Masters in Aviation, Hospitality & Travel Management', duration: '2 Years', description: 'Aviation, Hospitality and Travel Management', icon: 'Plane', category: 'business' },
  // Science & Law
  { name: 'MSc', duration: '2 Years', description: 'Master of Science', icon: 'FlaskConical', category: 'science' },
  { name: 'LL.B.', duration: '3 Years', description: 'Bachelor of Law', icon: 'Scale', category: 'science' },
  { name: 'LL.M.', duration: '2 Years', description: 'Master of Law', icon: 'BookOpen', category: 'science' },
  { name: 'Forensic Science', duration: '3 Years', description: 'Forensic Science and Investigation', icon: 'Search', category: 'science' },
  // Doctoral
  { name: 'Ph.D. - Management', duration: '3-5 Years', description: 'Doctoral in Management', icon: 'GraduationCap', category: 'science' },
  { name: 'Ph.D. - Commerce', duration: '3-5 Years', description: 'Doctoral in Commerce', icon: 'GraduationCap', category: 'science' },
  { name: 'Ph.D. - Computing', duration: '3-5 Years', description: 'Doctoral in Computing', icon: 'GraduationCap', category: 'science' },
  { name: 'Ph.D. - Interdisciplinary', duration: '3-5 Years', description: 'Doctoral Interdisciplinary', icon: 'GraduationCap', category: 'science' },
  { name: 'Ph.D. - Law', duration: '3-5 Years', description: 'Doctoral in Law', icon: 'GraduationCap', category: 'science' },
]

export const testimonials: Testimonial[] = [
  { quote: "JGU's AI & ML program gave me hands-on experience no textbook could.", name: 'Riya Shah', program: 'B.Tech AI/ML', year: 2024, initial: 'R' },
  { quote: "Industry mentors who actually work in the field changed how I think.", name: 'Arjun Mehta', program: 'MBA', year: 2023, initial: 'A' },
  { quote: "The Blockchain certificate got me a Web3 role within a month.", name: 'Priya Nair', program: 'Certificate', year: 2024, initial: 'P' },
]

export const whyCards: WhyCard[] = [
  { icon: 'GraduationCap', title: 'NEP 2020 Compliant', description: 'Future-ready curriculum aligned with national education policy' },
  { icon: 'Briefcase', title: 'Industry-Led Faculty', description: 'Learn from practitioners actively working in AI and emerging tech' },
  { icon: 'FlaskConical', title: 'Experiential Learning', description: 'Real labs, live projects, startup incubation' },
  { icon: 'Award', title: '60 Years of Trust', description: 'UGC-approved institution backed by ASIA Charitable Trust since 1965' },
]

export const navLinks = ['Home', 'Programs', 'About', 'Campus', 'Admissions']

export const stats: Stat[] = [
  { value: 17, suffix: '+', label: 'Colleges' },
  { value: 10000, suffix: '+', label: 'Students' },
  { value: 50, suffix: '+', label: 'Programs' },
  { value: 1965, suffix: '', label: 'Est.' },
]

export const certificateBadges = [
  'Metaverse', 'Blockchain', 'Data Science & AI', 'Mobile Apps',
  'Digital Marketing', 'Cyber Security', 'RPA', 'Full Stack Architect',
  'Azure DevOps', 'Industrial IoT',
]