export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-100" />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-base-blue/5 blur-[120px] pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-base-blue/8 blur-[80px] animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-base-light/8 blur-[60px] animate-pulse-slow" style={{ animationDelay: '2s' }} />

      {/* Animated neural network lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 1440 900">
          <defs>
            <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1652F0" stopOpacity="1" />
              <stop offset="100%" stopColor="#1652F0" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Neural lines */}
          <line x1="200" y1="150" x2="500" y2="300" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="500" y1="300" x2="800" y2="200" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="800" y1="200" x2="1100" y2="350" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="300" y1="500" x2="600" y2="400" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="600" y1="400" x2="900" y2="500" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="900" y1="500" x2="1200" y2="400" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="500" y1="300" x2="600" y2="400" stroke="#1652F0" strokeWidth="0.8" />
          <line x1="800" y1="200" x2="900" y2="500" stroke="#1652F0" strokeWidth="0.8" />
          {/* Nodes */}
          {[
            [200, 150], [500, 300], [800, 200], [1100, 350],
            [300, 500], [600, 400], [900, 500], [1200, 400],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#1652F0" fillOpacity="0.8" />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="tag-base">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="4" />
            </svg>
            Powered by Base Chain
          </span>
          <span className="tag-base">
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            via Clanker
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.95]">
          <span className="gradient-text">The AI Intelligence</span>
          <br />
          <span className="blue-gradient-text">Layer on Base</span>
        </h1>

        {/* Sub headline */}
        <p className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
          Alcreon deploys autonomous neural agents on-chain, enabling intelligent token creation, 
          decentralized inference, and real-time market cognition — all natively on{' '}
          <span className="text-base-light font-medium">Base</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="https://clanker.world"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4 text-lg w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Launch Token on Base
          </a>
          <a
            href="#features"
            className="btn-outline text-base px-8 py-4 text-lg w-full sm:w-auto justify-center"
          >
            Explore Protocol
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {[
            { value: '$2.4B+', label: 'TVL on Base' },
            { value: '148K+', label: 'Tokens Launched' },
            { value: '99.9%', label: 'Uptime' },
            { value: '<0.3s', label: 'Inference Latency' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black blue-gradient-text">{stat.value}</div>
              <div className="text-white/40 text-xs font-mono uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs font-mono">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
