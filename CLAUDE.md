# CLAUDE.md — JG University Landing Page Redesign
# Single source of truth. Read this entire file before writing any code.

---

## PROJECT GOAL

Redesign and develop a modern, visually stunning landing page inspired by JG University (https://jguni.in/).
The page must feel like a premium edtech/startup website — aspirational, student-centric, future-focused.
This is a frontend UI/UX challenge. Quality over quantity. 6 beautiful sections beat 14 average ones.

---

## CLAUDE CODE OPERATING RULES

1. Read this entire file before writing a single line of code
2. Follow the phase plan in strict order — never skip phases
3. After completing each phase, run the verification checklist before moving on
4. Never make design decisions not specified here — ask first
5. All content data lives in `lib/data.ts` — never hardcode strings in JSX
6. Never use inline styles — Tailwind classes only
7. Never use `any` in TypeScript
8. Use subagents for parallelizable work (see Subagent Strategy below)
9. After each major file creation, run `tsc --noEmit` to catch errors early
10. Commit after each phase: `git add . && git commit -m "phase X complete"`

---

## TECH STACK

| Tool | Requirement |
|------|-------------|
| Next.js | Latest stable — App Router ONLY. No Pages Router. |
| Tailwind CSS | v3 stable. Full tailwind.config.js required. |
| Framer Motion | Animations only — surgical use, not everywhere |
| Lucide React | All icons — no other icon library |
| next/font | Font loading — Plus Jakarta Sans |
| TypeScript | .tsx throughout. Strict mode. No `any`. |
| ogl | WebGL library for Aurora component — `npm install ogl` |

No shadcn. No MUI. No other UI libraries. Build everything from scratch.

---

## SUBAGENT STRATEGY

Use Claude Code subagents for parallel work. Define them in `.claude/agents/`.

### `.claude/agents/design-system.md`
```
---
name: design-system
description: Handles all design token files — tailwind.config.js, globals.css, animations.ts. Invoke when setting up or modifying the design system.
tools: Read, Write, Edit, Bash
model: sonnet
---
You are the design system agent. Your only job is to build and maintain:
- tailwind.config.js with the full custom theme
- app/globals.css with resets and utility classes
- lib/animations.ts with all Framer Motion variants

Always use the exact colors and tokens specified in CLAUDE.md. Never invent new tokens.
```

### `.claude/agents/component-builder.md`
```
---
name: component-builder
description: Builds reusable UI primitives in /components/ui/. Invoke for Button, Card, Badge, SectionWrapper, GradientText, AnimatedText.
tools: Read, Write, Edit, Bash
model: sonnet
---
You are the component builder agent. Build only what is specified in CLAUDE.md.
All components must be fully typed with TypeScript interfaces.
Use Tailwind classes only — no inline styles.
Export components as default exports.
```

### `.claude/agents/section-builder.md`
```
---
name: section-builder
description: Builds individual page sections in /components/sections/. One section at a time, fully spec'd in CLAUDE.md.
tools: Read, Write, Edit, Bash
model: sonnet
---
You are the section builder agent. Build sections exactly as specified in CLAUDE.md.
Import animations from lib/animations.ts — never write inline animation objects.
Import content from lib/data.ts — never hardcode strings in JSX.
Use useScrollAnimation hook for all scroll-triggered animations.
```

### `.claude/agents/qa-agent.md`
```
---
name: qa-agent
description: Runs TypeScript checks, build verification, and responsiveness audit. Invoke after each phase.
tools: Read, Bash, Glob
model: haiku
---
You are the QA agent. After each phase:
1. Run `tsc --noEmit` and report all errors
2. Run `npm run build` and report result
3. Check that all files specified for that phase exist
4. Report a pass/fail summary
Never modify code — only report issues.
```

---

## CUSTOM SLASH COMMANDS

Create these files in `.claude/commands/`:

### `.claude/commands/phase.md`
```
Run phase $ARGUMENTS from CLAUDE.md. Read the phase specification carefully,
then build everything in that phase. After completion, run the qa-agent to verify.
```

### `.claude/commands/check.md`
```
Run `tsc --noEmit` and `npm run build`. Report all errors clearly.
Then check that all files for the current phase exist. Give a pass/fail summary.
```

### `.claude/commands/section.md`
```
Build the $ARGUMENTS section from CLAUDE.md exactly as specified.
Import animations from lib/animations.ts.
Import data from lib/data.ts.
Use the useScrollAnimation hook.
After building, run tsc --noEmit.
```

---

## RECOMMENDED MCP SERVERS

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
      "description": "Direct file access for reading/writing project files"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "your_token_here" },
      "description": "GitHub integration for commits and PRs"
    }
  }
}
```

---

## HOOKS SETUP

Add to `.claude/settings.json` under `hooks`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx tsc --noEmit 2>&1 | head -20"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Phase complete. Run /check to verify build.'"
          }
        ]
      }
    ]
  }
}
```

