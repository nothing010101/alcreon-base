const steps = [
  {
    number: '01',
    title: 'Connect & Authenticate',
    description:
      'Connect your Base wallet. Alcreon\'s identity layer verifies your on-chain credentials and initializes your personalized AI inference context.',
    detail: 'Supports MetaMask, Coinbase Wallet, Rainbow, and all EIP-4337 smart wallets.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Configure Token with AI',
    description:
      'Alcreon\'s neural engine analyzes market conditions in real-time and recommends optimal tokenomics: supply curve, liquidity depth, emission schedule, and community allocation.',
    detail: 'AI-suggested parameters are fully customizable before deployment.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Launch via Clanker',
    description:
      'One click deploys your token on Base through Clanker\'s audited smart contract infrastructure — with instant liquidity, automatic LP provisioning, and zero trust assumptions.',
    detail: 'Clanker\'s contracts are audited and battle-tested across thousands of launches.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'AI Monitors & Adapts',
    description:
      'Post-launch, Alcreon\'s agents continuously monitor your token\'s performance, liquidity health, and holder sentiment — proactively surfacing insights and executing pre-approved strategies.',
    detail: 'Set strategy guardrails and let autonomous agents handle the rest.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/30 to-dark-900" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="tag-base mb-4 inline-flex">Protocol Flow</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="gradient-text">From idea to</span>
            <br />
            <span className="blue-gradient-text">on-chain in minutes</span>
          </h2>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto">
            Alcreon removes every barrier between your vision and a live token on Base. 
            AI handles the complexity. You keep the control.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-base-blue/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="card-glass p-6 h-full flex flex-col">
                  {/* Number + icon */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-base-blue/15 border border-base-blue/30 flex items-center justify-center text-base-light group-hover:bg-base-blue/25 transition-colors">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-dark-800 border border-base-blue/40 flex items-center justify-center">
                        <span className="text-base-light text-[10px] font-mono font-bold">{i + 1}</span>
                      </div>
                    </div>
                    <span className="text-4xl font-black text-white/5 font-mono">{step.number}</span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 flex-1">{step.description}</p>
                  <div className="pt-4 border-t border-white/[0.06]">
                    <p className="text-base-light/70 text-xs font-mono">{step.detail}</p>
                  </div>
                </div>

                {/* Arrow connector (mobile/tablet) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-2">
                    <svg className="w-5 h-5 text-base-blue/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a
            href="https://clanker.world"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-lg px-10 py-4 inline-flex"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Start Launching Now
          </a>
          <p className="text-white/30 text-sm mt-3 font-mono">No setup fees · No KYC · Fully on-chain</p>
        </div>
      </div>
    </section>
  )
}
