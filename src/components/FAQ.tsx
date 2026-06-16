import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal, { EASE } from './Reveal'
import { Accent, Eyebrow } from './ui'
import { FAQS } from '../content'

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.04, ease: EASE }}
      className="border-b border-ink/12"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-baseline gap-5 px-2 py-6 text-left transition-colors duration-300 hover:bg-ink/[0.04] md:px-4"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="flex-1 font-serif text-2xl leading-tight text-moss md:text-[26px]">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="font-mono text-xl text-ink/50"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-[600px] pb-7 pl-9 font-body text-[15px] font-light leading-relaxed text-ink/70 md:pl-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="px-5 py-24 md:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow text="Attending MHacks" center />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-center font-display text-4xl font-semibold tracking-tight text-moss md:text-6xl">
            Questions, <Accent>answered.</Accent>
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-ink/12">
          {FAQS.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
