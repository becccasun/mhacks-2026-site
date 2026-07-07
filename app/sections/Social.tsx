"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { SplitReveal } from "@/components/SplitReveal";
import { DotGridReactive } from "@/components/DotGridReactive";
import { FlowerStamps } from "@/components/FlowerStamps";
import { SpeciesLabel } from "@/components/SpeciesLabel";
import { SOCIAL_POSTS, INSTAGRAM_URL, LINKEDIN_URL, TIKTOK_URL } from "@/lib/socials";

const HANDLES = [
  { label: "@mhacks_ on Instagram ↗", href: INSTAGRAM_URL },
  { label: "MHacks on LinkedIn ↗", href: LINKEDIN_URL },
  { label: "@mhacks_official on TikTok ↗", href: TIKTOK_URL },
];

/**
 * "Our Social Media" — a dark gallery wall of the latest Instagram posts,
 * framed like backlit posters. Post data lives in lib/socials.ts (see the
 * handoff notes there for wiring this to the Instagram API).
 */
export function Social() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // White lily-of-the-valley garland: peeks from the right edge and drifts
  // left into place as the sheet scrolls in (mirror of the Sponsors branch).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const garlandX = useTransform(scrollYProgress, [0.08, 0.92], ["62vw", "0vw"]);

  return (
    <section
      ref={ref}
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

      <FlowerStamps tone="dark" />

      {/* White lily-of-the-valley garland along the top — full-bleed, in flow */}
      <motion.div
        aria-hidden
        style={{ x: reduced ? 0 : garlandX }}
        className="pointer-events-none relative -mx-6 mb-10 md:-mx-[8vw] md:mb-12"
      >
        {/* Idle waver anchored toward the right, where the stem roots offscreen */}
        <motion.div
          animate={
            reduced ? undefined : { rotate: [-0.9, 1.2, -0.9], y: [-7, 8, -7] }
          }
          transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "85% 50%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/social/garland-white.webp" alt="" draggable={false} className="ml-auto w-[88%]" />
        </motion.div>
        {/* Species tag in the blank pocket above the vine's dip — the one
            non-native species in the set, so it's flagged as invasive */}
        <SpeciesLabel
          name="Lily of the Valley"
          invasive
          rotate={3}
          className="absolute left-[60%] top-[calc(14%-20px)] hidden md:flex"
        />
      </motion.div>

      <div className="relative mb-14 flex flex-wrap items-end justify-between gap-8 md:mb-16">
        <h2
          className="font-display font-medium text-cream"
          style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
        >
          <SplitReveal as="span" className="block">
            {"Our Social Media"}
          </SplitReveal>
        </h2>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {HANDLES.map((h, i) => (
            <motion.a
              key={h.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              href={h.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="font-mono text-[13px] uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream hover:underline underline-offset-4"
            >
              {h.label}
            </motion.a>
          ))}
        </div>
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
