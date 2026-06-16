import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from './Reveal'
import logo from '../assets/logo.svg'

const BAR_BLOCKS = 22

export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t0 = performance.now()
    const DURATION = 1250
    let raf = 0
    const tick = (t: number) => {
      // first rAF timestamp can predate t0 — clamp so progress never goes negative
      const p = Math.min(1, Math.max(0, (t - t0) / DURATION))
      // ease the count so it lingers briefly near the end, terminal-style
      setProgress(Math.floor((1 - Math.pow(1 - p, 2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 200)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const filled = Math.round((progress / 100) * BAR_BLOCKS)

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.75, ease: EASE }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-paper"
        >
          <img src={logo} alt="" className="h-10 w-10 opacity-90" />
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink/60">
            MHACKS://2026 — ANN ARBOR
          </p>
          <p className="font-mono text-sm text-fern">
            [{'█'.repeat(filled).padEnd(BAR_BLOCKS, '░')}]{' '}
            {String(progress).padStart(3, '0')}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
