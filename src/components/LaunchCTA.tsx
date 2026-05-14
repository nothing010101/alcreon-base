export default function LaunchCTA() {
  return (
    <section id="launches" className="relative border-t border-white/[0.08] bg-[#060a10] py-16 md:py-24 overflow-hidden">
      {/* Subtle blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-base-blue/8 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="label-mono mb-4">Ready to broadcast</p>
          <h2 className="font-serif text-white leading-[1.08] tracking-tight mb-5" style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}>
            Your token.<br />
            <em>On Base. In minutes.</em>
          </h2>
          <p className="text-white/50 font-body text-lg mb-10 leading-relaxed">
            No auditor. No whitelist. No barrier between your idea and a live, liquid token on the fastest-growing chain in crypto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://clanker.world"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-base-blue text-white text-[0.9375rem] font-medium rounded-lg hover:bg-base-light transition-colors duration-200 active:scale-95"
            >
              Launch on Clanker
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="https://base.org"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-white/60 text-[0.9375rem] font-medium rounded-lg border border-white/[0.1] hover:border-white/20 hover:text-white transition-colors duration-200"
            >
              Learn about Base
            </a>
          </div>

          <p className="mt-6 label-mono">Non-custodial · Audited · Permissionless</p>
        </div>
      </div>
    </section>
  )
}
