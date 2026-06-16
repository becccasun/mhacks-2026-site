import { motion } from 'framer-motion'
import Reveal, { EASE } from './Reveal'
import { Accent, Eyebrow, useNow } from './ui'
import { KEY_DATES } from '../content'

function midnightEastern(iso: string) {
  return new Date(`${iso}T00:00:00-04:00`).getTime()
}

function countdown(ms: number) {
  if (ms <= 0) return 'T–00:00:00'
  const d = Math.floor(ms / 86_400_000)
  const h = Math.floor((ms % 86_400_000) / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `T–${d}D ${pad(h)}:${pad(m)}:${pad(s)}`
}

export default function KeyDates() {
  const now = useNow()
  const nextIso = KEY_DATES.find((k) => midnightEastern(k.iso) > now)?.iso

  return (
    <section id="dates" className="px-5 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <div>
          <Reveal>
            <Eyebrow text="Applications" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-moss md:text-6xl">
              Mark your <Accent>calendar.</Accent>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-ink/12">
          {KEY_DATES.map((item, i) => {
            const t = midnightEastern(item.iso)
            const isPast = t <= now
            const isNext = item.iso === nextIso
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
                className={`flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-ink/12 px-2 py-6 transition-colors duration-300 hover:bg-ink/[0.04] md:px-4 ${
                  isPast ? 'opacity-40' : ''
                }`}
              >
                <span className="w-16 font-mono text-sm tracking-[0.1em] text-ink/60">
                  {item.date}
                </span>
                <h3 className="font-serif text-2xl italic text-moss md:text-4xl">
                  {item.label}
                </h3>
                <span className="hidden flex-1 -translate-y-1.5 border-b border-dotted border-ink/20 sm:block" />
                {isNext ? (
                  <span className="rounded-full bg-moss px-3 py-1 font-mono text-[11px] tracking-[0.12em] text-fog tabular-nums">
                    {countdown(t - now)}
                  </span>
                ) : (
                  <span className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
                    {isPast ? 'Passed' : 'Upcoming'}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
