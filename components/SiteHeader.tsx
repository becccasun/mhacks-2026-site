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
  // Flip the nav to dark variants while it floats over light sections.
  const onLight = useNavTheme() === "light";

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.38, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-[50] pointer-events-none",
        "px-4 md:px-8 pt-5 md:pt-6",
      )}
    >
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between pointer-events-auto">
        {/* Logo - left */}
        <div
          className="relative z-[2] transition-[filter] duration-500"
          style={{
            filter: onLight
              ? "brightness(0.3) saturate(1.3) drop-shadow(0 1px 8px rgba(245,241,222,0.4))"
              : "drop-shadow(0 2px 14px rgba(0,0,0,0.4))",
          }}
        >
          <Logo size={64} priority />
        </div>

        {/* Nav - centered */}
        <div className="absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2">
          <PillNav
            className="transition-[background,border-color,box-shadow] duration-300"
            style={
              onLight
                ? {
                    background: "rgba(245, 241, 222, 0.92)",
                    borderColor: "rgba(29, 36, 18, 0.24)",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.6) inset, 0 8px 30px rgba(29,36,18,0.14)",
                  }
                : undefined
            }
          />
        </div>

        {/* Sponsor us + Apply - right */}
        <div className="relative z-[2] flex shrink-0 items-center gap-3">
          <Button
            href="#sponsors"
            variant="glass"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              scrollToHash("#sponsors");
            }}
            className={cn(
              "transition-[color,text-shadow,background,box-shadow] duration-300",
              onLight && "lg-on-light",
            )}
            style={
              onLight
                ? { color: "var(--moss-900)", textShadow: "none" }
                : undefined
            }
          >
            Sponsor us
          </Button>
          <Button
            href="#apply"
            variant="glass"
            size="md"
            className={cn(
              "transition-[color,text-shadow,background,box-shadow] duration-300",
              onLight && "lg-on-light",
            )}
            style={
              onLight
                ? { color: "var(--moss-900)", textShadow: "none" }
                : undefined
            }
          >
            Apply
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
