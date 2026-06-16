import Reveal from './Reveal'
import { Accent, Eyebrow, PillLink } from './ui'
import { APPLY_URL, SPONSOR_EMAIL } from '../content'

export default function CTA() {
  return (
    <section className="px-5 py-24 md:px-10 md:py-32">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow text="October 3–4, 2026" center />
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-moss md:text-6xl">
            Come build something <Accent>that grows.</Accent>
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-body text-base font-light leading-relaxed text-ink/70">
            Applications open June 22. Grab your spot for 24 hours of building,
            mentorship, and one unforgettable weekend in Ann Arbor.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PillLink href={APPLY_URL}>Apply now</PillLink>
            <PillLink href={SPONSOR_EMAIL} variant="glass">
              Sponsor Us
            </PillLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
