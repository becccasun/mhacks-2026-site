"use client";

import { Logo } from "@/components/Logo";
import { scrollToHash } from "@/lib/scroll";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "mailto:hello@mhacks.org" },
];

/* Dense film grain tile (SVG turbulence) — layered twice over the blurred
   backdrop so it reads like sun-bleached sandy paper. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Footer as the last sheet in the stack: rounded top corners over the
 * newsletter section. The backdrop is a heavily blurred pastel photo under
 * dense grain — soft pastels on sandy paper, with the pale text punching
 * through. (The giant MHACKS 2026 wordmark is removed for now.)
 */
export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="relative z-[10] -mt-14 md:-mt-20 overflow-hidden rounded-t-[40px] md:rounded-t-[48px] bg-moss-900 text-cream"
    >
      {/* Sandy-pastel backdrop: pre-blurred pastel photo, a soft tint for
          text contrast, then two passes of dense grain for the paper tooth. */}
      <div aria-hidden className="absolute inset-0">
        {/* Blur + grade are baked into the image — no live CSS filter, so the
            compositor never has to rebuild a giant blurred surface mid-scroll. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer/footer-pastel-soft.jpg"
          alt=""
          draggable={false}
          className="h-full w-full object-cover object-[68%_12%]"
        />
        {/* Tonal sweep: lighter band up top falling into deep olive shadow
            below-left, so the wash reads moody rather than uniform */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(130% 110% at 22% 95%, rgba(18,23,10,0.62) 0%, rgba(18,23,10,0) 58%)",
              "radial-gradient(90% 80% at 78% 8%, rgba(239,233,212,0.1) 0%, rgba(239,233,212,0) 55%)",
              "linear-gradient(180deg, rgba(29,36,18,0.3) 0%, rgba(29,36,18,0.34) 45%, rgba(24,30,14,0.58) 100%)",
            ].join(", "),
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            backgroundSize: "240px 240px",
            mixBlendMode: "overlay",
            opacity: 0.7,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: GRAIN,
            backgroundSize: "150px 150px",
            opacity: 0.16,
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[240px] flex-col justify-center px-6 py-14 md:min-h-[280px] md:px-[8vw] md:py-16">
        {/* Logo / pages / rights */}
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto_1fr]">
          <Logo
            size={64}
            className="justify-self-center drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] md:justify-self-start"
          />

          <nav
            className="flex flex-wrap justify-center gap-8 text-[15px] [text-shadow:0_1px_12px_rgba(29,36,18,0.45)]"
            aria-label="Footer"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="hover"
                className="opacity-85 transition-opacity hover:opacity-100 hover:underline underline-offset-4"
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

          <div className="justify-self-center font-mono text-[13px] text-cream [text-shadow:0_1px_12px_rgba(29,36,18,0.45)] md:justify-self-end md:text-right">
            © MHACKS 2026 · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
