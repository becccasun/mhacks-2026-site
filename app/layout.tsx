import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Instrument_Sans, Red_Hat_Display, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { SiteHeader } from "@/components/SiteHeader";
import { LiquidGlassFilter } from "@/components/LiquidGlassFilter";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-red-hat-display",
  display: "swap",
});

const redHatMono = Red_Hat_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-red-hat-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mhacks.org"),
  title: "MHacks 2026 · Digital Garden",
  description:
    "MHacks is the University of Michigan's flagship hackathon. 24 hours of building at the intersection of nature and technology. Ann Arbor, Fall 2026.",
  openGraph: {
    title: "MHacks 2026 · Digital Garden",
    description:
      "The University of Michigan's flagship hackathon. Build something that grows.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3A4A26",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} ${redHatDisplay.variable} ${redHatMono.variable}`}
    >
      <body className="grain">
        <LiquidGlassFilter />
        <SmoothScroll>
          <SiteHeader />
          {children}
        </SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
