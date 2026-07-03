"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isTouchDevice()) return;
    document.documentElement.classList.add("has-custom-cursor");
    return () => document.documentElement.classList.remove("has-custom-cursor");
  }, []);

  useEffect(() => {
    if (isTouchDevice()) return;
    if (prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: mouse.x, y: mouse.y };
    const ringPos = { x: mouse.x, y: mouse.y };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setVisible(true);
      start();
    };

    const onLeave = () => setVisible(false);

    const detectHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;
      const interactive =
        el.closest("a, button, [data-cursor='hover'], [role='button'], input, textarea, select") !== null;
      setHovering(interactive);
    };

    let raf = 0;
    let running = false;
    const tick = () => {
      dotPos.x += (mouse.x - dotPos.x) * 0.55;
      dotPos.y += (mouse.y - dotPos.y) * 0.55;
      ringPos.x += (mouse.x - ringPos.x) * 0.18;
      ringPos.y += (mouse.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;

      // Sleep once both trailers have caught up; onMove wakes the loop.
      if (Math.abs(mouse.x - ringPos.x) < 0.1 && Math.abs(mouse.y - ringPos.y) < 0.1) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", detectHover);
    document.addEventListener("mouseleave", onLeave);
    start();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", detectHover);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          transition:
            "width 260ms var(--ease-soft), height 260ms var(--ease-soft), border-color 260ms, background 260ms, opacity 260ms",
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          borderRadius: "999px",
          border: `1px solid ${hovering ? "rgba(239,233,212,0.95)" : "rgba(58,74,38,0.55)"}`,
          background: hovering ? "rgba(232,211,90,0.15)" : "rgba(239,233,212,0.06)",
          mixBlendMode: hovering ? "screen" : "multiply",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          transition: "width 200ms var(--ease-soft), height 200ms var(--ease-soft), background 200ms, opacity 200ms",
          width: hovering ? 6 : 4,
          height: hovering ? 6 : 4,
          borderRadius: "999px",
          background: hovering ? "#E8D35A" : "#3A4A26",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
