export const colors = {
  primaryBlue: "#3A5AD4",
  secondary: "#7A93C9",
  secondaryAlt: "#A8C08A",
  accentGreen: "#C9E07A",
  accentYellow: "#E8D35A",
  accentPink: "#E07A9A",
  moss: {
    900: "#1D2412",
    800: "#2C3A1C",
    700: "#3A4A26",
    500: "#5D6B3A",
    300: "#BDC59A",
  },
  cream: "#EFE9D4",
  parchment: "#F5F1DE",
} as const;

export const radii = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 22,
  pill: 999,
} as const;

export const ease = {
  soft: [0.2, 0.7, 0.2, 1] as [number, number, number, number],
  snap: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  linear: [0, 0, 1, 1] as [number, number, number, number],
} as const;

export const duration = {
  fast: 0.24,
  base: 0.32,
  slow: 0.6,
  ambient: 2.4,
} as const;

export const motion = {
  fadeUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: duration.slow, ease: ease.soft },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.slow, ease: ease.soft },
  },
  reveal: {
    initial: { y: "115%" },
    animate: { y: "0%" },
    transition: { duration: 0.9, ease: ease.snap },
  },
} as const;
