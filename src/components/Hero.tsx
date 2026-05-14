export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100svh' }}>
      {/* Background landscape */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.85)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060a10] via-[#060a10]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a10]/60 via-transparent to-transparent" />
        {/* Base blue tint overlay — the "Base" touch */}
        <div className="absolute inset-0 bg-gradient-to-tr from-base-blue/10 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-0">
        {/* Text block — sits above the TV */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 md:pb-16">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
            <span className="base-badge">
              <svg className="w-2.5 h-2.5 animate-pulse" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5" />
              </svg>
              Base Chain
            </span>
            <span className="label-mono">via Clanker</span>
          </div>

          {/* Headline — Instrument Serif like original */}
          <h1
            className="font-serif text-white leading-[1.04] tracking-[-0.02em] mb-5 animate-fade-up"
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              animationDelay: '0.35s',
              opacity: 0,
              animationFillMode: 'forwards'
            }}
          >
            Independent intelligence<br />
            <em>on Base</em>
          </h1>

          {/* Sub */}
          <p
            className="text-white/60 font-body text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}
          >
            Analysis, launches, and on-chain signal for the most important tokens on Base — powered by Clanker.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: '0.65s', opacity: 0, animationFillMode: 'forwards' }}
          >
            <a
              href="https://clanker.world"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-base-blue text-white text-[0.9375rem] font-medium rounded-lg hover:bg-base-light transition-colors duration-200 active:scale-95"
            >
              Launch your token
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#tokens"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white/70 text-[0.9375rem] font-medium rounded-lg hover:text-white hover:bg-white/5 transition-colors duration-200"
            >
              Explore launches
            </a>
          </div>
        </div>

        {/* Foreground TV — centered at the bottom */}
        <div
          className="relative w-full flex justify-center animate-fade-in"
          style={{ animationDelay: '0.8s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <img
            src="/hero-fg.webp"
            alt="Vintage TV on a hill — the signal of intelligence on Base"
            className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl object-contain mx-auto"
            style={{ marginBottom: '-2px' }}
          />
        </div>
      </div>
    </section>
  )
}
