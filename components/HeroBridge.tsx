"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { AsciiCanvas } from "@/components/AsciiCanvas";
import { asset } from "@/lib/asset";

interface Props {
  /** Background image continued from the hero. Defaults to the hero backdrop. */
  src?: string;
  /** Total height of the bridge in px. */
  height?: number;
  /** Bottom color the bridge fades into (matches the next section). */
  to?: string;
}

/**
 * A Mercury-style cinematic transition between the hero and the About section.
 * The hero's Michigan photo continues into the bridge, scales up (as if the
 * camera is diving deeper into the landscape), then fades to the next
 * section's background color. A faint ASCII "field" persists across the seam,
 * carrying the digital-garden atmosphere into the next section.
 */
export function HeroBridge({
  src = asset("/hero/hero-bg-1.png"),
  height = 320,
  to = "var(--parchment)",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const scale = useTransform(smooth, [0, 1], [1.15, 1.85]);
  const y = useTransform(smooth, [0, 1], ["0%", "-14%"]);
  const asciiOpacity = useTransform(smooth, [0, 0.3, 1], [0.55, 0.35, 0.15]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full overflow-hidden"
      style={{ height }}
    >
      {/* Photo layer  the hero photo continues here, scaling as if the camera
          is pushing deeper into the landscape. */}
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ filter: "saturate(1.05) brightness(0.85)" }}
        />
      </motion.div>

      {/* Moss tint that carries hero atmosphere in */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(29,36,18,0.55) 0%, rgba(29,36,18,0.35) 25%, rgba(29,36,18,0.0) 55%)",
        }}
      />

      {/* Gradient hand-off into next section */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, transparent 0%, transparent 40%, ${to} 92%, ${to} 100%)`,
        }}
      />

      {/* ASCII carries through the seam, fading as we exit */}
      <motion.div className="absolute inset-0" style={{ opacity: asciiOpacity }}>
        <AsciiCanvas
          opacity={1}
          blendMode="overlay"
          step={20}
          fontSize={10}
          interactive={false}
        />
      </motion.div>

      {/* Faint scan-line / horizon: a thin cream line where the "landscape" ends */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "58%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(239,233,212,0.35) 20%, rgba(239,233,212,0.55) 50%, rgba(239,233,212,0.35) 80%, transparent)",
          filter: "blur(0.6px)",
        }}
      />
    </div>
  );
}
