"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

const ART = `        .,;:,.
     .:cloolc;.        ::          .:'
   ,looool::loc.     .clc.       .;ol.
  ;dxxxxoc::cool;.  .cool;.    .;loll'
 ,xkkkxoc:::clooll:.;loollc;..,clllll;
 lkkkxol:::ccclllllc::clllllllllllllc.
.dkkxolc:::ccccclllllcclllllllllllc'
'oxxolcc::::cccclllllllllllllllc;.
 :dolc::::::ccccccclllllllllll:.
 .:oolc::::ccccccccllllllll:.
   ,lol:::ccccclllllllll:.
    .:lc::ccclllllc:.
       ,::lllc:.
          ..

   nature × technology
   ────────────────────
   ascii kit · 2026
`;

export function AsciiField() {
  const { ref, inView } = useInView<HTMLPreElement>({ threshold: 0.3 });
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let id = 0;
    const step = () => {
      setI((v) => {
        const next = v + 8;
        if (next < ART.length) {
          id = window.setTimeout(step, 12);
        }
        return next;
      });
    };
    id = window.setTimeout(step, 200);
    return () => clearTimeout(id);
  }, [inView]);

  return (
    <motion.pre
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative overflow-hidden rounded-md border border-border bg-cream p-6 text-moss-700 shadow-[0_12px_40px_rgba(58,74,38,0.08)]"
      style={{
        fontFamily: "var(--font-red-hat-mono), ui-monospace, monospace",
        fontSize: 11,
        lineHeight: 1.05,
        whiteSpace: "pre",
      }}
      aria-hidden
    >
      <span className="absolute right-4 top-3 text-[10px] tracking-[0.15em] text-moss-500">FIELD / 0.1429</span>
      {ART.slice(0, i)}
      <span className="inline-block h-3 w-2 -mb-[2px] bg-moss-700 animate-pulse-soft" aria-hidden />
    </motion.pre>
  );
}
