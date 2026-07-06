"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/SplitReveal";
import { DotGridReactive } from "@/components/DotGridReactive";
import { SOCIAL_POSTS, INSTAGRAM_URL } from "@/lib/socials";

/**
 * "Our Social Media" — a dark gallery wall of the latest Instagram posts,
 * framed like backlit posters. Post data lives in lib/socials.ts (see the
 * handoff notes there for wiring this to the Instagram API).
 */
export function Social() {
  return (
    <section
      id="social"
      data-nav-theme="dark"
      className="relative z-[8] -mt-14 md:-mt-20 flex min-h-screen flex-col justify-center overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-moss-900 text-cream px-6 md:px-[8vw] py-24 md:py-32"
    >
      {/* Gallery-wall vignette: darker toward the edges so the frames glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, rgba(239,233,212,0.05) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Dot lattice that swells and brightens around the cursor */}
      <DotGridReactive />

      <div className="relative mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-16">
        <h2
          className="font-display font-medium text-cream"
          style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
        >
          <SplitReveal as="span" className="block">
            {"Our Social Media"}
          </SplitReveal>
        </h2>
        <motion.a
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          data-cursor="hover"
          className="font-mono text-[13px] uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream hover:underline underline-offset-4"
        >
          @mhacks_ on Instagram ↗
        </motion.a>
      </div>

      <div className="relative grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-7">
        {SOCIAL_POSTS.map((post, i) => (
          <motion.a
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="hover"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.08 }}
            viewport={{ once: true, amount: 0.3 }}
            className="group block"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="border border-white/15 bg-[#0d1107] p-2"
              style={{ boxShadow: "0 0 38px rgba(239,233,212,0.09)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image}
                alt={post.label}
                draggable={false}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
              />
            </motion.div>
            <div className="mt-4 text-[14px] leading-snug text-cream/85 transition-colors group-hover:text-cream group-hover:underline underline-offset-4">
              {post.label}
            </div>
            <div className="mt-1.5 font-mono text-[11px] tracking-[0.14em] text-cream/45">
              {post.date}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
