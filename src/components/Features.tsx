const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Neural Market Cognition',
    description:
      'Alcreon\'s inference engine continuously processes on-chain signals, mempool patterns, and liquidity flows to surface actionable intelligence before the market moves.',
    tag: 'Core AI',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Autonomous On-Chain Agents',
    description:
      'Deploy self-sovereign AI agents that operate 24/7 on Base — executing token strategies, managing liquidity, and adapting to real-time market conditions without human intervention.',
    tag: 'Agents',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'Decentralized Inference',
    description:
      'AI model weights distributed across the Base network — no centralized bottlenecks, no single point of failure. Intelligence that\'s as decentralized as the chain it runs on.',
    tag: 'Infrastructure',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Verified Intelligence Layer',
    description:
      'Every AI inference is cryptographically verifiable on-chain. Alcreon\'s ZK-proof system ensures model outputs are tamper-proof and auditable — trust the math, not the middleman.',
    tag: 'Security',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Collective Intelligence Network',
    description:
      'Alcreon aggregates signals from thousands of Base wallets and on-chain actors, forming a distributed intelligence mesh that gets smarter with every block.',
    tag: 'Network',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
      </svg>
    ),
    title: 'Dynamic Token Architecture',
    description:
      'Launch tokens that evolve. Alcreon\'s adaptive tokenomics engine adjusts supply mechanisms, emission curves, and liquidity parameters based on real-time AI signal processing.',
    tag: 'Token Design',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag-base mb-4 inline-flex">Protocol Architecture</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text">Intelligence, </span>
            <span className="blue-gradient-text">not automation</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Alcreon is not a bot. It's a cognitive layer — a neural substrate woven into Base 
            that transforms raw on-chain data into actionable market intelligence.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card-glass p-6 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-base-blue/15 border border-base-blue/25 flex items-center justify-center text-base-light group-hover:bg-base-blue/25 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <span className="text-xs text-base-light font-mono uppercase tracking-wider">{f.tag}</span>
                  <h3 className="text-white font-bold text-lg leading-tight mt-0.5">{f.title}</h3>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
