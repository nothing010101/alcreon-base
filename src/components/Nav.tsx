import { useState, useEffect } from 'react'

const LOGO_PATH_1 = "M120.758 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754L57.603 24.117c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68zM50.36 91.648C29.115 79.42 18.493 73.306 10.525 77.892 2.56 82.478 2.56 94.705 2.56 119.16v17.68c0 24.455 0 36.682 7.967 41.268 7.966 4.585 18.589-1.527 39.833-13.755l15.357-8.841c21.243-12.228 31.865-18.342 31.865-27.512 0-9.17-10.622-15.284-31.866-27.512L50.36 91.648zM234.995 42.79c0-24.454 0-36.682-7.967-41.267-7.965-4.587-18.588 1.527-39.831 13.754l-15.358 8.84c-21.244 12.228-31.866 18.342-31.866 27.512s10.622 15.284 31.866 27.512l15.357 8.841c21.244 12.228 31.867 18.343 39.834 13.756 7.965-4.585 7.965-16.813 7.965-41.267v-17.68z"
const LOGO_PATH_2 = "M357.28 219L430.667 46.2H464.587L537.547 219H504.267L485.28 173.773H408.693L389.493 219H357.28ZM418.933 146.467H476.107L448.16 79.48H447.093L418.933 146.467ZM589.438 219C579.539 219 571.603 216.44 565.63 211.32C559.657 206.2 556.67 198.008 556.67 186.744V37.24H589.438V183.416C589.438 186.829 590.291 189.389 591.998 191.096C593.875 192.803 596.435 193.656 599.678 193.656H609.662V219H589.438ZM688.99 221.56C675.763 221.56 664.61 218.573 655.53 212.6C646.45 206.627 639.623 198.477 635.05 188.184C630.477 177.891 628.19 166.099 628.19 152.872V112.248C628.19 99.0213 630.477 87.2293 635.05 76.872C639.623 66.5147 646.45 58.3293 655.53 52.316C664.61 46.3027 675.763 43.296 688.99 43.296C702.217 43.296 713.35 46.3027 722.39 52.316C731.43 58.3293 738.237 66.5147 742.81 76.872C747.383 87.2293 749.67 99.0213 749.67 112.248V152.872C749.67 166.099 747.383 177.891 742.81 188.184C738.237 198.477 731.43 206.627 722.39 212.6C713.35 218.573 702.217 221.56 688.99 221.56ZM688.99 195.32C700.03 195.32 708.54 191.456 714.52 183.728C720.5 176 723.49 165.067 723.49 150.92V114.2C723.49 100.053 720.5 89.12 714.52 81.392C708.54 73.664 700.03 69.8 688.99 69.8C677.95 69.8 669.44 73.664 663.46 81.392C657.48 89.12 654.49 100.053 654.49 114.2V150.92C654.49 165.067 657.48 176 663.46 183.728C669.44 191.456 677.95 195.32 688.99 195.32ZM813.586 219V46.2H838.186L841.346 70.8C845.386 62.608 851.359 56.0773 859.266 51.208C867.173 46.3387 876.786 43.904 888.106 43.904C906.186 43.904 920.013 49.6373 929.586 61.104C939.159 72.5707 943.946 89.1573 943.946 110.864V219H917.666V113.768C917.666 98.6907 914.679 87.3947 908.706 79.88C902.733 72.3653 893.759 68.608 881.786 68.608C869.813 68.608 860.239 72.792 853.066 81.16C845.893 89.528 842.306 100.8 842.306 114.984V219H813.586ZM1006.67 221.56C993.447 221.56 982.3 218.573 973.22 212.6C964.14 206.627 957.313 198.477 952.74 188.184C948.167 177.891 945.88 166.099 945.88 152.872V112.248C945.88 99.0213 948.167 87.2293 952.74 76.872C957.313 66.5147 964.14 58.3293 973.22 52.316C982.3 46.3027 993.447 43.296 1006.67 43.296C1019.9 43.296 1031.04 46.3027 1040.08 52.316C1049.12 58.3293 1055.93 66.5147 1060.5 76.872C1065.07 87.2293 1067.36 99.0213 1067.36 112.248V152.872C1067.36 166.099 1065.07 177.891 1060.5 188.184C1055.93 198.477 1049.12 206.627 1040.08 212.6C1031.04 218.573 1019.9 221.56 1006.67 221.56ZM1006.67 195.32C1017.71 195.32 1026.22 191.456 1032.2 183.728C1038.18 176 1041.17 165.067 1041.17 150.92V114.2C1041.17 100.053 1038.18 89.12 1032.2 81.392C1026.22 73.664 1017.71 69.8 1006.67 69.8C995.633 69.8 987.123 73.664 981.143 81.392C975.163 89.12 972.173 100.053 972.173 114.2V150.92C972.173 165.067 975.163 176 981.143 183.728C987.123 191.456 995.633 195.32 1006.67 195.32ZM1141.61 221.56C1127.32 221.56 1115.48 218.36 1106.08 211.96C1096.68 205.56 1089.76 196.8 1085.32 185.68C1080.88 174.56 1079.08 161.76 1079.08 147.28V117.36C1079.08 102.88 1081.08 90.08 1085.08 78.96C1089.08 67.84 1095.52 59.0133 1104.4 52.48C1113.28 45.9467 1124.8 42.68 1138.96 42.68C1152.12 42.68 1163.24 45.6267 1172.32 51.52C1181.4 57.4133 1188.24 65.76 1192.84 76.56C1197.44 87.36 1199.74 100.053 1199.74 114.627V135.12H1105.08V150.92C1105.08 163.787 1108.01 173.947 1113.87 181.4C1119.74 188.853 1128.32 192.587 1139.64 192.587C1148.71 192.587 1156.16 190.293 1161.99 185.707C1167.82 181.12 1172.05 174.507 1174.68 165.867L1197.41 175.12C1193.37 188.347 1186.22 198.64 1175.97 206C1165.72 213.36 1154.81 221.56 1141.61 221.56ZM1105.08 112.787H1173.75V107.627C1173.75 95.04 1170.89 85.0667 1165.17 77.72C1159.45 70.3733 1150.62 66.7 1138.69 66.7C1127.32 66.7 1118.63 70.5867 1112.62 78.36C1106.61 86.1333 1103.61 97.0667 1103.61 111.147L1105.08 112.787Z"

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#060a10]/90 backdrop-blur-xl border-white/[0.08]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-1 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          aria-label="Alcreon home"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 transition-opacity duration-200 hover:opacity-70 justify-self-start"
        >
          <span className="inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1317 256" width="134" height="26" className="text-white/90" aria-label="Alcreon" role="img">
              <path fill="currentColor" d={LOGO_PATH_1} />
              <path fill="currentColor" d={LOGO_PATH_2} />
            </svg>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          className="hidden min-w-0 items-center justify-center gap-1 overflow-x-auto justify-self-center sm:flex"
        >
          {[
            { label: 'Tokens', href: '#tokens' },
            { label: 'Launches', href: '#launches' },
            { label: 'Intelligence', href: '#intelligence' },
          ].map((item) => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 justify-self-end">
          <div className="hidden sm:flex items-center">
            <span className="base-badge mr-3">
              <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="5" />
              </svg>
              Base
            </span>
          </div>
          <a
            href="https://clanker.world"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-launch hidden sm:inline-flex"
          >
            Launch Token
          </a>
          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg transition-colors sm:hidden text-white/80 hover:text-white"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden border-t border-white/[0.08] bg-[#060a10]/95 backdrop-blur-xl">
          <div className="px-4 py-5 flex flex-col gap-1">
            {[
              { label: 'Tokens', href: '#tokens' },
              { label: 'Launches', href: '#launches' },
              { label: 'Intelligence', href: '#intelligence' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/[0.06]">
              <a
                href="https://clanker.world"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-launch w-full justify-center"
              >
                Launch Token on Base
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
