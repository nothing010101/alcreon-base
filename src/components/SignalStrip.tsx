const signals = [
  { metric: '148K+', label: 'Tokens on Base' },
  { metric: '$2.4B', label: 'TVL on Base' },
  { metric: '2s', label: 'Block time' },
  { metric: '< 1¢', label: 'Avg gas' },
  { metric: '∞', label: 'Ideas to launch' },
]

export default function SignalStrip() {
  return (
    <div className="border-y border-white/[0.07] bg-neutral-900/40 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 md:gap-16 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {signals.map((s, i) => (
            <div key={i} className="flex-shrink-0 flex items-center gap-3">
              <span className="font-mono text-xl font-semibold text-white">{s.metric}</span>
              <span className="label-mono whitespace-nowrap">{s.label}</span>
              {i < signals.length - 1 && (
                <span className="text-white/15 ml-4 md:ml-8">·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
