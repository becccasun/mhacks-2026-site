"use client";

import { motion } from "framer-motion";

interface Props {
  className?: string;
  color?: string;
}

/**
 * Dotted SVG threads connecting the floating hero cards. Renders on a
 * 1000x700 viewBox with preserveAspectRatio="none" so it stretches to the
 * hero stage while feeling like a hand-drawn field-note diagram.
 */
export function Threads({ className, color = "rgba(239,233,212,0.55)" }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 700"
      preserveAspectRatio="none"
      aria-hidden
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <motion.path
        d="M310,330 C420,300 500,280 555,290"
        stroke={color}
        strokeDasharray="3 5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.6 }}
      />
      <motion.path
        d="M560,290 C620,260 700,240 760,210"
        stroke={color}
        strokeDasharray="3 5"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.9 }}
      />
      <motion.path
        d="M555,300 C540,420 520,520 510,640"
        stroke={color.replace("0.55", "0.4")}
        strokeDasharray="2 6"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.8, 0.2, 1], delay: 1.1 }}
      />
    </svg>
  );
}
