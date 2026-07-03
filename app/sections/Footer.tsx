"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { scrollToHash } from "@/lib/scroll";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:hello@mhacks.org" },
];

const MARQUEE_WORDS = [
  "Ann Arbor",
  "Digital Garden",
  "Design",
  "Fall 2026",
  "Engineering",
  "Coffee & Code",
  "Building",
];

export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative z-[8] -mt-14 md:-mt-20 overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-moss-700 text-cream"
    >
      {/* Marquee */}
      <div className="border-b border-cream/10 py-6 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-16 font-serif-it text-cream/70"
          style={{ fontSize: 48, lineHeight: 1 }}
        >
          {Array.from({ length: 2 }).flatMap((_, r) =>
            MARQUEE_WORDS.map((w, i) => (
              <span key={`${r}-${i}`} className="inline-flex items-center gap-16">
                {w}
                <span className="text-cream/30" aria-hidden>
                  ✽
                </span>
              </span>
            )),
          )}
        </motion.div>
      </div>

      <div className="px-6 md:px-[8vw] py-14 grid gap-10 md:grid-cols-[1fr_auto_1fr] items-center">
        <Logo size={72} className="opacity-95 hover:opacity-100 md:justify-self-start" />
        <nav className="flex flex-wrap gap-6 text-[14px] opacity-85 md:justify-center">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:opacity-100 hover:underline underline-offset-4 opacity-85"
              data-cursor="hover"
              onClick={(e) => {
                if (l.href.startsWith("#")) {
                  e.preventDefault();
                  scrollToHash(l.href);
                }
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="text-[13px] text-cream/70 font-mono md:justify-self-end md:text-right">
          © 2026 MHacks · Ann Arbor
        </div>
      </div>
    </footer>
  );
}
