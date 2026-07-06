"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";

const CHARS = "!<>-_\\/[]{}=+*^?#0123456789ABCDEFHIJKLMNOPRSTUVWXYZ";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
  speed?: number;
  once?: boolean;
  /** Re-run the decrypt animation whenever the pointer enters. */
  replayOnHover?: boolean;
  /** Fraction of the element that must be visible to trigger (0–1). */
  threshold?: number;
  /** Render blank until the decrypt starts (avoids flashing the real text). */
  startEmpty?: boolean;
  /** External trigger; when set it replaces the in-view trigger entirely. */
  play?: boolean;
}

/**
 * Typewriter-decrypt effect: characters resolve left to right, each one
 * cycling through random glyphs before landing on the real letter. Plays
 * when scrolled into view, and again on hover when `replayOnHover` is set.
 */
export function ScrambleText({
  text,
  className,
  speed = 40,
  once = true,
  replayOnHover = false,
  threshold = 0.6,
  startEmpty = false,
  play,
  ...rest
}: Props) {
  const [display, setDisplay] = useState(() =>
    startEmpty ? text.replace(/\S/g, " ") : text,
  );
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold });
  const played = useRef(false);
  const animating = useRef(false);
  const timer = useRef(0);

  const run = () => {
    if (animating.current) return;
    animating.current = true;

    const target = text;
    const frames = Math.max(target.length * 2, 20);
    let frame = 0;

    const step = () => {
      frame++;
      const out = target
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const progress = (frame - i * 1.2) / (frames - i);
          if (progress >= 1) return ch;
          if (progress < 0) return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setDisplay(out);
      if (frame >= frames) {
        setDisplay(target);
        animating.current = false;
        return;
      }
      timer.current = window.setTimeout(step, speed);
    };

    step();
  };

  useEffect(() => {
    const trigger = play ?? inView;
    if (!trigger) return;
    if (once && played.current) return;
    played.current = true;
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, play, text, speed, once]);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <span
      ref={ref}
      className={cn("inline-block whitespace-pre", className)}
      onMouseEnter={replayOnHover ? run : undefined}
      {...rest}
    >
      {display}
    </span>
  );
}
