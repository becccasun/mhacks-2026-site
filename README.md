# MHacks 2026 — Digital Garden

The marketing site for the University of Michigan's flagship hackathon, MHacks 2026. Built with Next.js 14 App Router and a rich interaction stack tuned for elevated, editorial motion.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS v3** with design tokens exposed as CSS variables
- **Framer Motion** for component-level motion + `whileInView` reveals
- **GSAP + ScrollTrigger** for scroll-driven pinning and parallax
- **Lenis** for smooth momentum scrolling
- **Radix Accordion** for accessible FAQ
- **next/font/google**: Red Hat Display (body), Red Hat Mono (technical), Instrument Serif (display italic), Instrument Sans (backup sans)

## Local development

```bash
cd site
npm install --ignore-scripts     # --ignore-scripts avoids an fsevents postinstall issue on this machine; safe for Next
npm run dev
```

Visit http://localhost:3000.

Optional scripts:

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Design system

Tokens live in two places:

- `app/globals.css` — CSS variables (`--moss-700`, `--cream`, `--parchment`, `--accent-yellow`, etc.) plus motion easing curves.
- `tailwind.config.ts` — semantic color aliases (`moss`, `cream`, `bloom`, `sun`, `leaf`), radii, shadows (`e-1`–`e-4`), and font families.
- `lib/tokens.ts` — TypeScript-typed color/radius/duration/motion presets for use inside Framer configs.

Refer to the sibling [`../design-system.html`](../design-system.html) for the canonical brand kit.

## Directory layout

```
app/
  layout.tsx            root layout, fonts, SmoothScroll + Cursor
  page.tsx              section composition
  globals.css           tokens + resets
  sections/             Hero, About, Sponsors, FAQ, Footer
components/             SmoothScroll, Cursor, AsciiCanvas, PillNav, ...
lib/                    tokens.ts, hooks (useMagnetic, useInView)
public/                 hero/ logos/ cursors/ textures/ ascii/
```

## Motion presets

`lib/tokens.ts` exposes reusable animation configs. Prefer these over inline objects so easing can be tuned in one place.

```tsx
import { motion as m } from "framer-motion";
import { motion as preset } from "@/lib/tokens";

<m.h2 {...preset.fadeUp}>Build something that grows.</m.h2>;
```

## Interaction principles (mercury.com / column.com influence)

- Custom cursor (Ann Arbor SVG) with magnetic attach on primary CTAs
- Lenis smooth scroll; disabled when `prefers-reduced-motion: reduce`
- Line/word reveals via `SplitReveal` (clip-path masks + y translate)
- Scramble text on eyebrows and stat numbers
- Hero pins for ~1.5x viewport while ASCII canvas parallaxes and cards drift
- Ambient ASCII canvas overlay (React port of the original `index.html` proof-of-concept)

## Handoff notes for engineering

- All sections are React components with typed props; a future backend can pass FAQ items, sponsor tier data, and stat numbers via server components.
- Fonts are loaded via `next/font/google`. To swap in local Red Hat Display OTF files, use `next/font/local` inside `app/layout.tsx`.
- Sponsor tier data is currently a placeholder array in `app/sections/Sponsors.tsx`. Replace with confirmed sponsor logos when available.
