"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { PillNav } from "@/components/PillNav";
import { Button } from "@/components/Button";
import { useScrollDirection } from "@/lib/useScrollDirection";
import { useNavTheme } from "@/lib/useNavTheme";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const visible = useScrollDirection({ threshold: 6, minScroll: 80 });
  // On the hero: transparent header, glass pills, cream text. Past it: one
  // frosted bar across the whole nav, pills removed, dark text + dark logo.
  const frosted = useNavTheme() !== "hero";

  return (
    <motion.header
      data-cursor-zone
      initial={false}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-[50] pointer-events-none",
        "px-4 md:px-8 pt-5 md:pt-6",
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex max-w-[1440px] items-center justify-between pointer-events-auto",
          "transition-[background,border-color,box-shadow,backdrop-filter] duration-300",
          "rounded-2xl border px-3 py-2 md:px-4",
          frosted
            ? "border-white/50 bg-[rgba(245,241,222,0.6)] shadow-[0_10px_34px_rgba(29,36,18,0.14)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        {/* Logo - left; always white, regardless of zone */}
        <div
          className="relative z-[2]"
          style={{
            filter:
              "brightness(0) invert(1) drop-shadow(0 1px 6px rgba(29,36,18,0.45))",
          }}
        >
          <Logo size={44} priority />
        </div>

        {/* Nav - centered; pill container dissolves on the frosted bar */}
        <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
          <PillNav
            className="transition-[background,border-color,box-shadow] duration-300"
            style={
              frosted
                ? {
                    background: "transparent",
                    borderColor: "transparent",
                    boxShadow: "none",
                    backdropFilter: "none",
                    WebkitBackdropFilter: "none",
                  }
                : undefined
            }
          />
        </div>

        {/* Sponsor us + Apply - right; glass pills dissolve to dark text */}
        <div className="relative z-[2] flex shrink-0 items-center gap-1 md:gap-2">
          <Button
            href="#sponsors"
            variant={frosted ? "ghost" : "glass"}
            size="md"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#sponsors");
            }}
          >
            Sponsor us
          </Button>
          <Button href="#apply" variant={frosted ? "ghost" : "glass"} size="md">
            Apply
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
