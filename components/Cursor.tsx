"use client";

import { useEffect, useRef, useState } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  // Over [data-cursor-box] hosts the ring morphs into an annotation-style
  // bounding box with a label (object-detection look).
  const [boxLabel, setBoxLabel] = useState<string | null>(null);

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
      const boxHost = el.closest<HTMLElement>("[data-cursor-box]");
      setBoxLabel(!interactive && boxHost ? boxHost.dataset.cursorBox || null : null);
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
            "width 260ms var(--ease-soft), height 260ms var(--ease-soft), border-radius 260ms var(--ease-soft), border-color 260ms, background 260ms, opacity 260ms",
          width: boxLabel ? 300 : hovering ? 56 : 34,
          height: boxLabel ? 400 : hovering ? 56 : 34,
          borderRadius: boxLabel ? 2 : "999px",
          border: `1px solid ${
            boxLabel
              ? "rgba(245,241,222,0.95)"
              : hovering
              ? "rgba(239,233,212,0.95)"
              : "rgba(58,74,38,0.55)"
          }`,
          background: boxLabel
            ? "rgba(245,241,222,0.03)"
            : hovering
            ? "rgba(232,211,90,0.15)"
            : "rgba(239,233,212,0.06)",
          mixBlendMode: boxLabel ? "normal" : hovering ? "screen" : "multiply",
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Dither screen: offset light/dark dot grids over a contrast-crunched
            backdrop, so the framed region reads as "being processed" */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            backgroundImage: [
              "radial-gradient(circle, rgba(239,233,212,0.6) 0.6px, transparent 0.6px)",
              "radial-gradient(circle, rgba(29,36,18,0.55) 0.6px, transparent 0.6px)",
            ].join(", "),
            backgroundSize: "3px 3px, 3px 3px",
            backgroundPosition: "0 0, 1.5px 1.5px",
            mixBlendMode: "overlay",
            backdropFilter: boxLabel
              ? "contrast(1.2) saturate(0.8) brightness(1.05)"
              : "none",
            WebkitBackdropFilter: boxLabel
              ? "contrast(1.2) saturate(0.8) brightness(1.05)"
              : "none",
            opacity: boxLabel ? 0.9 : 0,
            transition: "opacity 260ms var(--ease-soft)",
          }}
        />

        {/* Center crosshair marking the true cursor position */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 14,
            height: 14,
            opacity: boxLabel ? 0.9 : 0,
            transition: "opacity 200ms var(--ease-soft)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "50%",
              height: 1,
              marginTop: -0.5,
              background: "rgba(245,241,222,0.95)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 1,
              marginLeft: -0.5,
              background: "rgba(245,241,222,0.95)",
            }}
          />
        </div>

        {/* Annotation tag sitting on the box's top-left edge */}
        <div
          style={{
            position: "absolute",
            bottom: "100%",
            left: -1,
            padding: "4px 8px 3px",
            background: "#F5F1DE",
            color: "#1D2412",
            fontFamily: "var(--font-instrument-sans), system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 500,
            lineHeight: 1,
            whiteSpace: "nowrap",
            opacity: boxLabel ? 1 : 0,
            transition: "opacity 200ms var(--ease-soft)",
          }}
        >
          {boxLabel ?? "You"}
        </div>
      </div>
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
          opacity: visible && !boxLabel ? 1 : 0,
        }}
      />
    </>
  );
}
