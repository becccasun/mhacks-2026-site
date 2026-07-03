import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Sponsors } from "./sections/Sponsors";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";

/**
 * Sections stack like sheets of paper: each one overlaps the previous with
 * rounded top corners and an ascending z-index (set inside each section).
 */
export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <About />
      <Sponsors />
      <Faq />
      <Footer />
    </main>
  );
}
