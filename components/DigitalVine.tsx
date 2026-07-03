"use client";

import { MotionValue, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useMemo } from "react";

interface Props {
  className?: string;
  /**
   * Total intrinsic length of the path in the SVG's coord system. Used to
   * animate stroke-dashoffset. Recompute if the path is edited.
   */
  totalLength?: number;
}

interface Node {
  cx: number;
  cy: number;
  progress: number;
}

function BloomNode({ node, smooth }: { node: Node; smooth: MotionValue<number> }) {
  const nodeScale = useTransform(smooth, [node.progress - 0.05, node.progress + 0.08], [0, 1]);
  const nodeOpacity = useTransform(smooth, [node.progress - 0.05, node.progress + 0.02], [0, 1]);
  return (
    <motion.g style={{ opacity: nodeOpacity }}>
      <motion.circle
        cx={node.cx}
        cy={node.cy}
        r="1.2"
        fill="rgba(232,211,90,0.9)"
        style={{ scale: nodeScale, transformOrigin: `${node.cx}px ${node.cy}px` }}
        vectorEffect="non-scaling-stroke"
      />
      <motion.circle
        cx={node.cx}
        cy={node.cy}
        r="3.5"
        fill="none"
        stroke="rgba(232,211,90,0.4)"
        strokeWidth="0.3"
        style={{ scale: nodeScale, transformOrigin: `${node.cx}px ${node.cy}px` }}
        vectorEffect="non-scaling-stroke"
      />
    </motion.g>
  );
}

/**
 * A continuous "digital vine" that threads through the full document. Rendered
 * as an absolutely-positioned SVG that spans the whole <main>. As the user
 * scrolls the page, the vine draws itself top-to-bottom, then blooms nodes at
 * each anchor point (roughly one per section).
 *
 * The path uses a stretched viewBox (100 wide  500 tall) with
 * `preserveAspectRatio="none"` so the vine adapts to any page height.
 */
export function DigitalVine({ className, totalLength = 1400 }: Props) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  const dashOffset = useTransform(smooth, [0, 0.95], [totalLength, 0]);

  const path = useMemo(
    () =>
      // Serpentine path from top to bottom of the doc  the S-curves are
      // placed to loosely align with section breakpoints:
      //  - hero ~ 0100
      //  - about ~ 100220
      //  - sponsors ~ 220330
      //  - faq ~ 330440
      //  - footer ~ 440500
      [
        "M 62 0",
        "C 82 40, 20 70, 40 110",
        "C 62 145, 90 175, 60 215",
        "C 30 250, 82 275, 55 315",
        "C 20 350, 90 380, 55 420",
        "C 25 450, 70 475, 50 500",
      ].join(" "),
    [],
  );

  const nodes: Node[] = [
    { cx: 50, cy: 110, progress: 0.2 },
    { cx: 60, cy: 215, progress: 0.4 },
    { cx: 55, cy: 315, progress: 0.6 },
    { cx: 55, cy: 420, progress: 0.8 },
  ];

  return (
    <div
      className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden ${className ?? ""}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 100 500"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ mixBlendMode: "overlay", opacity: 0.9 }}
      >
        <defs>
          <linearGradient id="vineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(239,233,212,0.85)" />
            <stop offset="0.35" stopColor="rgba(189,197,154,0.9)" />
            <stop offset="0.7" stopColor="rgba(232,211,90,0.7)" />
            <stop offset="1" stopColor="rgba(189,197,154,0.9)" />
          </linearGradient>
        </defs>

        <path
          d={path}
          stroke="rgba(239,233,212,0.15)"
          strokeWidth="0.35"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        <motion.path
          d={path}
          stroke="url(#vineGradient)"
          strokeWidth="0.7"
          fill="none"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray={totalLength}
          style={{ strokeDashoffset: dashOffset }}
        />

        {nodes.map((n, i) => (
          <BloomNode key={i} node={n} smooth={smooth} />
        ))}
      </svg>
    </div>
  );
}
