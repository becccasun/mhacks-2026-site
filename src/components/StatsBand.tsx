import Reveal from './Reveal'
import { Accent, Eyebrow } from './ui'
import PhotoCarousel from './PhotoCarousel'
import sponsorsAscii from '../assets/sponsors-ascii.png'

const STATS = [
  { value: '$30k+', caption: 'Prize pool across all tracks' },
  { value: '200+', caption: 'Projects shipped in a weekend' },
  { value: '24 hrs', caption: 'Of building, start to demo' },
  { value: '14', caption: 'Editions since 2013' },
]

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <img
        src={sponsorsAscii}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-paper/82" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10">
        <Reveal>
          <Eyebrow text="By the numbers" center />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-moss md:text-6xl">
            Remember <Accent>MHacks 2025?</Accent>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.caption}
                className="border-l border-ink/15 px-6 md:px-8"
              >
                <p className="font-display text-4xl font-semibold text-moss md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-3 max-w-[170px] font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-ink/60">
                  {s.caption}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="relative mt-20">
          <PhotoCarousel />
        </div>
      </Reveal>
    </section>
  )
}
