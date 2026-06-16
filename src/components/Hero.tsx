import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import AsciiOverlay from './AsciiOverlay'
import { EASE } from './Reveal'
import heroClean from '../assets/hero-clean-web.jpg'

const LENS_W = 230
const LENS_H = 160

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 0, h: 0 })
  const [hovering, setHovering] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 220, damping: 28, mass: 0.7 })
  const sy = useSpring(my, { stiffness: 220, damping: 28, mass: 0.7 })

  const lensX = useTransform(sx, (v) => v - LENS_W / 2)
  const lensY = useTransform(sy, (v) => v - LENS_H / 2)
  const innerX = useTransform(lensX, (v) => -v)
  const innerY = useTransform(lensY, (v) => -v)

  // live normalized cursor coordinate, rendered as the lens label
  const coordLabel = useTransform(sx, (v) =>
    dims.w ? (v / dims.w).toFixed(4) : '0.0000',
  )

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const ro = new ResizeObserver(() => {
      const r = card.getBoundingClientRect()
      setDims({ w: r.width, h: r.height })
      mx.set(r.width * 0.62)
      my.set(r.height * 0.32)
    })
    ro.observe(card)
    return () => ro.disconnect()
  }, [mx, my])

  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section
      id="top"
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative min-h-[700px] cursor-crosshair overflow-hidden"
      style={{ height: '100svh' }}
    >
      {/* blurred base photo — kept rich/dark like the figma reference */}
      <motion.img
        src={heroClean}
        alt="Blue scilla flowers on the University of Michigan campus"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 2.6, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover blur-[12px] brightness-[0.92]"
      />

      {/* procedural ascii layer — removed inside the lens */}
      <AsciiOverlay
        src={heroClean}
        color="rgba(31, 42, 22, 0.55)"
        className="absolute inset-0 h-full w-full opacity-60"
      />

      {/* legibility: light veil at the top (so the nav + dark logo read),
          darkening toward the bottom (so the wordmark reads) */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper/35 via-transparent to-night/75" />

      {/* cursor lens — strips blur + ascii to reveal the clean photo */}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-10"
        style={{ x: lensX, y: lensY, width: LENS_W, height: LENS_H }}
        animate={{
          opacity: hovering ? 1 : 0,
          scale: hovering ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      >
        <motion.span className="absolute -top-6 left-0 font-pixel text-[13px] text-white/90 tabular-nums">
          {coordLabel}
        </motion.span>
        <div className="relative h-full w-full overflow-hidden border border-white/80 shadow-[0_0_60px_rgba(0,0,0,0.35)]">
          <motion.div
            className="absolute left-0 top-0"
            style={{ x: innerX, y: innerY, width: dims.w, height: dims.h }}
          >
            <img src={heroClean} alt="" className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </motion.div>

      {/* wordmark + event fine print, anchored bottom-left */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-12 md:px-12 md:pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.45, ease: EASE }}
          className="font-serif leading-[0.85] tracking-tight text-cream"
          style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)' }}
        >
          MHACKS 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-4 font-body text-xs font-light uppercase tracking-[0.28em] text-cream/85 md:text-sm"
        >
          October 3–4, 2026 · Ann Arbor, Michigan
        </motion.p>
      </div>
    </section>
  )
}
