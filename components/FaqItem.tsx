"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  q: string;
  a: string;
}

export function FaqItem({ value, q, a }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Accordion.Item
      value={value}
      className="overflow-hidden rounded-md border border-border bg-white"
      onKeyDown={() => {}}
    >
      <Accordion.Header asChild>
        <Accordion.Trigger
          onClick={() => setOpen((v) => !v)}
          className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[17px] font-medium text-ink"
          data-cursor="hover"
        >
          <span>{q}</span>
          <motion.span
            animate={{ rotate: open ? 45 : 0, backgroundColor: open ? "#3A4A26" : "transparent", color: open ? "#EFE9D4" : "#5D6B3A" }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border border-border font-mono text-[14px]"
          >
            +
          </motion.span>
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content forceMount>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className={cn("overflow-hidden")}
            >
              <div className="px-6 pb-6 text-[15px] leading-[1.6] text-[#3d4730]">{a}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </Accordion.Content>
    </Accordion.Item>
  );
}
