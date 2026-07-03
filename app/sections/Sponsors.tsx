"use client";

import { motion } from "framer-motion";
import { SplitReveal } from "@/components/SplitReveal";
import { Button } from "@/components/Button";
import { FlowerStamps } from "@/components/FlowerStamps";

export function Sponsors() {
  return (
    <section
      id="sponsors"
      data-nav-theme="dark"
      className="relative z-[6] -mt-14 md:-mt-20 overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-moss-700 text-cream px-6 md:px-[8vw] py-24 md:py-32"
    >
      <FlowerStamps tone="dark" />

      <div className="mb-16 flex flex-wrap items-end justify-between gap-10">
        <h2 className="font-serif-it text-cream" style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1, letterSpacing: "-0.015em" }}>
          <SplitReveal as="span" className="block">{"Our Sponsors"}</SplitReveal>
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-[480px] text-[17px] leading-[1.6] text-[#dcd8c2]"
        >
          The final lineup of sponsors is currently in the works. Please check back later.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-6 rounded-lg border p-9"
        style={{
          borderColor: "rgba(239,233,212,0.25)",
          background: "linear-gradient(135deg, rgba(232,211,90,0.08), rgba(224,122,154,0.08))",
        }}
      >
        <div>
          <div className="font-serif-it text-cream" style={{ fontSize: 32, lineHeight: 1.1 }}>
            Sponsor MHacks 2026.
          </div>
          <div className="mt-2 text-[14px] text-[#bdc59a]">
            Reach 1,000+ technical students from across North America.
          </div>
        </div>
        <Button href="mailto:sponsor@mhacks.org" variant="glass" size="lg">
          Get the prospectus →
        </Button>
      </motion.div>
    </section>
  );
}
