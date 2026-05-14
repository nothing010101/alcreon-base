const points = [
  {
    number: '01',
    title: 'Permissionless by design',
    body: 'Clanker requires no whitelist, no KYC, no gatekeepers. Any wallet can deploy a fully compliant ERC-20 token with instant Uniswap v3 liquidity in a single transaction on Base.',
  },
  {
    number: '02',
    title: 'Social-native token primitives',
    body: 'Tokens launched via Farcaster frames and Warpcast integrations inherit built-in distribution. Alcreon tracks which social signals translate into lasting on-chain value.',
  },
  {
    number: '03',
    title: 'The Base liquidity advantage',
    body: "Base's low fees and Coinbase-backed infrastructure make it the highest-signal environment for token discovery. The data shows 60-day retention 3× higher than comparable L2 launches.",
  },
]

export default function Intelligence() {
  return (
    <section id="intelligence" className="relative bg-[#060a10] py-16 md:py-28 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left */}
          <div className="lg:sticky lg:top-24">
            <p className="label-mono mb-3">Why Base. Why now.</p>
            <h2 className="font-serif text-white leading-[1.1] tracking-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
              The signal is clear.<br />
              <em>The noise is not.</em>
            </h2>
            <p className="text-white/50 font-body text-[1.0625rem] leading-relaxed mb-8 max-w-md">
              Alcreon exists because token launches on Base have reached an inflection point — and most participants are flying blind. We provide the independent analysis that serious launchers rely on.
            </p>
            <a
              href="https://clanker.world"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base-light text-sm font-medium hover:text-white transition-colors group"
            >
              Launch on Clanker
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right */}
          <div className="space-y-0 divide-y divide-white/[0.07]">
            {points.map((p) => (
              <div key={p.number} className="py-8 first:pt-0">
                <div className="flex gap-6">
                  <span className="font-mono text-xs text-white/20 pt-1 flex-shrink-0 w-6">{p.number}</span>
                  <div>
                    <h3 className="font-serif text-white text-xl mb-3 tracking-tight">{p.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
