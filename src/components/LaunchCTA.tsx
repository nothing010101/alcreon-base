export default function LaunchCTA() {
  return (
    <section id="launch" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-900 to-dark-800" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Blue core glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-base-blue/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-base-blue/15 blur-[60px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">

        {/* Base logo badge */}
        <div className="inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-dark-700/80 border border-base-blue/30 rounded-full backdrop-blur-sm">
          <div className="w-6 h-6 rounded-full bg-base-blue flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white">
              <circle cx="12" cy="12" r="10" fill="#1652F0" />
              <path d="M12 6a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <span className="text-white/80 text-sm font-medium">Built on Base · Launched via Clanker</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>

        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-6">
          <span className="gradient-text">Your token.</span>
          <br />
          <span className="blue-gradient-text">AI-powered.</span>
          <br />
          <span className="text-white/90">Live on Base.</span>
        </h2>

        <p className="text-white/50 text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Stop waiting. Alcreon's neural launch engine + Clanker's battle-tested contracts 
          means your token goes from concept to on-chain in under 3 minutes. 
          No dev. No auditor. No gatekeepers.
        </p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            '⚡ Instant Liquidity',
            '🧠 AI-Optimized Params',
            '🔐 Audited Contracts',
            '📊 Real-time Analytics',
            '🤖 Autonomous Agents',
            '🌐 Base Native',
          ].map((chip) => (
            <span key={chip} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm font-medium">
              {chip}
            </span>
          ))}
        </div>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://clanker.world"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-base-blue text-white text-xl font-bold rounded-2xl
                       hover:bg-base-light transition-all duration-300 
                       shadow-[0_0_40px_rgba(22,82,240,0.4)] hover:shadow-[0_0_70px_rgba(22,82,240,0.7)]
                       active:scale-95 w-full sm:w-auto justify-center"
          >
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Launch on Clanker
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <p className="text-white/25 text-sm mt-6 font-mono">
          clanker.world · Powered by Alcreon Intelligence · Base Chain
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-white/[0.06]">
          {[
            { label: 'Audited', icon: '🔐' },
            { label: 'Open Source', icon: '📖' },
            { label: 'Non-Custodial', icon: '🔑' },
            { label: 'Base Native', icon: '🔵' },
            { label: 'Zero Fees', icon: '⚡' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-white/40 text-sm">
              <span>{badge.icon}</span>
              <span className="font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
