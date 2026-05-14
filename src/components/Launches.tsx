const launches = [
  {
    tag: 'Token Launch',
    title: 'Why the next 100 viral tokens will be born on Base',
    excerpt: 'The convergence of Clanker\'s permissionless infrastructure and Base\'s growing liquidity depth creates a compounding flywheel that no other chain can replicate right now.',
    date: 'May 2025',
    readTime: '8 min read',
    accent: 'blue',
    img: null,
  },
  {
    tag: 'Market Intelligence',
    title: 'Farcaster-native tokens and the attention economy on Base',
    excerpt: 'Tokens launched via social primitives outperform cold launches by 3–7x in first-week volume. Here\'s the data, and what it means for your next launch.',
    date: 'May 2025',
    readTime: '6 min read',
    accent: 'warm',
    img: null,
  },
  {
    tag: 'Protocol Analysis',
    title: 'Clanker\'s fee architecture: who wins, who pays, and why it matters',
    excerpt: 'A detailed breakdown of how Clanker\'s liquidity provisioning and fee model compares to Uniswap v3 direct deployments — and the hidden advantages most launchers miss.',
    date: 'Apr 2025',
    readTime: '11 min read',
    accent: 'neutral',
    img: null,
  },
]

const accentMap = {
  blue: 'text-base-light border-base-blue/30',
  warm: 'text-amber-400/80 border-amber-400/20',
  neutral: 'text-white/50 border-white/10',
}

export default function Launches() {
  return (
    <section id="tokens" className="relative bg-[#060a10] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/[0.08]">
          <div>
            <p className="label-mono mb-1">Latest Intelligence</p>
            <h2 className="font-serif text-white text-2xl md:text-3xl tracking-tight">
              Token launches &amp; analysis
            </h2>
          </div>
          <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="hidden sm:inline-flex btn-launch">
            Launch yours →
          </a>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {launches.map((article, i) => (
            <article key={i} className="card-article flex flex-col">
              {/* Top color bar */}
              <div
                className={`h-px w-full ${
                  article.accent === 'blue'
                    ? 'bg-base-blue/60'
                    : article.accent === 'warm'
                    ? 'bg-amber-400/40'
                    : 'bg-white/10'
                }`}
              />

              <div className="p-6 flex flex-col flex-1">
                {/* Tag */}
                <div className={`inline-flex mb-4 text-[11px] font-mono uppercase tracking-widest font-semibold ${accentMap[article.accent as keyof typeof accentMap].split(' ')[0]}`}>
                  {article.tag}
                </div>

                {/* Title */}
                <h3 className="font-serif text-white text-xl md:text-[1.3rem] leading-[1.25] tracking-tight mb-3 group-hover:text-white/90 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-6">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className="label-mono">{article.date}</span>
                  <span className="label-mono">{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA row */}
        <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-body">
            Alcreon covers launches on <span className="text-white/70">Base</span> via{' '}
            <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="text-base-light hover:text-white transition-colors">
              Clanker.world
            </a>
          </p>
          <a
            href="https://clanker.world"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden btn-launch w-full justify-center"
          >
            Launch your token →
          </a>
        </div>
      </div>
    </section>
  )
}
