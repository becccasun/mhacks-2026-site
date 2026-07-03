"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

interface Props {
  to: number;
  duration?: number;
  className?: string;
}

export function CountUp({ to, duration = 1400, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {n.toLocaleString()}
    </span>
  );
}
