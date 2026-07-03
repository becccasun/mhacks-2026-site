"use client";

import { useEffect, useState } from "react";

/**
 * Tone of the background currently sitting under the fixed header, driven by
 * `data-nav-theme="light" | "dark"` attributes on page sections. Sampled at
 * `probeY` px from the viewport top. Between tagged sections (e.g. gradient
 * bridges) the previous tone is kept to avoid flicker.
 */
export function useNavTheme(probeY = 72): "dark" | "light" {
  const [tone, setTone] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const update = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          setTone(el.dataset.navTheme === "light" ? "light" : "dark");
          return;
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [probeY]);

  return tone;
}
