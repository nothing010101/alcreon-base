export default function Footer() {
  const LOGO_PATH_1 = "M120.758 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754L57.603 24.117c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68zM50.36 91.648C29.115 79.42 18.493 73.306 10.525 77.892 2.56 82.478 2.56 94.705 2.56 119.16v17.68c0 24.455 0 36.682 7.967 41.268 7.966 4.585 18.589-1.527 39.833-13.755l15.357-8.841c21.243-12.228 31.865-18.342 31.865-27.512 0-9.17-10.622-15.284-31.866-27.512L50.36 91.648zM234.995 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754l-15.358 8.84c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68z"
  const LOGO_PATH_2 = "M357.28 219L430.667 46.2H464.587L537.547 219H504.267L485.28 173.773H408.693L389.493 219H357.28ZM418.933 146.467H476.107L448.16 79.48H447.093L418.933 146.467ZM589.438 219C579.539 219 571.603 216.44 565.63 211.32C559.657 206.2 556.67 198.008 556.67 186.744V37.24H589.438V183.416C589.438 186.829 590.291 189.389 591.998 191.096C593.875 192.803 596.435 193.656 599.678 193.656H609.662V219H589.438Z"

  return (
    <footer className="border-t border-white/[0.08] bg-[#060a10] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="/" className="inline-flex items-center mb-4 opacity-80 hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1317 256" width="100" height="20" className="text-white">
                <path fill="currentColor" d={LOGO_PATH_1} />
                <path fill="currentColor" d={LOGO_PATH_2} />
              </svg>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-body">
              Independent intelligence on token launches and on-chain signal on Base.
            </p>
            <div className="mt-4">
              <span className="base-badge">on Base</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="label-mono mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Tokens', href: '#tokens' },
                { label: 'Launches', href: '#launches' },
                { label: 'Intelligence', href: '#intelligence' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/40 hover:text-white text-sm font-body transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="label-mono mb-4">Ecosystem</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Clanker.world', href: 'https://clanker.world' },
                { label: 'Base', href: 'https://base.org' },
                { label: 'Basescan', href: 'https://basescan.org' },
                { label: 'Warpcast', href: 'https://warpcast.com' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/40 hover:text-white text-sm font-body transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {item.label}
                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="label-mono">© 2025 Alcreon. Built on Base.</p>
          <p className="label-mono">
            Launches powered by{' '}
            <a href="https://clanker.world" target="_blank" rel="noopener noreferrer" className="text-base-light hover:text-white transition-colors">
              Clanker
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
