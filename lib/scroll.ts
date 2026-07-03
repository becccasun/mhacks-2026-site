import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** Called by SmoothScroll so anchor navigation can drive the Lenis instance. */
export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Animated scroll to an in-page anchor (e.g. "#about"). */
export function scrollToHash(hash: string) {
  if (lenis) {
    lenis.scrollTo(hash, {
      duration: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
    return;
  }
  // No Lenis (reduced motion): jump without animation.
  document.querySelector(hash)?.scrollIntoView();
}
