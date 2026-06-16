import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EASE } from './Reveal'

const SCRAMBLE_CHARS = '#%*+=:-·<>/'

/** terminal-style decode effect for short mono labels */
export function Scramble({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [out, setOut] = useState(() => text.replace(/\S/g, '·'))

  useEffect(() => {
    if (!inView) return
    let frame = 0
    const total = Math.max(14, text.length * 2)
    const id = setInterval(() => {
      frame++
      const reveal = Math.floor((frame / total) * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          s += ' '
          continue
        }
        s +=
          i < reveal
            ? text[i]
            : SCRAMBLE_CHARS[(i * 7 + frame * 3) % SCRAMBLE_CHARS.length]
      }
      setOut(frame >= total ? text : s)
      if (frame >= total) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [inView, text])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}

/** numbered section header: `01 —— LABEL` rule + masked serif title */
export function SectionHeader({
  index,
  label,
  title,
  dark = false,
}: {
  index: string
  label: string
  title: string
  dark?: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      <div
        className={`flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] ${
          dark ? 'text-cream/60' : 'text-ink/50'
        }`}
      >
        <span>{index}</span>
        <span className={`h-px w-12 ${dark ? 'bg-cream/30' : 'bg-ink/25'}`} />
        <Scramble text={label} />
      </div>
      {/* whileInView must live on the clipping wrapper: a fully-translated child
          is reported as non-intersecting by IntersectionObserver */}
      <motion.div
        className="overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
      >
        <motion.h2
          variants={{ hidden: { y: '110%' }, show: { y: 0 } }}
          transition={{ duration: 1, ease: EASE }}
          className={`font-serif text-5xl leading-[1.05] md:text-7xl ${
            dark ? 'text-cream' : 'text-moss'
          }`}
        >
          {title}
        </motion.h2>
      </motion.div>
    </div>
  )
}

/** serif-italic accent word inside a sans headline, cairn-style */
export function Accent({ children }: { children: React.ReactNode }) {
  return <span className="font-serif font-normal italic text-fern">{children}</span>
}

/** centered or left eyebrow chip: ✦ LABEL ✦ */
export function Eyebrow({
  text,
  center = false,
}: {
  text: string
  center?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fern ${
        center ? 'justify-center' : ''
      }`}
    >
      <span className="text-[8px]">✦</span>
      <Scramble text={text} />
      <span className="text-[8px]">✦</span>
    </div>
  )
}

/** pill buttons — solid moss primary, light outline secondary */
export function PillLink({
  href,
  variant = 'white',
  children,
}: {
  href: string
  variant?: 'white' | 'glass'
  children: React.ReactNode
}) {
  const styles =
    variant === 'white'
      ? 'bg-moss text-fog hover:bg-olive'
      : 'border border-ink/20 bg-ink/[0.03] text-ink backdrop-blur-md hover:border-ink/40 hover:bg-ink/[0.07]'
  return (
    <a
      href={href}
      className={`inline-block rounded-full px-7 py-3.5 font-display text-[15px] font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles}`}
    >
      {children}
    </a>
  )
}

/** viewfinder corner brackets */
export function Fiducials({ color = 'border-ink/40' }: { color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-3 z-10" aria-hidden>
      <span className={`absolute left-0 top-0 h-4 w-4 border-l border-t ${color}`} />
      <span className={`absolute right-0 top-0 h-4 w-4 border-r border-t ${color}`} />
      <span className={`absolute bottom-0 left-0 h-4 w-4 border-b border-l ${color}`} />
      <span className={`absolute bottom-0 right-0 h-4 w-4 border-b border-r ${color}`} />
    </div>
  )
}

/** ticking epoch, shared by countdown + clock */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), interval)
    return () => clearInterval(id)
  }, [interval])
  return now
}
