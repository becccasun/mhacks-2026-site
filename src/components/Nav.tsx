import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { APPLY_URL } from '../content'
import logoDark from '../assets/logo-dark.svg'
import logoWhite from '../assets/logo.svg'

const LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Tracks', id: 'tracks' },
  { label: 'Dates', id: 'dates' },
  { label: 'Sponsors', id: 'sponsors' },
  { label: 'FAQ', id: 'faq' },
]

export default function Nav() {
  const [active, setActive] = useState<string | null>(null)
  const [spotlight, setSpotlight] = useState(false)

  // VideoSpotlight darkens the page — flip the logo to white while it's active
  useEffect(() => {
    const onSpot = (e: Event) =>
      setSpotlight((e as CustomEvent<boolean>).detail)
    window.addEventListener('mh-spotlight', onSpot)
    return () => window.removeEventListener('mh-spotlight', onSpot)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-35% 0px -60% 0px' },
    )
    for (const { id } of LINKS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="relative flex h-20 items-center justify-between px-5 md:px-10">
        <a href="#top" className="relative block h-9 w-9">
          <img
            src={logoDark}
            alt="MHacks logo"
            className={`absolute inset-0 h-9 w-9 drop-shadow-[0_1px_8px_rgba(244,242,232,0.8)] transition-opacity duration-500 ${
              spotlight ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <img
            src={logoWhite}
            alt=""
            aria-hidden
            className={`absolute inset-0 h-9 w-9 drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] transition-opacity duration-500 ${
              spotlight ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </a>

        {/* light liquid-glass pill */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-ink/10 bg-[rgba(255,255,255,0.6)] p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_32px_rgba(31,42,22,0.12)] backdrop-blur-2xl md:flex">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`relative rounded-full px-4 py-2 font-display text-[13.5px] font-medium transition-colors duration-300 ${
                active === l.id
                  ? 'text-fog'
                  : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
              }`}
            >
              {active === l.id && (
                <motion.span
                  layoutId="nav-glass-pill"
                  className="absolute inset-0 rounded-full bg-moss"
                  transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <a
          href={APPLY_URL}
          className="rounded-full bg-moss px-5 py-2.5 font-display text-[13.5px] font-semibold text-fog transition-all duration-300 hover:-translate-y-0.5 hover:bg-olive"
        >
          Apply now
        </a>
      </div>
    </motion.header>
  )
}
