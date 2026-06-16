import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Reveal from './Reveal'
import { Accent, Eyebrow } from './ui'
import { ABOUT_PARAGRAPHS } from '../content'
import ceremony from '../assets/photos/ceremony.jpg'

/** Video frame that expands and darkens the page as it scrolls to center,
 *  then restores as you scroll past. Swap the poster + button for a real
 *  <video> (or embed) when the recap clip is ready. */
function VideoSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // peaks when the frame is centered in the viewport (progress ≈ 0.5)
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1.04, 0.86])
  const overlay = useTransform(scrollYProgress, [0.12, 0.5, 0.88], [0, 0.9, 0])

  // broadcast the darkened state so the nav can flip its logo to white
  const wasDark = useRef(false)
  useMotionValueEvent(overlay, 'change', (v) => {
    const dark = v > 0.45
    if (dark !== wasDark.current) {
      wasDark.current = dark
      window.dispatchEvent(new CustomEvent('mh-spotlight', { detail: dark }))
    }
  })
  useEffect(
    () => () => {
      window.dispatchEvent(new CustomEvent('mh-spotlight', { detail: false }))
    },
    [],
  )
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      '0 20px 50px -30px rgba(31,42,22,0.4)',
      '0 50px 120px -40px rgba(0,0,0,0.75)',
      '0 20px 50px -30px rgba(31,42,22,0.4)',
    ],
  )

  return (
    <>
      {/* full-screen scrim that darkens everything but the spotlit video */}
      <motion.div
        aria-hidden
        style={{ opacity: overlay }}
        className="pointer-events-none fixed inset-0 z-30 bg-night"
      />

      <div ref={ref} className="relative z-40 mt-16 px-5 md:px-10">
        <motion.div style={{ scale }} className="mx-auto max-w-5xl">
          <motion.div
            style={{ boxShadow: shadow }}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-ink/10 bg-night"
          >
            {/* poster — replace with <video poster=… src=…> */}
            <img
              src={ceremony}
              alt="MHacks 2025 recap"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/20" />

            {/* play button */}
            <button
              type="button"
              aria-label="Play the MHacks 2025 recap"
              className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur-md transition-transform duration-300 hover:scale-110"
            >
              <span className="ml-1 border-y-[11px] border-l-[18px] border-y-transparent border-l-white" />
            </button>

            <div className="absolute bottom-5 left-6 font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
              MHacks 2025 · Recap
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <Eyebrow text="About MHacks" center />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-4xl font-semibold leading-[1.08] tracking-tight text-moss md:text-6xl">
            Calling all <Accent>hackers.</Accent>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-center font-body text-base font-light leading-relaxed text-ink/70">
            {ABOUT_PARAGRAPHS[0]}
          </p>
        </Reveal>
      </div>

      <VideoSpotlight />
    </section>
  )
}
