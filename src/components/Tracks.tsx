import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Reveal, { EASE } from './Reveal'
import { Eyebrow, Fiducials } from './ui'
import { TRACKS } from '../content'
import flower1 from '../assets/flower-1.svg'
import flower2 from '../assets/flower-2.svg'
import flower3 from '../assets/flower-3.svg'
import flower4 from '../assets/flower-4.svg'

const FLOWERS = [flower1, flower2, flower3, flower4]
const N = TRACKS.length

type Track = (typeof TRACKS)[number]

/** per-track image card — PLACEHOLDER. Swap the gradient/flower for the
 *  real uploaded image of each track. */
function TrackCard({ track, flower }: { track: Track; flower: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl border border-ink/10">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${track.glow} 0%, #eef0e4 68%, #f4f2e8 100%)`,
        }}
      />
      <Fiducials color="border-ink/30" />
      <img
        src={flower}
        alt=""
        className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 opacity-90"
      />
      <span className="absolute bottom-6 left-7 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
        {track.name}
      </span>
    </div>
  )
}

/** a single row in the always-visible track list */
function TrackRow({
  track,
  flower,
  on,
}: {
  track: Track
  flower: string
  on: boolean
}) {
  return (
    <div
      className={`flex items-start gap-5 rounded-2xl border px-6 py-5 transition-all duration-500 ${
        on
          ? 'border-moss/25 bg-white shadow-[0_14px_36px_-22px_rgba(58,74,38,0.55)]'
          : 'border-transparent bg-transparent opacity-45'
      }`}
    >
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-haze">
        <div
          className="absolute inset-1 rounded-full blur-md transition-opacity duration-500"
          style={{ background: track.glow, opacity: on ? 0.7 : 0 }}
        />
        <img src={flower} alt="" className="relative h-8 w-8" />
      </div>
      <div className="pt-0.5">
        <h3
          className={`font-display text-[19px] font-semibold transition-colors duration-500 ${
            on ? 'text-moss' : 'text-ink/70'
          }`}
        >
          {track.name}
        </h3>
        <p className="mt-1 max-w-md font-body text-sm font-light leading-relaxed text-ink/65">
          {track.description}
        </p>
      </div>
    </div>
  )
}

export default function Tracks() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // scroll selects each track sequentially
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))))
  })

  return (
    <section id="tracks" ref={ref} className="relative lg:h-[420vh]">
      {/* DESKTOP — pinned: scroll selects each track; the active image fades +
          slides out the top, revealing the next one in its original spot */}
      <div className="sticky top-0 hidden h-screen items-center overflow-hidden px-10 lg:flex">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 items-center gap-20">
          <div>
            <Eyebrow text="Choose your focus" />
            <h2 className="mt-6 font-display text-6xl font-semibold leading-[1.05] tracking-tight text-moss">
              Official Tracks
            </h2>
            <div className="mt-10 flex flex-col gap-2.5">
              {TRACKS.map((track, i) => (
                <TrackRow
                  key={track.name}
                  track={track}
                  flower={FLOWERS[i]}
                  on={i === active}
                />
              ))}
            </div>
          </div>

          {/* stacked per-track images */}
          <div className="relative h-[560px]">
            {TRACKS.map((track, i) => (
              <motion.div
                key={track.name}
                className="absolute inset-0"
                style={{ zIndex: N - i }}
                animate={
                  i < active ? { opacity: 0, y: '-55%' } : { opacity: 1, y: '0%' }
                }
                transition={{ duration: 0.7, ease: EASE }}
              >
                <TrackCard track={track} flower={FLOWERS[i]} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE — every track + its image stacked (no scroll-jacking) */}
      <div className="px-5 py-24 lg:hidden">
        <Reveal>
          <Eyebrow text="Choose your focus" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-moss">
            Official Tracks
          </h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-10">
          {TRACKS.map((track, i) => (
            <Reveal key={track.name} delay={0.05 * i}>
              <TrackRow track={track} flower={FLOWERS[i]} on />
              <div className="mt-4 h-72">
                <TrackCard track={track} flower={FLOWERS[i]} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
