"use client";

import { motion } from "framer-motion";

/**
 * Sticker-style species tag for the botanical garlands. The site's flowers
 * are a Michigan-flora highlight, so each garland gets an identifying label
 * tucked into a dip in its vine (positioned by the parent). Lily of the
 * valley is the one non-native in the set, so it carries an invasive note
 * instead of the usual "Michigan native" caption.
 */
export function SpeciesLabel({
  name,
  invasive = false,
  rotate = -3,
  className = "",
}: {
  name: string;
  invasive?: boolean;
  rotate?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75, rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.55 }}
      viewport={{ once: true, amount: 0.5 }}
      className={`flex-col items-center rounded-[10px] border border-[rgba(58,74,38,0.16)] bg-[#FFFBEF] px-4 py-2 text-center ${className}`}
      style={{ boxShadow: "0 0 0 3px rgba(255,251,239,0.55)" }}
    >
      <span className="font-serif-it text-[15px] leading-tight text-moss-700">
        {name}
      </span>
      <span
        className={`mt-1 font-mono text-[9px] uppercase tracking-[0.2em] ${
          invasive ? "text-[#A2542C]" : "text-moss-500"
        }`}
      >
        {invasive ? "invasive species" : "michigan native"}
      </span>
    </motion.div>
  );
}
