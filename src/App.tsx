import AsciiBackground from './components/AsciiBackground'
import Preloader from './components/Preloader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import About from './components/About'
import Tracks from './components/Tracks'
import StatsBand from './components/StatsBand'
import KeyDates from './components/KeyDates'
import Sponsors from './components/Sponsors'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <AsciiBackground />
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Tracks />
        <StatsBand />
        <KeyDates />
        <Sponsors />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
