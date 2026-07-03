"use client";

import { motion } from "framer-motion";

interface Props {
  /** Placeholder count until real images arrive. */
  count?: number;
  className?: string;
}

/**
 * Continuous right-to-left image marquee. The strip is rendered twice and
 * translated by half its width on a linear loop, so it scrolls seamlessly.
 * Swap the placeholder cells for <img>/<Image> once assets are supplied.
 */
export function ImageCarousel({ count = 8, className }: Props) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max gap-5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-5" aria-hidden={copy === 1}>
            {Array.from({ length: count }).map((_, i) => (
              <div
                key={i}
                className="flex h-[200px] md:h-[240px] aspect-[4/3] items-center justify-center rounded-md border border-border bg-white/45"
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-moss-500">
                  IMG {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
