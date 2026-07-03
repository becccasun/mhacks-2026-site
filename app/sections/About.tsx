"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SplitReveal } from "@/components/SplitReveal";
import { ImageCarousel } from "@/components/ImageCarousel";
import { FlowerStamps } from "@/components/FlowerStamps";

export function About() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const tabY = useTransform(scrollYProgress, [0, 1], [72, 0]);

  return (
    <section
      ref={ref}
      id="about"
      data-nav-theme="light"
      className="relative z-[5] -mt-20 md:-mt-28 w-full pb-0"
    >
      <motion.div
        style={{
          y: tabY,
          borderTopLeftRadius: 48,
          borderTopRightRadius: 48,
          background:
            "radial-gradient(1200px 600px at 80% -10%, rgba(122,147,201,0.15), transparent 60%), linear-gradient(180deg, var(--parchment), #eee6c8)",
        }}
        className="relative w-full overflow-hidden px-6 md:px-[8vw] py-24 md:py-32"
      >
        <FlowerStamps tone="light" />

        <div className="grid items-stretch gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          {/* Heading + copy */}
          <div>
            <h2
              className="font-serif-it text-moss-700 mb-8"
              style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, letterSpacing: "-0.015em" }}
            >
              <SplitReveal as="span" className="block">
                {"About MHacks"}
              </SplitReveal>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              viewport={{ once: true, amount: 0.5 }}
              className="max-w-[560px] text-[22px] leading-[1.5] text-ink"
            >
              MHacks is the University of Michigan&rsquo;s flagship hackathon. 24 hours of creative
              engineering, design, building, and prototyping that blur the line between code and
              the real world. Join 1,000+ student builders this fall in Ann Arbor and build
              something that can have lasting impact.
            </motion.p>
          </div>

          {/* Video embed placeholder — matches the left column's height */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-md border border-border bg-moss-800"
            data-cursor="hover"
          >
            <span className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.15em] text-cream/50">
              FILM / 2026
            </span>
            <div className="flex flex-col items-center gap-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/40 bg-cream/10">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" aria-hidden>
                  <path d="M17 10 1 19V1l16 9Z" fill="#EFE9D4" />
                </svg>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/60">
                Video coming soon
              </span>
            </div>
          </motion.div>
        </div>

        {/* Photo carousel — full bleed, drifting right to left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14 md:mt-16 -mx-6 md:-mx-[8vw]"
        >
          <ImageCarousel className="px-6 md:px-[8vw]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
