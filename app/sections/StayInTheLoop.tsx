"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/SplitReveal";
import { EmailSignup } from "@/components/EmailSignup";
import { asset } from "@/lib/asset";

/**
 * "Stay In The Loop" — email list signup over a soft-focus meadow, in the
 * spirit of the blurred-green reference boards. The right-hand frame is a
 * reserved slot for special effects later.
 */
export function StayInTheLoop() {
  return (
    <section
      id="newsletter"
      data-nav-theme="dark"
      className="relative z-[9] -mt-14 md:-mt-20 flex min-h-screen items-center overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-moss-800 text-cream px-6 md:px-[8vw] py-24 md:py-32"
    >
      {/* Soft-focus meadow backdrop. The blur + grade are baked into the
          image itself (scripts in repo history) — a live CSS blur this big
          plus the glass panel's backdrop-filter overloaded the compositor
          and made the whole sheet flicker during scroll. */}
      <div aria-hidden className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/newsletter/newsletter-bg.jpg")}
          alt=""
          draggable={false}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(29,36,18,0.55) 0%, rgba(29,36,18,0.3) 45%, rgba(29,36,18,0.6) 100%)",
          }}
        />
      </div>

      {/* Liquid frosted glass frame around the whole lockup: heading, copy,
          email field, and the reserved image box. lg-static: no backdrop
          sampling or blend layers — the backdrop is pre-blurred, so real
          frosting cost GPU surfaces for zero visible difference (and was
          flashing under memory pressure). */}
      <div
        className="liquid-glass lg-static relative w-full rounded-[36px] p-8 md:rounded-[44px] md:p-[4.5vw]"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.17), rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.13))",
        }}
      >
        <div className="relative grid w-full items-center gap-14 md:grid-cols-[1.1fr_0.9fr] md:gap-[5vw]">
        <div>
          <h2
            className="font-display font-medium text-cream"
            style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
          >
            <SplitReveal as="span" className="block">
              {"Stay In The Loop"}
            </SplitReveal>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-6 max-w-[480px] text-[15px] leading-[1.6] text-[#dcd8c2]"
          >
            Add your email to get reminders about application deadlines,
            announcements, updates, and occasional notes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mt-9"
          >
            <EmailSignup />
          </motion.div>
        </div>

        {/* Reserved frame — special effects land here later */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="hidden aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-[32px] border border-white/25 bg-white/5 md:flex"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 60px rgba(239,233,212,0.06)" }}
        >
          <pre className="font-mono text-[11px] leading-[1.2] text-cream/60">{"\\ | /\n-(*)-\n/ | \\"}</pre>
          <span className="font-mono text-[12px] uppercase tracking-[0.24em] text-cream/50">
            something&rsquo;s growing here
          </span>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
