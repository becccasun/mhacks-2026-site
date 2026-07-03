"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  tag?: string;
  src?: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
  index?: number;
  driftY?: number;
  imageFilter?: string;
}

/**
 * Hero photo card. Gently drifts (staggered per index), tilts toward the
 * cursor on hover via 3D transforms, and reveals with a translateY + opacity
 * fade on mount. Composited with a subtle glass border to sit convincingly on
 * top of the hero photograph.
 */
export function FloatingCard({
  tag,
  src,
  alt = "",
  className,
  children,
  index = 0,
  driftY = 8,
  imageFilter = "blur(2px) saturate(1.05)",
}: Props) {
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springX = useSpring(rotX, { stiffness: 120, damping: 14 });
  const springY = useSpring(rotY, { stiffness: 120, damping: 14 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotY.set(px * 10);
    rotX.set(-py * 10);
  };
  const onLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const dur = 6 + index * 1.2;
  const delay = 0.35 + index * 0.15;

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay }}
      style={{ perspective: 900 }}
      className={cn("absolute z-[3]", className)}
    >
      <motion.div
        animate={{ y: [0, -driftY, 0] }}
        transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        style={{
          transformStyle: "preserve-3d",
          rotateX: springX,
          rotateY: springY,
        }}
        className="relative h-full w-full overflow-hidden rounded-[6px] border border-white/60 bg-white/15 shadow-e-glass backdrop-blur-[4px]"
        data-cursor="hover"
      >
        {tag ? (
          <span
            className="absolute left-2 top-2 z-[2] rounded-[4px] bg-cream px-2 py-[3px] font-mono text-[11px] tracking-wide text-ink"
            style={{ fontFamily: "var(--font-red-hat-mono)" }}
          >
            {tag}
          </span>
        ) : null}
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="240px"
            className="object-cover"
            style={{ filter: imageFilter }}
          />
        ) : null}
        {children}
      </motion.div>
    </motion.div>
  );
}
