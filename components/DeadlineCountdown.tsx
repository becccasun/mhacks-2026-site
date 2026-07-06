"use client";

import { useEffect, useState } from "react";
import { getNextDeadline, getTimeParts } from "@/lib/deadlines";

/**
 * Live countdown pill to the next application deadline (see lib/deadlines.ts
 * for the schedule and backend handoff notes). Ticks every second. Renders an
 * invisible placeholder until mounted so the server and client markup match,
 * and renders nothing once every deadline has passed.
 */
export function DeadlineCountdown({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const next = now ? getNextDeadline(now) : null;

  // Pre-mount (SSR + first client render): reserve the pill's height so the
  // hero lockup doesn't shift when the timer appears.
  if (!now) return <div aria-hidden className="h-[30px]" />;
  if (!next) return null;

  const t = getTimeParts(new Date(next.date), now);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      role="timer"
      aria-label={`${next.countdownLabel} in ${t.days} days, ${t.hours} hours, ${t.minutes} minutes`}
      className={`inline-flex items-center rounded-pill border border-white/40 bg-[rgba(29,36,18,0.5)] px-4 py-1.5 backdrop-blur-sm ${className ?? ""}`}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {next.countdownLabel} in {t.days}d {pad(t.hours)}h {pad(t.minutes)}m {pad(t.seconds)}s
      </span>
    </div>
  );
}
