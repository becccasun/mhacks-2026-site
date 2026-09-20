"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * "hero" while the scroll position is above the hero's midpoint, "page" once
 * it passes halfway through the hero. Deterministic single boundary — the
 * frosted nav bar is on for everything below that midpoint, and the
 * transparent hero variant is guaranteed by the time you're back at the top.
 *
 * The hero is looked up on every check (not captured once): the header
 * outlives page navigations, so a cached element goes stale as soon as the
 * user visits /how-to-mcp and comes back — which used to leave the frosted
 * bar stuck on over the hero. Subpages have no hero and are always "page".
 */
export function useNavTheme(fraction = 0.5): "hero" | "page" {
  const [zone, setZone] = useState<"hero" | "page">("hero");
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const hero = pathname === "/" ? document.getElementById("top") : null;
      if (!hero) {
        setZone("page");
        return;
      }
      // The hero is sticky-pinned under the page stack, so its bounding rect
      // never moves once pinned — judge by scroll position against its flow
      // height instead.
      setZone(window.scrollY < hero.offsetHeight * fraction ? "hero" : "page");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [fraction, pathname]);

  return zone;
}