---

## FOLDER STRUCTURE — MANDATORY

```
/
├── .claude/
│   ├── agents/
│   │   ├── design-system.md
│   │   ├── component-builder.md
│   │   ├── section-builder.md
│   │   └── qa-agent.md
│   ├── commands/
│   │   ├── phase.md
│   │   ├── check.md
│   │   └── section.md
│   └── settings.json
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Aurora.tsx          ← WebGL aurora background
│   │   ├── Aurora.css
│   │   ├── DotField.tsx        ← Interactive dot overlay
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── SectionWrapper.tsx
│   │   ├── AnimatedText.tsx
│   │   └── GradientText.tsx
│   └── sections/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── WholeBrainLearning.tsx
│       ├── Programs.tsx
│       ├── WhyJGU.tsx
│       ├── Testimonials.tsx
│       ├── CTABanner.tsx
│       └── Footer.tsx
├── hooks/
│   ├── useScrollAnimation.ts
│   └── useCountUp.ts
├── lib/
│   ├── animations.ts
│   └── data.ts
├── public/
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

---

## DESIGN SYSTEM

### Color Palette — RED ACCENT THEME

```js
// tailwind.config.js — extend.colors
colors: {
  background:    '#0F172A',   // slate-900 — main dark bg
  surface:       '#1C0A0A',   // deep red-tinted dark — card backgrounds
  accent:        '#EF4444',   // red-500 — primary accent
  accentLight:   '#F87171',   // red-400 — hover states
  highlight:     '#F97316',   // orange-500 — gradient end, glow
  deep:          '#7C0000',   // deep crimson — aurora mid-stop
  textPrimary:   '#F8FAFC',   // slate-50 — headings
  textSecondary: '#94A3B8',   // slate-400 — body text
  border:        'rgba(255, 255, 255, 0.08)',
}
```

### Typography

```
H1:    text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]
H2:    text-3xl md:text-5xl font-bold tracking-tight
H3:    text-xl font-semibold
Body:  text-base text-textSecondary leading-relaxed
Label: text-xs font-semibold uppercase tracking-widest text-textSecondary
```

Font: Plus Jakarta Sans via next/font/google

### Primary Gradient (RED)

`from-[#EF4444] via-[#991B1B] to-[#F97316]`

Use for: gradient text, CTA buttons, divider accents, icon backgrounds

### Glassmorphism Card

```
bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl rounded-2xl
```

### Tailwind Config — Full Setup

```js
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background:    '#0F172A',
        surface:       '#1C0A0A',
        accent:        '#EF4444',
        accentLight:   '#F87171',
        highlight:     '#F97316',
        deep:          '#7C0000',
        textPrimary:   '#F8FAFC',
        textSecondary: '#94A3B8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-red':  'pulseRed 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseRed: {
          '0%, 100%': { opacity: '0.15' },
          '50%':      { opacity: '0.30' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## THIRD-PARTY COMPONENTS

### Aurora Component — WebGL Background

**Install dependency first:** `npm install ogl`

Create `components/ui/Aurora.tsx` with this EXACT source:

```tsx
'use client'
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'
import './Aurora.css'

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAG = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop { vec3 color; float position; };
#define COLOR_RAMP(colors, factor, finalColor) { \
  int index = 0; \
  for (int i = 0; i < 2; i++) { \
    ColorStop currentColor = colors[i]; \
    bool isInBetween = currentColor.position <= factor; \
    index = int(mix(float(index), float(i), float(isInBetween))); \
  } \
  ColorStop currentColor = colors[index]; \
  ColorStop nextColor = colors[index + 1]; \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  vec3 auroraColor = intensity * rampColor;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`

interface AuroraProps {
  colorStops?: [string, string, string]
  speed?: number
  blend?: number
  amplitude?: number
}

export default function Aurora({
  colorStops = ['#EF4444', '#7C0000', '#F97316'],
  speed = 0.4,
  blend = 0.6,
  amplitude = 1.2,
}: AuroraProps) {
  const propsRef = useRef({ colorStops, speed, blend, amplitude })
  propsRef.current = { colorStops, speed, blend, amplitude }
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctn = ctnDom.current
    if (!ctn) return
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.canvas.style.backgroundColor = 'transparent'
    let program: Program

    const resize = () => {
      if (!ctn) return
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight)
      if (program) program.uniforms.uResolution.value = [ctn.offsetWidth, ctn.offsetHeight]
    }
    window.addEventListener('resize', resize)

    const geometry = new Triangle(gl)
    if (geometry.attributes.uv) delete geometry.attributes.uv

    const toColorArray = (hex: string) => {
      const c = new Color(hex)
      return [c.r, c.g, c.b]
    }

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime:       { value: 0 },
        uAmplitude:  { value: amplitude },
        uColorStops: { value: colorStops.map(toColorArray) },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend:      { value: blend },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    ctn.appendChild(gl.canvas)

    let animId = 0
    const update = (t: number) => {
      animId = requestAnimationFrame(update)
      const p = propsRef.current
      program.uniforms.uTime.value       = (t * 0.01) * (p.speed ?? 1.0) * 0.1
      program.uniforms.uAmplitude.value  = p.amplitude ?? 1.0
      program.uniforms.uBlend.value      = p.blend ?? blend
      program.uniforms.uColorStops.value = (p.colorStops ?? colorStops).map(toColorArray)
      renderer.render({ scene: mesh })
    }
    animId = requestAnimationFrame(update)
    resize()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      if (ctn && gl.canvas.parentNode === ctn) ctn.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [amplitude])

  return <div ref={ctnDom} className="aurora-container" />
}
```

Create `components/ui/Aurora.css`:
```css
.aurora-container {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  z-index: 0;
}
```

### DotField Component — Interactive Dot Overlay

**Source:** Get from https://reactbits.dev — search "DotField".
Copy source into `components/ui/DotField.tsx`.

**Configure tsconfig.json path alias:**
```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["./components/*"]
    }
  }
}
```

**Usage in Hero (on top of Aurora):**
```tsx
import { DotField } from '@components/ui/DotField'

<DotField
  dotRadius={1.5}
  dotSpacing={14}
  cursorRadius={500}
  cursorForce={0.10}
  bulgeOnly={true}
  bulgeStrength={67}
  glowRadius={160}
  sparkle={false}
  waveAmplitude={0}
/>
```

**DotField must sit above Aurora:**
```tsx
// Layer order in Hero:
// z-0  → Aurora (WebGL background)
// z-10 → DotField (interactive dot overlay)
// z-20 → Hero content (text, CTAs, stats)
```

---

## ANIMATION SYSTEM

### `lib/animations.ts` — All variants exported from here. Never inline.

```ts
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12 } },
}
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}
```

### `hooks/useScrollAnimation.ts`

```ts
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}
```

### `hooks/useCountUp.ts`

```ts
import { useState, useEffect } from 'react'

export function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [target, duration])
  return count
}
```

---

## SECTION SPECIFICATIONS

### Section 1 — Navbar (`Navbar.tsx`)

- Default: fully transparent
- After 60px scroll: `backdrop-blur-xl bg-background/80 border-b border-white/[0.06]`
- Transition: `transition-all duration-300` via `useEffect` + `useState`
- Left: `"JG"` in red gradient + `"University"` in white
- Center: Home, Programs, About, Campus, Admissions (hidden on mobile)
- Right: `"Apply Now"` — red gradient button, `rounded-full`
- Mobile: Lucide `Menu` → `X`, `AnimatePresence` slide-down menu
- Directive: `'use client'`

---

### Section 2 — Hero (`Hero.tsx`) ⭐ MOST IMPORTANT

**Background layer stack:**
```
position: relative, overflow: hidden, min-h-screen

Layer 0 (z-0):  bg-background (base dark color)
Layer 1 (z-0):  <Aurora /> — WebGL red aurora, absolute inset-0
Layer 2 (z-10): <DotField /> — interactive dots, absolute inset-0, pointer-events-auto
Layer 3 (z-20): Hero content — relative z-20
```

**Hero content (left-aligned desktop, centered mobile):**

```
[Pill badge — z-20]
  "🎓 Admissions Open 2026–27"
  border border-accent/30 bg-accent/10 rounded-full px-4 py-1.5

[H1 — stagger animation per word]
  Line 1: "Build What"
  Line 2: "Comes Next."  ← red gradient text

[Body paragraph]
  "JG University prepares future tech leaders through AI, Quantum Computing,
   and hands-on experiential learning. Your career starts here."

[CTA Row]
  Button 1: "Explore Programs" — bg-gradient-to-r from-accent to-highlight
  Button 2: "Watch Our Story" — ghost + PlayCircle icon + border-white/20

[Stats Row — grid-cols-2 md:grid-cols-4]
  17+ Colleges | 10,000+ Students | 50+ Programs | Est. 1965
  Numbers animate via useCountUp on mount
  Number text: red gradient
```

**Floating cards (right side, desktop only, z-20):**
- 3 glassmorphism cards, offset with absolute positioning
- Card 1: B.Tech AI & ML — BrainCircuit icon — `animate-float`
- Card 2: Quantum Computing — Atom icon — `animate-float-slow`
- Card 3: Certificate: Blockchain — Link icon — `animate-float delay-300`

**Animation sequence:**
1. Badge → fadeUp, delay 0
2. H1 words → staggerContainer + staggerItem, delay 0.1
3. Body → fadeUp, delay 0.4
4. CTA row → fadeUp, delay 0.6
5. Stats → staggerContainer, delay 0.8

---

### Section 3 — Whole Brain Learning (`WholeBrainLearning.tsx`) ⭐ DESIGN SIGNATURE

**Concept:** JGU's unique pedagogy — left brain (logic/tech) vs right brain (creativity/innovation)

```
[Centered heading] "The Whole Brain Approach"
[Centered subheading] "Where analytical thinking meets creative innovation"

[3-column grid]
Left Card | Center Divider | Right Card
```

**Left card** — subtle red glow `shadow-[0_0_60px_rgba(239,68,68,0.15)]`:
- Heading: "Left Brain — Logic & Technology" + Cpu icon
- Code2 → Computational Thinking
- Cpu → AI & Machine Learning
- Database → Data-Driven Decisions
- Shield → Cybersecurity & Ethics

**Center divider:** Vertical line `bg-gradient-to-b from-transparent via-accent to-transparent` + Brain icon

**Right card** — subtle orange glow `shadow-[0_0_60px_rgba(249,115,22,0.15)]`:
- Heading: "Right Brain — Creativity & Innovation" + Lightbulb icon
- Layers → Interdisciplinary Design
- Rocket → Entrepreneurship & Startups
- Globe → Global Perspective
- Users → Collaborative Problem Solving

- Animation: `slideInLeft` left column, `slideInRight` right column

---

### Section 4 — Programs (`Programs.tsx`)

**4 Tabs:** Tech & Engineering | Business & Commerce | Science & Law | Certificate Courses

- Active tab: `bg-gradient-to-r from-accent to-highlight text-white rounded-full`
- Inactive: `bg-white/[0.04] text-textSecondary hover:text-textPrimary rounded-full`
- `AnimatePresence` + `motion.div key={activeTab}` for tab transition

**Card grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**Each card:**
```
[glassmorphism card]
[Icon in red gradient circle]
[Program Name — H3]
[Duration badge]
[1-line description]
[→ Learn More — accent text + ArrowRight]
hover: border-accent/40 + shadow-[0_0_30px_rgba(239,68,68,0.1)]
```

**Tab data (define in lib/data.ts):**

Tech & Engineering: B.Tech AI/ML (BrainCircuit), B.Tech Quantum Computing (Atom),
B.Tech CSE with AI (Code2), MCA AI & Full Stack (Globe),
M.Sc. Cyber Security (Shield), B.Sc. Forensic Science (Search)

Business & Commerce: MBA (Briefcase), BBA Hons (BarChart), iMBA 5yr (TrendingUp),
B.Com ACCA (FileText), Masters International Trade (Globe), Masters Aviation (Plane)

Science & Law: B.Sc. Clinical Embryology (FlaskConical), B.Sc. Mathematics (Calculator),
B.Sc. Food & Nutrition (Leaf), LL.B. (Scale), LL.M. (BookOpen), Ph.D. (GraduationCap)

Certificate Courses — pill badges instead of cards:
Metaverse | Blockchain | Data Science & AI | Mobile Apps | Digital Marketing |
Cyber Security | RPA | Full Stack Architect | Azure DevOps | Industrial IoT
Style: `border border-accent/40 bg-accent/10 text-textPrimary rounded-full px-4 py-2`

---

### Section 5 — Why JGU (`WhyJGU.tsx`)

```
[Heading] "Why Students Choose JGU"
[Subheading] "Built for the next generation of tech leaders"
[grid grid-cols-1 md:grid-cols-2 gap-6]
```

4 glassmorphism cards with `group hover:border-accent/40`:

| Icon | Title | Description |
|------|-------|-------------|
| GraduationCap | NEP 2020 Compliant | Future-ready curriculum aligned with national education policy |
| Briefcase | Industry-Led Faculty | Learn from practitioners actively working in AI and emerging tech |
| FlaskConical | Experiential Learning | Real labs, live projects, startup incubation |
| Award | 60 Years of Trust | UGC-approved institution backed by ASIA Charitable Trust since 1965 |

Icon bg: `bg-gradient-to-br from-accent/20 to-highlight/20 rounded-xl w-12 h-12`
Hover: `group-hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] transition-all duration-300`

---

### Section 6 — Testimonials (`Testimonials.tsx`)

```
[Heading] "Students Who Built Their Future Here"
[grid grid-cols-1 md:grid-cols-3 gap-6]
```

3 glassmorphism cards, `whileHover={{ y: -6 }}`:
```
[Large " — gradient text, text-6xl opacity-40]
[Quote — italic, text-lg]
[Divider border-t border-white/10]
[Avatar circle (red gradient initial) + Name + Program]
[5 × Star — text-yellow-400]
```

Data (lib/data.ts):
1. "JGU's AI & ML program gave me hands-on experience no textbook could." — Riya Shah, B.Tech AI/ML, 2024
2. "Industry mentors who actually work in the field changed how I think." — Arjun Mehta, MBA, 2023
3. "The Blockchain certificate got me a Web3 role within a month." — Priya Nair, Certificate, 2024

---

### Section 7 — CTA Banner (`CTABanner.tsx`)

Background: `bg-gradient-to-r from-accent/20 via-deep/30 to-highlight/20` on `bg-surface`
Add red glow border: inner div with gradient border technique

```
[Label] "ADMISSIONS OPEN 2026–27" — uppercase tracking-widest
[H2] "Your Future in Tech Starts at JGU." ← "Starts at JGU" in red gradient
[Body] "Limited seats across AI, Engineering, Business and emerging tech."
[Buttons]
  "Apply Now" — solid white bg, dark text
  "Download Brochure" — ghost white border + FileDown icon
```

Animation: `scaleIn` on scroll

---

### Section 8 — Footer (`Footer.tsx`)

`bg-surface border-t border-white/[0.06]` — `grid grid-cols-1 md:grid-cols-4 gap-12`

- Col 1: JGU logo + tagline + social icons (Twitter, Linkedin, Instagram, Youtube)
- Col 2: Programs links
- Col 3: University links (About, Admissions, Campus, Faculty, Research, NEP 2020)
- Col 4: Contact (MapPin, Mail, Phone)

Bottom bar: `border-t border-white/[0.06] mt-12 pt-6 flex justify-between`
- "© 2026 JG University. All rights reserved."
- "Designed for the next generation ✦"

No Framer Motion in footer.

---

## `lib/data.ts` — Required Structure

```ts
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

export const programs: Program[] = [ /* full data per spec above */ ]
export const testimonials: Testimonial[] = [ /* 3 items per spec above */ ]
export const whyCards: WhyCard[] = [ /* 4 items per spec above */ ]
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
```

---

## `app/page.tsx` — Section Assembly Order

```tsx
import Navbar             from '@/components/sections/Navbar'
import Hero               from '@/components/sections/Hero'
import WholeBrainLearning from '@/components/sections/WholeBrainLearning'
import Programs           from '@/components/sections/Programs'
import WhyJGU             from '@/components/sections/WhyJGU'
import Testimonials       from '@/components/sections/Testimonials'
import CTABanner          from '@/components/sections/CTABanner'
import Footer             from '@/components/sections/Footer'

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
```

---

## `app/layout.tsx` — SEO + Font

```tsx
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
```

---

## CODING STANDARDS — NON-NEGOTIABLE

- TypeScript strict mode — no `any`, all props typed with interfaces
- `'use client'` only on components that actually need it
- `next/image` for ALL images with `width`, `height`, `alt`
- Mobile-first Tailwind — base = mobile, then `md:` and `lg:`
- Test at: 375px / 768px / 1280px / 1440px — zero horizontal scroll
- Touch targets minimum 44×44px
- All buttons/links have `aria-label` or visible text
- Semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`
- Each section has `id` for anchor nav
- Never hardcode content in JSX — use `lib/data.ts`
- Never write inline animation objects — import from `lib/animations.ts`

---

## PHASE PLAN — FOLLOW STRICTLY

### Phase 1 — Foundation
- [ ] `npm install ogl framer-motion lucide-react`
- [ ] Get DotField source from reactbits.dev → `components/ui/DotField.tsx`
- [ ] `tailwind.config.js` — full red theme
- [ ] `app/globals.css` — resets, scrollbar, base styles
- [ ] `lib/animations.ts` — all variants
- [ ] `hooks/useScrollAnimation.ts`
- [ ] `hooks/useCountUp.ts`
- [ ] `lib/data.ts` — all content typed and populated
- [ ] `app/layout.tsx` — font + metadata
- [ ] `next.config.js`
- [ ] `tsconfig.json` — strict mode + @components path alias
- [ ] `.claude/` folder with agents, commands, settings
- [ ] **Verify:** `tsc --noEmit` passes, `npm run dev` starts

### Phase 2 — Third-Party Components
- [ ] `components/ui/Aurora.tsx` — full source from this file
- [ ] `components/ui/Aurora.css`
- [ ] `components/ui/DotField.tsx` — from reactbits.dev
- [ ] Verify Aurora renders with red colorStops on a test page
- [ ] Verify DotField cursor interaction works
- [ ] **Verify:** no console errors, WebGL context confirmed

### Phase 3 — UI Primitives
- [ ] `Button.tsx` — primary (red gradient), secondary, ghost, outline variants
- [ ] `Card.tsx` — glassmorphism + standard
- [ ] `Badge.tsx` — pill style
- [ ] `SectionWrapper.tsx` — consistent padding + max-w-7xl container
- [ ] `GradientText.tsx` — red gradient text
- [ ] `AnimatedText.tsx` — Framer Motion stagger wrapper
- [ ] **Verify:** `tsc --noEmit` passes

### Phase 4 — Sections (Static First, No Animations)
Build layout and content for all 8 sections. Correct structure, correct data. No Framer Motion yet.
- [ ] Navbar.tsx
- [ ] Hero.tsx ← Aurora + DotField layers MUST be correct here
- [ ] WholeBrainLearning.tsx
- [ ] Programs.tsx (tabs working with useState)
- [ ] WhyJGU.tsx
- [ ] Testimonials.tsx
- [ ] CTABanner.tsx
- [ ] Footer.tsx
- [ ] `app/page.tsx` — all sections assembled
- [ ] **Verify:** `npm run dev` — all 8 sections visible, no errors

### Phase 5 — Animations
Add Framer Motion ONLY to these specific elements:
- [ ] Hero: word stagger H1, fadeUp body/CTA/stats, continuous float cards
- [ ] Navbar: blur on scroll
- [ ] WholeBrainLearning: slideInLeft + slideInRight
- [ ] Programs: stagger on cards per tab change
- [ ] WhyJGU: stagger cards
- [ ] Testimonials: stagger + whileHover lift
- [ ] CTABanner: scaleIn
- [ ] Stats: useCountUp on mount
- [ ] **Verify:** all animations fire on scroll, no jank on mobile

### Phase 6 — QA + Deploy
- [ ] Mobile check: 375px, 768px, 1280px, 1440px — fix all issues
- [ ] `tsc --noEmit` — zero errors
- [ ] `npm run build` — must complete cleanly
- [ ] No console errors or warnings in browser
- [ ] Lighthouse Performance ≥ 85
- [ ] All aria-labels in place
- [ ] `git add . && git commit -m "JGU landing page complete"`
- [ ] `vercel deploy`

---

## KEY DESIGN DECISIONS — FINAL, DO NOT CHANGE

| Decision | Value |
|----------|-------|
| Primary font | Plus Jakarta Sans |
| Background | #0F172A |
| Surface | #1C0A0A (red-tinted dark) |
| Accent | #EF4444 (red-500) |
| Highlight | #F97316 (orange-500) |
| Deep | #7C0000 (dark crimson) |
| Card style | Glassmorphism — backdrop-blur + border-white/8 |
| Hero background | Aurora WebGL (red palette) + DotField overlay |
| Aurora colors | ["#EF4444", "#7C0000", "#F97316"] |
| Aurora settings | blend=0.6, amplitude=1.2, speed=0.4 |
| DotField z-index | z-10 (above Aurora z-0, below content z-20) |
| Animation library | Framer Motion only |
| Icon library | Lucide React only |
| Hero headline | "Build What Comes Next." |
| Design motif | Whole Brain Learning — split left/right visual |
| Certificate display | Pill badges, not cards |
| Framer Motion scope | Hero, WholeBrain, Programs, WhyJGU, Testimonials, CTA only |
| Section count | 8 — quality over quantity |
| Gradient direction | from-[#EF4444] via-[#991B1B] to-[#F97316] |

---

*End of CLAUDE.md*
*Read this file fully before starting. Every decision is made. Just build it.*
