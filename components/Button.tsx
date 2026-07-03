"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { useMagnetic } from "@/lib/useMagnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "accent" | "cream" | "glass";
type Size = "sm" | "md" | "lg";

interface Props extends Omit<HTMLMotionProps<"a">, "ref"> {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  href?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-moss-700 text-cream hover:bg-moss-800",
  secondary: "bg-cream text-ink hover:bg-white",
  outline: "border border-border-strong text-moss-700 hover:bg-moss-700/10",
  ghost: "text-moss-700 hover:bg-moss-700/10",
  accent: "bg-sun text-moss-900 hover:brightness-95",
  cream: "bg-cream text-moss-700 hover:bg-white",
  glass:
    "liquid-glass text-cream font-semibold [text-shadow:0_1px_8px_rgba(20,30,10,0.45)]",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-[13px]",
  md: "px-6 py-3 text-[15px]",
  lg: "px-7 py-4 text-[16px]",
};

export const Button = forwardRef<HTMLAnchorElement, Props>(function Button(
  { variant = "primary", size = "md", magnetic = false, className, children, href = "#", ...rest },
  _ref,
) {
  const magRef = useMagnetic<HTMLAnchorElement>();

  return (
    <motion.a
      href={href}
      ref={magnetic ? magRef : undefined}
      data-cursor="hover"
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </motion.a>
  );
});
