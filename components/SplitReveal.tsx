"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { ElementType } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  by?: "word" | "line";
  once?: boolean;
  /** Animate on mount instead of waiting for scroll into view. Use for above-the-fold hero copy. */
  immediate?: boolean;
}

/**
 * Line/word reveal with clip-path masks. Each token slides up from below
 * a hidden overflow line. Pair with hero display copy for editorial motion.
 */
export function SplitReveal({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.055,
  by = "word",
  once = true,
  immediate = false,
}: Props) {
  const reduced = useReducedMotion();
  const tokens = by === "word" ? children.split(/(\s+)/) : children.split("\n");

  const container: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const item: Variants = {
    initial: { y: reduced ? "0%" : "115%" },
    animate: {
      y: "0%",
      transition: { duration: reduced ? 0 : 0.9, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  return (
    <Tag className={cn(className)}>
      <motion.span
        className="inline"
        variants={container}
        initial="initial"
        {...(immediate
          ? { animate: "animate" }
          : { whileInView: "animate", viewport: { once, amount: 0.4 } })}
      >
        {tokens.map((token, i) => {
          if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
          return (
            <span
              key={i}
              className="reveal-line"
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
            >
              <motion.span variants={item} className="inline-block will-change-transform">
                {token}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
