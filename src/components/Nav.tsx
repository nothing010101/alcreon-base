import { useState, useEffect } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="10" fill="#1652F0" />
                <path d="M18 7L29 29H7L18 7Z" fill="white" fillOpacity="0.95" />
                <circle cx="18" cy="21" r="3.5" fill="#1652F0" />
              </svg>
              <div className="absolute inset-0 rounded-[10px] bg-base-blue opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-lg tracking-tight">Alcreon</span>
              <span className="text-base-light text-[10px] font-mono uppercase tracking-widest">on Base</span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: 'Protocol', href: '#features' },
              { label: 'Intelligence', href: '#intelligence' },
              { label: 'Launch', href: '#launch' },
              { label: 'Docs', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-base-blue/10 border border-base-blue/30 rounded-full">
              <div className="w-1.5 h-1.5 bg-base-blue rounded-full animate-pulse" />
              <span className="text-base-light text-xs font-mono font-medium">Base Chain</span>
            </div>
            <a
              href="https://clanker.world"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-4"
            >
              Launch Token
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-800/95 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="px-4 py-6 flex flex-col gap-4">
            {[
              { label: 'Protocol', href: '#features' },
              { label: 'Intelligence', href: '#intelligence' },
              { label: 'Launch', href: '#launch' },
              { label: 'Docs', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white/70 hover:text-white text-base font-medium py-1"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://clanker.world"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center mt-2"
            >
              Launch Token on Base
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
