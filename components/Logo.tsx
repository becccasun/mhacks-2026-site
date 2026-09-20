"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { scrollToHash } from "@/lib/scroll";
import { asset } from "@/lib/asset";

interface Props {
  size?: number;
  className?: string;
  imageClassName?: string;
  href?: string;
  priority?: boolean;
}

export function Logo({
  size = 44,
  className,
  imageClassName,
  href = "#top",
  priority = false,
}: Props) {
  // Off the home page, hash targets don't exist — route back to the home
  // page (with the page transition) instead of a dead in-page anchor.
  const onHome = usePathname() === "/";

  const img = (
    <Image
      src={asset("/logos/mhacks-logo.png")}
      alt="MHacks"
      width={size}
      height={size}
      priority={priority}
      className={cn("h-full w-full object-contain", imageClassName)}
    />
  );

  if (!href) {
    return (
      <span
        className={cn("inline-flex shrink-0 items-center justify-center", className)}
        style={{ width: size, height: size }}
      >
        {img}
      </span>
    );
  }

  return (
    <Link
      href={href.startsWith("#") && !onHome ? `/${href}` : href}
      aria-label="MHacks home"
      data-cursor="hover"
      onClick={(e) => {
        if (href.startsWith("#") && onHome) {
          e.preventDefault();
          scrollToHash(href);
        }
      }}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {img}
    </Link>
  );
}
