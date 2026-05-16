# JG University — Landing Page

A modern, high-performance landing page for JG University, built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | App Router, React Server Components |
| Tailwind CSS v3 | Styling — custom red accent theme |
| Framer Motion | Scroll-triggered animations |
| Lucide React | Icons |
| OGL (WebGL) | Aurora background effect |
| Plus Jakarta Sans | Typography (next/font) |

## Project Structure

```
/
├── app/
│   ├── layout.tsx      # Root layout + metadata
│   ├── page.tsx        # Home — all sections assembled
│   └── globals.css     # Global styles + Tailwind
├── components/
│   ├── sections/      # Page sections (Navbar, Hero, Programs, etc.)
│   └── ui/            # Reusable primitives (Aurora, BorderGlow, etc.)
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useCountUp.ts
├── lib/
│   ├── animations.ts   # Framer Motion variants
│   └── data.ts        # All content (programs, testimonials, stats)
├── public/
│   └── *.svg          # Logo assets
├── tailwind.config.js
└── next.config.js
```

## Sections

1. **Navbar** — Transparent → blur on scroll
2. **Hero** — Aurora WebGL + DotField overlay, animated stats
3. **Whole Brain Learning** — Left/right brain split layout
4. **Programs** — 4-tab system with glassmorphism cards
5. **Why JGU** — 4-card grid with hover effects
6. **Testimonials** — Student quotes with glassmorphism cards
7. **CTA Banner** — Admissions open 2026–27
8. **Footer** — 4-column layout

## Getting Started

```bash
npm install
npm run dev      # Development
npm run build     # Production build
npm run lint      # Lint check
```

## Design System

- **Background:** `#0F172A` (slate-900)
- **Accent:** `#EF4444` (red-500)
- **Highlight:** `#F97316` (orange-500)
- **Surface:** `#1C0A0A` (red-tinted dark)
- **Font:** Plus Jakarta Sans

## Environment

Node.js 18+ required.

## License

Private — JG University.