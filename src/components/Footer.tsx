import { useNow } from './ui'
import { APPLY_URL, CONTACT_EMAIL, COORDS, SPONSOR_EMAIL } from '../content'
import logo from '../assets/logo.svg'

function AnnArborClock() {
  const now = useNow()
  const time = new Date(now).toLocaleTimeString('en-US', {
    timeZone: 'America/Detroit',
    hour12: false,
  })
  return <span className="tabular-nums">Ann Arbor — {time}</span>
}

const COLUMNS = [
  {
    title: 'Event',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Tracks', href: '#tracks' },
      { label: 'Key dates', href: '#dates' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { label: 'Apply', href: APPLY_URL },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: CONTACT_EMAIL },
    ],
  },
  {
    title: 'Sponsor',
    links: [
      { label: 'Become a sponsor', href: SPONSOR_EMAIL },
      { label: 'Sponsors', href: '#sponsors' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-haze">
      <div className="mx-auto max-w-6xl px-5 pb-8 pt-16 md:px-10">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <img src={logo} alt="MHacks logo" className="h-9 w-9" />
              <span className="font-display text-base font-semibold text-moss">
                MHacks
              </span>
            </div>
            <p className="mt-4 font-serif text-xl italic text-ink/75">
              Build something that grows.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
              {COORDS}
            </p>
          </div>

          <div className="flex flex-wrap gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
                  {col.title}
                </p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-body text-sm font-light text-ink/70 transition-colors hover:text-moss"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
          <span>© 2026 MHacks, University of Michigan</span>
          <AnnArborClock />
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5d8a2f] [animation:pulse-dot_2s_ease-in-out_infinite]" />
            Applications open Jun 22
          </span>
        </div>
      </div>
    </footer>
  )
}
