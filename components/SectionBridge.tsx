"use client";

import { cn } from "@/lib/utils";

interface Props {
  /** Top color (matches the section above). Accepts any valid CSS color. */
  from: string;
  /** Bottom color (matches the section below). Accepts any valid CSS color. */
  to: string;
  /** Height of the gradient bridge. Defaults to 160px. */
  height?: number;
  /** Optional ASCII / grain texture overlay strength (01). */
  atmosphere?: number;
  className?: string;
  /** Reveal a subtle animated pulse/glow along the seam. */
  glow?: boolean;
}

/**
 * A gradient "bridge" that sits between two sections and smooths the palette
 * hand-off. Instead of a hard color break, the bridge fades from the previous
 * section's dominant color into the next section's dominant color, with an
 * optional atmospheric grain and a subtle seam glow.
 */
export function SectionBridge({
  from,
  to,
  height = 160,
  atmosphere = 0.08,
  className,
  glow = false,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn("relative w-full overflow-hidden", className)}
      style={{
        height,
        background: `linear-gradient(180deg, ${from} 0%, ${from} 8%, ${to} 92%, ${to} 100%)`,
      }}
    >
      {/* Soft grain to break the linear-gradient banding */}
      {atmosphere > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: atmosphere,
            mixBlendMode: "overlay",
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.75'/></svg>\")",
          }}
        />
      )}

      {/* Soft seam glow  a very faint horizontal line where the two colors meet */}
      {glow && (
        <div
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(232,211,90,0.35) 30%, rgba(232,211,90,0.6) 50%, rgba(232,211,90,0.35) 70%, transparent)",
            filter: "blur(1px)",
          }}
        />
      )}
    </div>
  );
}
