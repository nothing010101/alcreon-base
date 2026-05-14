import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const SOCIAL_LINKS = [
  {
    label: 'X / Twitter',
    href: 'https://x.com/alcreonxyz',
    icon: (
      <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    ),
  },
  {
    label: 'Farcaster',
    href: 'https://warpcast.com/alcreon',
    icon: (
      <svg width='16' height='16' viewBox='0 0 1000 1000' fill='currentColor' aria-hidden='true'>
        <path d='M257.778 155.556h484.444v688.889h-71.111v-244.445h-0.697c-7.056-85.189-78.308-151.111-165.414-151.111-87.107 0-158.359 65.922-165.414 151.111h-0.697v244.445h-81.111V155.556zM128.889 253.333l42.222 177.778h35.556V688.89h71.111V431.111h26.667V253.333H128.889zM771.111 253.333v177.778h26.667V688.89h71.111V431.111h35.556l42.222-177.778H771.111z' />
      </svg>
    ),
  },
]

const ALCREON_CA = '0x0000000000000000000'
const BUY_HREF = 'https://clanker.world'

function BuyButton() {
  return (
    <div className='flex flex-col items-end gap-0.5'>
      <a
        href={BUY_HREF}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[0.75rem] font-semibold tracking-wide text-[#060a10] transition-opacity hover:opacity-85 active:opacity-70'
      >
        <svg width='11' height='11' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
          <path d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'/>
        </svg>
        BUY ALCREON
      </a>
      <span className='font-mono text-[9px] tracking-widest text-white/25 select-all pr-0.5'>{ALCREON_CA}</span>
    </div>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => setMobileOpen(false), [location.pathname])

  const navLinks = [
    { label: 'Feed', href: '/feed' },
    { label: 'Editorials', href: '/editorials' },
  ]

  if (isHome) {
    return (
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-[#060a10]/90 backdrop-blur-xl border-white/[0.08]' : 'bg-transparent border-transparent'
      }`}>
        <div className='mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-1 px-4 py-3 sm:px-6 sm:py-4 lg:px-8'>
          <LogoLink />
          <nav aria-label='Homepage navigation' className='hidden min-w-0 items-center justify-center gap-3 overflow-x-auto justify-self-center [scrollbar-width:none] sm:flex'>
            {navLinks.map(l => (
              <Link key={l.label} to={l.href} className='inline-flex min-h-[44px] items-center rounded-lg px-3 text-[0.9375rem] font-medium tracking-wide transition-colors duration-300 text-white/72 hover:text-white'>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className='flex items-center gap-2 justify-self-end'>
            <div className='hidden items-center gap-2 sm:flex'>
              {SOCIAL_LINKS.map(s => (
                <a key={s.label} href={s.href} target='_blank' rel='noopener noreferrer' aria-label={s.label}
                  className='inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors'>
                  {s.icon}
                </a>
              ))}
              <BuyButton />
            </div>
            <MobileMenuBtn open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>
        {mobileOpen && <MobileMenu links={navLinks} onClose={() => setMobileOpen(false)} />}
      </header>
    )
  }

  return (
    <header className='sticky top-0 z-40 w-full bg-[#060a10]/80 backdrop-blur-sm border-b border-white/[0.08]'>
      <div className='mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-1 px-4 py-3 sm:px-6 sm:py-4 lg:px-8'>
        <LogoLink />
        <nav aria-label='Main navigation' className='hidden min-w-0 items-center justify-center gap-3 overflow-x-auto justify-self-center [scrollbar-width:none] sm:flex'>
          {navLinks.map(l => (
            <Link key={l.label} to={l.href}
              className={`inline-flex min-h-[44px] items-center rounded-lg px-3 text-[0.9375rem] font-medium tracking-wide transition-colors ${
                location.pathname === l.href ? 'text-white' : 'text-white/50 hover:text-white'
              }`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className='flex items-center gap-2 justify-self-end'>
          <div className='hidden items-center gap-2 sm:flex'>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target='_blank' rel='noopener noreferrer' aria-label={s.label}
                className='inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors'>
                {s.icon}
              </a>
            ))}
            <BuyButton />
          </div>
          <MobileMenuBtn open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
      </div>
      {mobileOpen && <MobileMenu links={navLinks} onClose={() => setMobileOpen(false)} />}
    </header>
  )
}

function LogoLink() {
  return (
    <Link to='/' aria-label='Alcreon home' className='inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 transition-opacity duration-200 hover:opacity-70 justify-self-start'>
      <span className='inline-flex items-center'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1317 256' width='134' height='26' className='text-white/90' aria-label='Alcreon' role='img'>
          <path fill='currentColor' d='M120.758 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754L57.603 24.117c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68zM50.36 91.648C29.115 79.42 18.493 73.306 10.525 77.892 2.56 82.478 2.56 94.705 2.56 119.16v17.68c0 24.455 0 36.682 7.967 41.268 7.966 4.585 18.589-1.527 39.832-13.756l15.358-8.84c21.244-12.228 31.866-18.343 31.866-27.512 0-9.171-10.622-15.284-31.866-27.512L50.359 91.648zM57.601 176.858c-21.244 12.227-31.866 18.341-31.866 27.512 0 9.17 10.622 15.284 31.866 27.512l15.359 8.84c21.244 12.226 31.867 18.341 39.834 13.756 7.965-4.586 7.965-16.814 7.965-41.268v-17.68c0-24.455 0-36.683-7.967-41.268-7.965-4.585-18.588 1.527-39.832 13.756l-15.359 8.84zM135.242 213.208c0 24.456 0 36.684 7.967 41.269 7.967 4.586 18.588-1.527 39.832-13.756l15.358-8.84c21.244-12.228 31.865-18.342 31.865-27.511 0-9.171-10.621-15.285-31.865-27.512l-15.358-8.84c-21.244-12.228-31.865-18.341-39.832-13.756-7.967 4.585-7.967 16.813-7.967 41.268v17.678zM205.641 164.352c21.244 12.228 31.866 18.341 39.832 13.756 7.967-4.586 7.967-16.814 7.967-41.268v-17.68c0-24.454 0-36.682-7.967-41.267-7.966-4.585-18.588 1.527-39.832 13.755l-15.357 8.84c-21.245 12.228-31.866 18.344-31.866 27.512 0 9.171 10.621 15.285 31.866 27.512l15.357 8.84zM198.399 79.142c21.244-12.227 31.865-18.341 31.865-27.512 0-9.17-10.621-15.283-31.865-27.512l-15.358-8.84C161.797 3.052 151.176-3.063 143.209 1.523c-7.967 4.585-7.967 16.813-7.967 41.267v17.68c0 24.455 0 36.683 7.967 41.268 7.967 4.585 18.588-1.527 39.832-13.756l15.358-8.84z' />
          <path fill='currentColor' d='M357.28 219L430.667 46.2H464.587L537.547 219H504.267L485.28 173.773H408.693L389.493 219H357.28ZM418.933 146.467H476.107L448.16 79.48H447.093L418.933 146.467ZM589.438 219C579.539 219 571.603 216.44 565.63 211.32C559.657 206.2 556.67 198.008 556.67 186.744V37.24H589.438V183.416C589.438 186.829 590.291 189.389 591.998 191.096C593.875 192.803 596.435 193.656 599.678 193.656H609.662V219H589.438ZM688.99 221.56C675.763 221.56 664.172 218.858 654.217 213.453C644.261 207.907 636.51 200.156 630.963 190.2C625.417 180.244 622.643 168.511 622.643 155C622.643 141.489 625.346 129.756 630.75 119.8C636.297 109.844 644.048 102.164 654.003 96.76C663.959 91.213 675.621 88.44 688.99 88.44C705.488 88.44 719.141 92.636 729.95 101.027C740.759 109.276 747.586 120.796 750.43 135.587H718.643C716.51 129.187 712.954 124.351 707.977 121.08C702.999 117.809 696.67 116.173 688.99 116.173C678.466 116.173 670.074 119.587 663.817 126.413C657.559 133.098 654.43 142.627 654.43 155C654.43 167.373 657.559 176.973 663.817 183.8C670.074 190.484 678.466 193.827 688.99 193.827C705.488 193.827 715.586 186.716 719.283 172.493H751.283C748.581 187.996 741.826 200.084 731.017 208.76C720.208 217.293 706.199 221.56 688.99 221.56Z' />
        </svg>
      </span>
    </Link>
  )
}

function MobileMenuBtn({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button type='button' aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={onClick}
      className='inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors sm:hidden text-white/80 hover:text-white'>
      <svg width='22' height='22' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
        {open
          ? <path d='M6 18L18 6M6 6l12 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
          : <><path d='M4 7h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' /><path d='M4 12h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' /><path d='M4 17h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' /></>
        }
      </svg>
    </button>
  )
}

function MobileMenu({ links, onClose }: { links: { label: string; href: string }[]; onClose: () => void }) {
  return (
    <div className='sm:hidden border-t border-white/[0.08] bg-[#060a10]/95 backdrop-blur-xl'>
      <div className='px-4 py-5 flex flex-col gap-1'>
        {links.map(l => (
          <Link key={l.label} to={l.href} onClick={onClose}
            className='inline-flex min-h-[44px] items-center rounded-lg px-3 text-[0.9375rem] font-medium text-white/60 hover:text-white transition-colors'>
            {l.label}
          </Link>
        ))}
        <div className='pt-3 mt-2 border-t border-white/[0.06] flex flex-col items-center gap-2'>
          <div className='flex items-center gap-3'>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} target='_blank' rel='noopener noreferrer' aria-label={s.label}
                className='inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/40 hover:text-white transition-colors'>
                {s.icon}
              </a>
            ))}
          </div>
          <a
            href={BUY_HREF}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[0.8125rem] font-semibold tracking-wide text-[#060a10] transition-opacity hover:opacity-85'
          >
            <svg width='12' height='12' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' stroke='currentColor' strokeWidth='2.2' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
            BUY ALCREON
          </a>
          <span className='font-mono text-[9px] tracking-widest text-white/25 select-all'>{ALCREON_CA}</span>
        </div>
      </div>
    </div>
  )
}
