export default function Intelligence() {
  return (
    <section id="intelligence" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-base-blue/10 blur-[100px]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-base-blue/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Visual */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Central orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-base-blue/20 border border-base-blue/40 flex items-center justify-center animate-pulse-slow">
                    <div className="w-24 h-24 rounded-full bg-base-blue/30 border border-base-blue/60 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-base-blue border border-base-light flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Glow */}
                  <div className="absolute inset-0 rounded-full bg-base-blue/20 blur-2xl animate-glow" />
                </div>
              </div>

              {/* Orbit rings */}
              <div className="absolute inset-8 rounded-full border border-base-blue/15" style={{ animation: 'spin 20s linear infinite' }} />
              <div className="absolute inset-4 rounded-full border border-base-blue/10" style={{ animation: 'spin 30s linear infinite reverse' }} />

              {/* Floating nodes */}
              {[
                { top: '10%', left: '50%', label: 'Neural', delay: '0s' },
                { top: '50%', left: '90%', label: 'Agents', delay: '1s' },
                { top: '85%', left: '60%', label: 'Chain', delay: '2s' },
                { top: '85%', left: '30%', label: 'Data', delay: '0.5s' },
                { top: '50%', left: '5%', label: 'ZK', delay: '1.5s' },
              ].map((node, i) => (
                <div
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ top: node.top, left: node.left }}
                >
                  <div
                    className="w-16 h-8 bg-dark-700 border border-base-blue/30 rounded-lg flex items-center justify-center animate-float"
                    style={{ animationDelay: node.delay }}
                  >
                    <span className="text-base-light text-xs font-mono font-medium">{node.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <span className="tag-base mb-4 inline-flex">Alcreon Intelligence</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              <span className="gradient-text">AI that thinks</span>
              <br />
              <span className="blue-gradient-text">in blocks</span>
            </h2>
            <p className="text-white/50 text-lg mb-8 leading-relaxed">
              Traditional AI operates in milliseconds. Alcreon operates in blocks — 
              synchronized with Base's consensus, embedding intelligence directly into the fabric 
              of on-chain execution.
            </p>

            <div className="space-y-4 mb-10">
              {[
                {
                  title: 'Block-Synchronized Processing',
                  desc: 'AI inference aligned to Base\'s 2-second block time for deterministic on-chain outcomes.',
                },
                {
                  title: 'Adaptive Learning Loops',
                  desc: 'Model weights update continuously from on-chain feedback — smarter with every transaction.',
                },
                {
                  title: 'Multi-Model Consensus',
                  desc: 'Ensemble of specialized neural networks vote on market signals — Byzantine fault-tolerant AI.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 card-glass rounded-xl">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-base-blue/20 border border-base-blue/30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-base-blue" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-white/40 text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live terminal widget */}
            <div className="bg-dark-800 border border-white/[0.08] rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-white/30 text-xs ml-2">alcreon-inference</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="text-white/40">{'>'} <span className="text-base-light">alcreon.infer</span>(block=<span className="text-green-400">29841203</span>)</div>
                <div className="text-white/40">{'>'} signal: <span className="text-yellow-400">BULLISH</span> confidence=<span className="text-green-400">0.87</span></div>
                <div className="text-white/40">{'>'} agent: <span className="text-white">executing token deploy</span></div>
                <div className="text-white/40 flex items-center gap-1">
                  {'>'} status: <span className="text-green-400">ON-CHAIN</span>
                  <span className="inline-block w-1.5 h-3 bg-green-400/80 ml-1 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
