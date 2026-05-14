export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="36" height="36" rx="10" fill="#1652F0" />
                  <path d="M18 7L29 29H7L18 7Z" fill="white" fillOpacity="0.95" />
                  <circle cx="18" cy="21" r="3.5" fill="#1652F0" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-lg">Alcreon</div>
                <div className="text-base-light text-xs font-mono">AI Intelligence on Base</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              The neural intelligence layer for Base Chain. 
              Autonomous agents, decentralized inference, and AI-powered token creation — 
              all on-chain.
            </p>
            <div className="flex items-center gap-2 p-3 bg-dark-700/50 border border-white/[0.06] rounded-xl w-fit">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/50 text-xs font-mono">All systems operational</span>
            </div>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="text-white/60 text-xs font-mono uppercase tracking-widest mb-4">Protocol</h4>
            <ul className="space-y-3">
              {['Neural Engine', 'Agent SDK', 'Token Launcher', 'ZK Inference', 'Governance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white/60 text-xs font-mono uppercase tracking-widest mb-4">Ecosystem</h4>
            <ul className="space-y-3">
              {[
                { label: 'Clanker.world', href: 'https://clanker.world', external: true },
                { label: 'Base Chain', href: 'https://base.org', external: true },
                { label: 'Coinbase Wallet', href: 'https://wallet.coinbase.com', external: true },
                { label: 'Basescan', href: 'https://basescan.org', external: true },
                { label: 'Documentation', href: '#', external: false },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-white/40 hover:text-base-light text-sm transition-colors duration-200 flex items-center gap-1"
                  >
                    {item.label}
                    {item.external && (
                      <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-white/25 text-xs font-mono">
            © 2025 Alcreon. All rights reserved. Built on Base.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map((item) => (
              <a key={item} href="#" className="text-white/25 hover:text-white/50 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-base-blue/10 border border-base-blue/20 rounded-full">
            <div className="w-3 h-3 rounded-full bg-base-blue flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="text-base-light text-xs font-mono font-medium">Base Chain</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
