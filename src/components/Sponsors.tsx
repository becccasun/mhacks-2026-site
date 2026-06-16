import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal'
import { Accent, Eyebrow, Fiducials, PillLink } from './ui'
import { SPONSOR_EMAIL } from '../content'
import sponsorsAscii from '../assets/sponsors-ascii.png'

export default function Sponsors() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section id="sponsors" className="px-5 py-24 md:px-10">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow text="Powering MHacks" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-moss md:text-6xl">
              Help us empower
              <br />
              <Accent>potential.</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-ink/70">
              MHacks built its success on the support of generous sponsors
              across industries. Learn how you can put your brand in front of
              the next generation of talented builders.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="mt-9">
              <PillLink href={SPONSOR_EMAIL}>Become a sponsor ↗</PillLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={ref}
            className="relative flex h-[440px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-ink/10 text-center"
          >
            <motion.img
              src={sponsorsAscii}
              alt=""
              style={{ y: parallaxY }}
              className="absolute inset-0 h-[120%] w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-paper/72" />
            <Fiducials color="border-ink/30" />
            <span className="absolute left-7 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
              sponsors/2026.log
            </span>
            <span className="absolute right-7 top-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55">
              status: pending
            </span>

            <div className="relative">
              <h3 className="font-serif text-5xl text-moss md:text-6xl">
                Our Sponsors
              </h3>
              <p className="mt-4 font-serif text-2xl italic text-moss/80 md:text-3xl">
                Coming Soon
                <span className="ml-1 inline-block animate-[blink_1.1s_steps(1)_infinite]">
                  ▮
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
