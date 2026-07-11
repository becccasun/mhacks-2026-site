# Engineering Handoff — MHacks 2026 Site

The site is a fully static Next.js 14 (App Router) frontend. There are no API
routes, no server components with data fetching, and no runtime server
dependency — everything dynamic is driven by typed constants in `lib/` that
are designed to be swapped for real data sources without touching any
component or style. Wiring the backend cannot visually change the site.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # static export to out/
```

Gotcha: don't run `npm run build` while `next dev` is running — both write to
`.next/` and the build corrupts the dev server's cache (symptom: page loads
but never hydrates). Stop dev, build, then `rm -rf .next && npm run dev`.

## Deployment

The demo deploys to GitHub Pages automatically on every push to `main`
(`.github/workflows/deploy.yml`). It builds with
`NEXT_PUBLIC_BASE_PATH=/mhacks-2026-site`; that env var flows through
`next.config.mjs` (`basePath`) **and** `lib/asset.ts` (raw `<img>`/CSS URLs),
so the two never drift. For production at a domain root, simply build without
the variable — no code changes.

Two options for the live deployment:

**Option A — Vercel (recommended, least work).** Connect the repo and it
deploys as-is. Optionally gate the static-export settings so Vercel gets real
image optimization and the ability to add API routes later
(`next.config.mjs:9-12`):

```js
const isStaticExport = !!process.env.NEXT_PUBLIC_BASE_PATH;
// ...
output: isStaticExport ? "export" : undefined,
images: { unoptimized: isStaticExport, ... },
```

**Option B — any static host.** `npm run build` produces `out/`; serve it
from S3/CloudFront, Netlify, or GitHub Pages with a custom domain. Backend
features then live on a separate API that the client components call.

## Backend integration checklist

Each item is a "same shape, swap the source" change. The files carry
`ENGINEERING HANDOFF NOTES` comments with specifics.

| # | What | Where | Change |
|---|------|-------|--------|
| 1 | Application portal link | grep `"#apply"` — `components/SiteHeader.tsx` (header pill), `app/sections/Hero.tsx` (mobile hero CTA), plus the retired `app/sections/Timeline.tsx` | Replace placeholder `href="#apply"` with the real portal URL in all spots |
| 2 | Deadlines / countdown / schedule | `lib/deadlines.ts` | Replace the `DEADLINES` constant with fetched data of the same shape; the hero countdown pill **and** the Timeline schedule section (`app/sections/Schedule.tsx`) read only this array. Dates are ISO 8601 with explicit Eastern offsets |
| 3 | Instagram feed | `lib/socials.ts` | The social-gallery section was replaced by the Timeline schedule and no longer exists in `app/page.tsx`; this data module (and `/public/social`) remains if it's rebuilt. If used: replace `SOCIAL_POSTS` with Instagram Graph API data (same shape), keep images self-hosted — IG CDN URLs expire |
| 4 | Email signup | `components/EmailSignup.tsx:20` | `TODO(backend)`: POST the address to the mailing-list provider; surface errors in the existing submitted state. Note: the newsletter section (`app/sections/StayInTheLoop.tsx`) is built but not currently mounted in `app/page.tsx` |
| 5 | Contact / sponsor email | `app/sections/Sponsors.tsx`, `app/sections/Footer.tsx`, `app/sections/Faq.tsx` | Already real `mailto:` links (`sponsor@` / `hello@mhacks.org`); nothing to do unless a form is wanted |

## Content edits (no backend)

- Section copy lives inline in `app/sections/*.tsx` (FAQ answers in `Faq.tsx`,
  About paragraph in `About.tsx`, etc.).
- The design system is consolidated: one `Button` (`variant="cta"` is the
  canonical CTA treatment), one `SpeciesLabel`, tokens in
  `tailwind.config.ts` + `app/globals.css`.
- Public assets go through `asset("/path")` from `lib/asset.ts` — never a raw
  `"/path"` string — or they 404 under a base path.

## Retired code kept for reference

- `app/sections/Timeline.tsx` — the season-timeline sheet (with a
  time-accurate "progress vine"); removed from the page but functional.
- `app/sections/StayInTheLoop.tsx` — newsletter section wrapping
  `EmailSignup`; never mounted.

Re-add either by importing it in `app/page.tsx` (mind the sheet z-index
ordering — each section's `z-[N]` must ascend in page order for the
stacked-sheets scroll effect).

## Verification tooling

`scripts/` contains puppeteer helpers used for visual QA (they expect Chrome
at the default macOS path and the dev server on :3000):

- `shot.mjs "#section" out.png [scrollOffset]` — single-section screenshot
- `shot-one-mobile.mjs out.png [scrollOffset]` — single mobile screenshot
- `shot-mobile.mjs outDir` — full-page scroll-through at iPhone size
- `shot-widths.mjs outDir` — renders 9 widths and audits element overlaps +
  text overflow programmatically (the responsive regression net)
- `shot-hero-variants.mjs outDir` — clicks the hero's leaf/flower/cloud
  backdrop switcher and captures each
- `capture.mjs` / `shot-batch.mjs` / `shot-footer.mjs` / `shot-cursor.mjs` /
  `shot-mobile-spots.mjs` — assorted section sweeps used during development
