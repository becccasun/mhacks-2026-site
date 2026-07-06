import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Sponsors } from "./sections/Sponsors";
import { Faq } from "./sections/Faq";
import { Social } from "./sections/Social";
import { StayInTheLoop } from "./sections/StayInTheLoop";
import { Footer } from "./sections/Footer";
import { StackedPages } from "@/components/StackedPages";

/**
 * Sections stack like sheets of paper: each one overlaps the previous with
 * rounded top corners and an ascending z-index (set inside each section),
 * ending with the footer as the last sheet. StackedPages pins each sheet in
 * place once fully in view so the next one slides over it (see the component
 * for the mechanics).
 */
export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Sponsors />
      <Faq />
      <Social />
      <StayInTheLoop />
      <Footer />
      <StackedPages />
    </main>
  );
}
