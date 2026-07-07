"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/Button";
import { SplitReveal } from "@/components/SplitReveal";
import { SpeciesLabel } from "@/components/SpeciesLabel";
import { FlowerStamps } from "@/components/FlowerStamps";
import { DEADLINES } from "@/lib/deadlines";
import { asset } from "@/lib/asset";

/**
 * Season timeline — items come from lib/deadlines.ts, the same single source
 * of truth the hero countdown uses (see the handoff notes there). The event
 * weekend itself isn't a deadline, so it's appended here as the capstone.
 */
const EVENT = {
  id: "event-weekend",
  label: "MHacks 2026",
  date: "2026-10-03T09:00:00-04:00",
  display: "Oct 3–4",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function Timeline() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Orange lily garland: slides in from the left edge as the sheet scrolls
  // into place, settling once it spans the full width. Transform-only.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const garlandX = useTransform(scrollYProgress, [0.08, 0.92], ["-62vw", "0vw"]);

  const now = Date.now();
  const items = [
    ...DEADLINES.map((d) => ({
      id: d.id,
      label: d.label,
      date: d.date,
      display: formatDate(d.date),
    })),
    EVENT,
  ];
  const nextIndex = items.findIndex((i) => new Date(i.date).getTime() > now);

  return (
    <section
      ref={ref}
      id="timeline"
      data-nav-theme="light"
      className="relative z-[7] -mt-14 md:-mt-20 flex min-h-screen flex-col justify-center rounded-t-[40px] md:rounded-t-[48px] bg-parchment px-6 md:px-[8vw] py-24 md:py-32"
      style={{
        backgroundImage:
          "radial-gradient(rgba(58,74,38,0.16) 1px, transparent 1.4px)",
        backgroundSize: "26px 26px",
      }}
    >
      <FlowerStamps tone="light" />

      {/* Orange lily garland along the top — full-bleed, in flow */}
      <motion.div
        aria-hidden
        style={{ x: reduced ? 0 : garlandX }}
        className="pointer-events-none relative -mx-6 mb-10 md:-mx-[8vw] md:mb-14"
      >
        {/* Idle waver anchored toward the left, where the stem roots offscreen */}
        <motion.div
          animate={
            reduced ? undefined : { rotate: [0.9, -1.2, 0.9], y: [-7, 8, -7] }
          }
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "15% 50%" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/timeline/garland-orange.webp")} alt="" draggable={false} className="w-[88%]" />
        </motion.div>
        {/* Species tag in the blank pocket above the vine's dip */}
        <SpeciesLabel
          name="Michigan Lily"
          rotate={-3}
          className="absolute left-[calc(20%+50px)] top-[calc(12%-10px)] hidden md:flex"
        />
      </motion.div>

      <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
        <h2
          className="font-display font-medium text-moss-700"
          style={{ fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.015em" }}
        >
          <SplitReveal as="span" className="block">
            {"Timeline"}
          </SplitReveal>
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <Button href="#apply" variant="primary" size="lg" magnetic>
            Apply now →
          </Button>
        </motion.div>
      </div>

      <div className="relative">
        {/* Connecting line, drawn across as the section scrolls in (md+) */}
        <div className="absolute left-0 right-0 top-[7px] hidden h-[2px] bg-[rgba(58,74,38,0.15)] md:block" />
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="absolute left-0 right-0 top-[7px] hidden h-[2px] origin-left bg-[rgba(58,74,38,0.55)] md:block"
        />

        <ol className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-6">
          {items.map((item, i) => {
            const passed = new Date(item.date).getTime() <= now;
            const isNext = i === nextIndex;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.2, 0.8, 0.2, 1],
                  delay: 0.25 + i * 0.14,
                }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative"
              >
                <span
                  className={
                    passed
                      ? "block h-4 w-4 rounded-full bg-moss-700"
                      : isNext
                      ? "block h-4 w-4 rounded-full bg-[#D9BE45] ring-4 ring-[#D9BE45]/30"
                      : "block h-4 w-4 rounded-full border-2 border-[rgba(58,74,38,0.45)] bg-parchment"
                  }
                />
                <div className="mt-5 font-mono text-[12px] uppercase tracking-[0.16em] text-moss-500">
                  {item.display}
                  {isNext && (
                    <span className="ml-2 rounded-pill bg-[#D9BE45]/25 px-2 py-0.5 text-[10px] tracking-[0.1em] text-[#75641a]">
                      next
                    </span>
                  )}
                </div>
                <div className="mt-2 max-w-[170px] text-[15px] font-medium leading-snug text-moss-700">
                  {item.label}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
