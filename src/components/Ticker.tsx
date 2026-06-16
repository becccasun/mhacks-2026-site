import { TICKER_ITEMS } from '../content'

// duplicated track so the -50% marquee keyframe loops seamlessly
const TRACK = [...TICKER_ITEMS, ...TICKER_ITEMS]

export default function Ticker() {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-haze/50 py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-10 whitespace-nowrap pr-10">
        {TRACK.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-serif text-2xl italic text-moss/90 md:text-3xl">
              {item}
            </span>
            <span className="text-fern/60" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
