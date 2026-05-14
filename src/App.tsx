import Nav from './components/Nav'
import Hero from './components/Hero'
import SignalStrip from './components/SignalStrip'
import Launches from './components/Launches'
import Intelligence from './components/Intelligence'
import LaunchCTA from './components/LaunchCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <SignalStrip />
        <Launches />
        <Intelligence />
        <LaunchCTA />
      </main>
      <Footer />
    </div>
  )
}
