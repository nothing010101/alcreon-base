import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import Intelligence from './components/Intelligence'
import HowItWorks from './components/HowItWorks'
import LaunchCTA from './components/LaunchCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900 overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Intelligence />
        <HowItWorks />
        <LaunchCTA />
      </main>
      <Footer />
    </div>
  )
}
