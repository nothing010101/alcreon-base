export default function Footer() {
  const LOGO_PATH_1 = 'M120.758 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754L57.603 24.117c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68zM50.36 91.648C29.115 79.42 18.493 73.306 10.525 77.892 2.56 82.478 2.56 94.705 2.56 119.16v17.68c0 24.455 0 36.682 7.967 41.268 7.966 4.585 18.589-1.527 39.832-13.756l15.358-8.84c21.244-12.228 31.866-18.343 31.866-27.512 0-9.171-10.622-15.284-31.866-27.512L50.359 91.648zM57.601 176.858c-21.244 12.227-31.866 18.341-31.866 27.512 0 9.17 10.622 15.284 31.866 27.512l15.359 8.84c21.244 12.226 31.867 18.341 39.834 13.756 7.965-4.586 7.965-16.814 7.965-41.268v-17.68c0-24.455 0-36.683-7.967-41.268-7.965-4.585-18.588 1.527-39.832 13.756l-15.359 8.84zM135.242 213.208c0 24.456 0 36.684 7.967 41.269 7.967 4.586 18.588-1.527 39.832-13.756l15.358-8.84c21.244-12.228 31.865-18.342 31.865-27.511 0-9.171-10.621-15.285-31.865-27.512l-15.358-8.84c-21.244-12.228-31.865-18.341-39.832-13.756-7.967 4.585-7.967 16.813-7.967 41.268v17.678zM205.641 164.352c21.244 12.228 31.866 18.341 39.832 13.756 7.967-4.586 7.967-16.814 7.967-41.268v-17.68c0-24.454 0-36.682-7.967-41.267-7.966-4.585-18.588 1.527-39.832 13.755l-15.357 8.84c-21.245 12.228-31.866 18.344-31.866 27.512 0 9.171 10.621 15.285 31.866 27.512l15.357 8.84zM198.399 79.142c21.244-12.227 31.865-18.341 31.865-27.512 0-9.17-10.621-15.283-31.865-27.512l-15.358-8.84C161.797 3.052 151.176-3.063 143.209 1.523c-7.967 4.585-7.967 16.813-7.967 41.267v17.68c0 24.455 0 36.683 7.967 41.268 7.967 4.585 18.588-1.527 39.832-13.756l15.358-8.84z'
  const LOGO_PATH_2 = 'M357.28 219L430.667 46.2H464.587L537.547 219H504.267L485.28 173.773H408.693L389.493 219H357.28ZM418.933 146.467H476.107L448.16 79.48H447.093L418.933 146.467ZM589.438 219C579.539 219 571.603 216.44 565.63 211.32C559.657 206.2 556.67 198.008 556.67 186.744V37.24H589.438V183.416C589.438 186.829 590.291 189.389 591.998 191.096C593.875 192.803 596.435 193.656 599.678 193.656H609.662V219H589.438Z'

  return (
    <footer className='border-t border-white/[0.08] bg-[#060a10] py-12 md:py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-12'>
          {/* Brand */}
          <div className='md:col-span-1'>
            <a href='/' className='inline-flex items-center mb-4 opacity-80 hover:opacity-100 transition-opacity'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1317 256' width='100' height='20' className='text-white'>
                <path fill='currentColor' d={LOGO_PATH_1} />
                <path fill='currentColor' d={LOGO_PATH_2} />
              </svg>
            </a>
            <p className='text-white/40 text-sm leading-relaxed max-w-xs font-body'>
              Independent intelligence on token launches and on-chain signal on Base.
            </p>
            <div className='mt-4 mb-5'>
              <span className='base-badge'>on Base</span>
            </div>
            {/* Social links */}
            <div className='flex items-center gap-2'>
              <a href='https://x.com/alcreonxyz' target='_blank' rel='noopener noreferrer' aria-label='Follow on X'
                className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 transition-colors'>
                <svg width='15' height='15' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
              <a href='https://warpcast.com/alcreon' target='_blank' rel='noopener noreferrer' aria-label='Follow on Farcaster'
                className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20 transition-colors'>
                <svg width='15' height='15' viewBox='0 0 1000 1000' fill='currentColor'>
                  <path d='M257.778 155.556h484.444v688.889h-71.111v-244.445h-0.697c-7.056-85.189-78.308-151.111-165.414-151.111-87.107 0-158.359 65.922-165.414 151.111h-0.697v244.445h-81.111V155.556zM128.889 253.333l42.222 177.778h35.556V688.89h71.111V431.111h26.667V253.333H128.889zM771.111 253.333v177.778h26.667V688.89h71.111V431.111h35.556l42.222-177.778H771.111z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className='label-mono mb-4'>Navigate</h4>
            <ul className='space-y-2.5'>
              {[
                { label: 'Feed', href: '/feed' },
                { label: 'Editorials', href: '/editorials' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className='text-white/40 hover:text-white text-sm font-body transition-colors'>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className='label-mono mb-4'>Ecosystem</h4>
            <ul className='space-y-2.5'>
              {[
                { label: 'Clanker.world', href: 'https://clanker.world' },
                { label: 'Base', href: 'https://base.org' },
                { label: 'Basescan', href: 'https://basescan.org' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-white/40 hover:text-white text-sm font-body transition-colors inline-flex items-center gap-1.5 group'
                  >
                    {item.label}
                    <svg className='w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h4 className='label-mono mb-4'>Follow Alcreon</h4>
            <ul className='space-y-3'>
              <li>
                <a href='https://x.com/alcreonxyz' target='_blank' rel='noopener noreferrer'
                  className='flex items-center gap-3 text-white/40 hover:text-white text-sm font-body transition-colors group'>
                  <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors'>
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
                      <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                    </svg>
                  </span>
                  @alcreonxyz
                </a>
              </li>
              <li>
                <a href='https://warpcast.com/alcreon' target='_blank' rel='noopener noreferrer'
                  className='flex items-center gap-3 text-white/40 hover:text-white text-sm font-body transition-colors group'>
                  <span className='inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors'>
                    <svg width='13' height='13' viewBox='0 0 1000 1000' fill='currentColor'>
                      <path d='M257.778 155.556h484.444v688.889h-71.111v-244.445h-0.697c-7.056-85.189-78.308-151.111-165.414-151.111-87.107 0-158.359 65.922-165.414 151.111h-0.697v244.445h-81.111V155.556zM128.889 253.333l42.222 177.778h35.556V688.89h71.111V431.111h26.667V253.333H128.889zM771.111 253.333v177.778h26.667V688.89h71.111V431.111h35.556l42.222-177.778H771.111z' />
                    </svg>
                  </span>
                  /alcreon
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='divider pt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='label-mono'>© 2026 Alcreon. Built on Base.</p>
          <p className='label-mono'>
            Launches powered by{' '}
            <a href='https://clanker.world' target='_blank' rel='noopener noreferrer' className='text-base-light hover:text-white transition-colors'>
              Clanker
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}