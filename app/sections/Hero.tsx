"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroReveal } from "@/components/HeroReveal";
import { SplitReveal } from "@/components/SplitReveal";
import { AsciiGlow } from "@/components/AsciiGlow";
import { ScrambleText } from "@/components/ScrambleText";
import { prefersReducedMotion } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
  }, []);

  // Cursor-driven 3D tilt: the meadow leans toward the pointer while the
  // ASCII starfield drifts the opposite way, so the layers read as depth.
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const px = useSpring(pointerX, { stiffness: 55, damping: 18, mass: 0.6 });
  const py = useSpring(pointerY, { stiffness: 55, damping: 18, mass: 0.6 });

  const tiltX = useTransform(py, [0, 1], [2.4, -2.4]);
  const tiltY = useTransform(px, [0, 1], [-3.2, 3.2]);
  const shiftX = useTransform(px, [0, 1], [-16, 16]);
  const shiftY = useTransform(py, [0, 1], [-11, 11]);
  const starX = useTransform(px, [0, 1], [9, -9]);
  const starY = useTransform(py, [0, 1], [7, -7]);

  const onTiltMove = (e: React.MouseEvent) => {
    if (reducedRef.current) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pointerX.set((e.clientX - r.left) / r.width);
    pointerY.set((e.clientY - r.top) / r.height);
  };
  const onTiltLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  // Lenis already smooths the scroll position — mapping progress directly
  // (no spring) keeps the parallax locked to the scroll instead of lagging it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0vh", "26vh"]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.9, 0]);

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);
  // The meta row tracks the title's drift so the lockup stays intact while fading.
  const metaOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      data-nav-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseMove={onTiltMove}
      onMouseLeave={onTiltLeave}
    >
      {/* Light photo underneath, dark dotted overlay revealed by cursor.
          Wrapped in a perspective stage so it tilts toward the pointer;
          slightly overscaled to keep edges hidden while leaning. */}
      <div className="absolute inset-0 z-0" style={{ perspective: 1100 }}>
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ rotateX: tiltX, rotateY: tiltY, x: shiftX, y: shiftY, scale: 1.06 }}
        >
          <HeroReveal scale={bgScale} y={bgY} />
        </motion.div>
      </div>

      {/* Breathing ASCII starfield, counter-drifting for parallax depth */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{ x: starX, y: starY }}
      >
        <AsciiGlow />
      </motion.div>

      {/* Vignette for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(29,36,18,0.2) 0%, rgba(29,36,18,0) 55%)",
        }}
      />

      {/* Meta row + giant title, edge-aligned as one lockup */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center pt-16">
        {/* Width is set by the title, so the meta row spans exactly its edges. */}
        <div className="flex flex-col gap-4 md:gap-6">
          <motion.h1
            style={{
              y: titleY,
              scale: titleScale,
              opacity: titleOpacity,
              fontSize: "clamp(76px, 15vw, 250px)",
              lineHeight: 0.9,
              letterSpacing: "-0.025em",
              textShadow: "0 6px 40px rgba(20,30,10,0.35)",
            }}
            className="font-serif-it text-cream text-center whitespace-nowrap will-change-transform"
          >
            <SplitReveal by="word" delay={0.35} stagger={0.09} immediate className="block">
              {"MHACKS 2026"}
            </SplitReveal>
          </motion.h1>

          <motion.div
            style={{ opacity: metaOpacity, y: titleY }}
            className="flex flex-wrap items-baseline justify-between gap-x-16 gap-y-2 px-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }}
            >
              <ScrambleText
                text="Build something that grows."
                replayOnHover
                speed={34}
                data-cursor="hover"
                className="pointer-events-auto text-cream text-[12px] md:text-[15px] font-medium uppercase tracking-[0.3em] [text-shadow:0_1px_12px_rgba(20,30,10,0.55)]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.3 }}
            >
              <ScrambleText
                text="October 3—4, 2026 · Ann Arbor, Michigan"
                replayOnHover
                speed={34}
                data-cursor="hover"
                className="pointer-events-auto text-cream text-right text-[12px] md:text-[15px] font-medium uppercase tracking-[0.3em] [text-shadow:0_1px_12px_rgba(20,30,10,0.55)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        style={{ opacity: metaOpacity }}
        className="absolute left-1/2 bottom-10 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span
          className="rounded-pill border border-white/40 bg-[rgba(29,36,18,0.55)] px-3 py-1 text-cream backdrop-blur-sm"
          style={{
            fontFamily: "var(--font-red-hat-mono)",
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <motion.span
          aria-hidden
          className="block h-7 w-px bg-cream/90"
          animate={{ scaleY: [0.3, 1, 0.3], transformOrigin: "top" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
