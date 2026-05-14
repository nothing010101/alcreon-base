import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClankerMarket {
  marketCap: number
  price: number
}

interface ClankerUser {
  username?: string
  display_name?: string
  pfp_url?: string
}

interface ClankerRelated {
  market?: ClankerMarket
  user?: ClankerUser
}

interface ClankerToken {
  id: number
  name: string
  symbol: string
  img_url: string | null
  contract_address: string
  created_at: string
  requestor_fid: number
  type: string
  pair: string | null
  related?: ClankerRelated
}

interface ClankerApiResponse {
  data: ClankerToken[]
  nextCursor?: string
}

const AVATAR_COLORS = ['#2151f5', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777']

const TABS = ['Latest', 'Briefing', 'Trending'] as const
type Tab = typeof TABS[number]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

function fmtMarketCap(v: number): string {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v.toFixed(2)}`
}

function fmtPrice(v: number): string {
  if (v >= 1) return `$${v.toFixed(2)}`
  if (v >= 0.001) return `$${v.toFixed(4)}`
  return `$${v.toExponential(2)}`
}

function typeLabel(t: string): string {
  if (t.includes('v4')) return 'v4'
  if (t.includes('v3')) return 'v3'
  return t.replace('clanker_', '')
}

function avatarColor(id: number): string {
  return AVATAR_COLORS[id % AVATAR_COLORS.length]
}

function initials(name: string): string {
  return name.substring(0, 2).toUpperCase()
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="mb-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 animate-pulse">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex-shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex gap-2">
            <div className="h-3.5 w-24 rounded bg-white/[0.06]" />
            <div className="h-3.5 w-12 rounded bg-white/[0.04]" />
            <div className="h-3.5 w-10 rounded bg-white/[0.04] ml-auto" />
          </div>
          <div className="h-3 w-32 rounded bg-white/[0.04]" />
          <div className="flex gap-2 mt-2">
            <div className="h-5 w-14 rounded-full bg-white/[0.04]" />
            <div className="h-5 w-10 rounded-full bg-white/[0.04]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarSkeletonRow() {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      <div className="h-3 w-3 rounded bg-white/[0.06]" />
      <div className="flex-1 space-y-1">
        <div className="h-3 w-20 rounded bg-white/[0.06]" />
        <div className="h-2.5 w-14 rounded bg-white/[0.04]" />
      </div>
      <div className="text-right space-y-1">
        <div className="h-3 w-10 rounded bg-white/[0.06]" />
        <div className="h-2.5 w-8 rounded bg-white/[0.04]" />
      </div>
    </div>
  )
}

// ─── Token Card ───────────────────────────────────────────────────────────────

function TokenCard({ token }: { token: ClankerToken }) {
  const mc = token.related?.market?.marketCap ?? 0
  const price = token.related?.market?.price ?? 0
  const deployer = token.related?.user?.display_name || token.related?.user?.username
  const pfp = token.related?.user?.pfp_url

  return (
    <div className="mb-3 break-inside-avoid">
      <a
        href={`https://www.clanker.world/token/${token.contract_address}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all p-4 cursor-pointer"
      >
        <div className="flex gap-3">
          {/* Token image / avatar */}
          {token.img_url ? (
            <img
              src={token.img_url}
              alt={token.name}
              className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-white/[0.04]"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const sibling = target.nextElementSibling as HTMLElement | null
                if (sibling) sibling.style.display = 'flex'
              }}
            />
          ) : null}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs flex-shrink-0 select-none"
            style={{ backgroundColor: avatarColor(token.id), display: token.img_url ? 'none' : 'flex' }}
          >
            {initials(token.name)}
          </div>

          <div className="flex-1 min-w-0">
            {/* Header row */}
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="font-bold text-white text-[0.8125rem] leading-none truncate">{token.name}</span>
              <span className="text-white/40 text-xs font-mono">${token.symbol}</span>
              <span className="ml-auto text-white/25 text-[10px] font-mono flex-shrink-0">{timeAgo(token.created_at)}</span>
            </div>

            {/* Market cap + price */}
            <div className="flex items-center gap-3 mb-2">
              {mc > 0 && (
                <span className="text-white/70 text-xs font-mono">
                  <span className="text-white/30 text-[10px] mr-0.5">mcap</span>
                  {fmtMarketCap(mc)}
                </span>
              )}
              {price > 0 && (
                <span className="text-white/40 text-[10px] font-mono">{fmtPrice(price)}</span>
              )}
            </div>

            {/* Badges + deployer */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {token.pair && (
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-full">
                  {token.pair}
                </span>
              )}
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#7ba5ff]/60 bg-[#2151f5]/10 border border-[#2151f5]/20 px-1.5 py-0.5 rounded-full">
                {typeLabel(token.type)}
              </span>
              {deployer && (
                <span className="ml-auto flex items-center gap-1 text-[10px] text-white/25">
                  {pfp && (
                    <img src={pfp} alt={deployer} className="w-3.5 h-3.5 rounded-full object-cover" />
                  )}
                  {deployer}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

// ─── Briefing placeholder ─────────────────────────────────────────────────────

function BriefingPlaceholder() {
  const items = [
    { tag: 'Daily Briefing', title: 'Base Briefing — May 14', body: 'Top clanker launches, holder stats, and market signals from the last 24 hours. Updated every morning.' },
    { tag: 'Signal', title: 'Holder retention at all-time high', body: '30-day retention on Base tokens: 61%. Six months ago this was 19%. Something has changed.' },
    { tag: 'Weekly Wrap', title: 'Weekly wrap — May 13', body: 'The editorial on fee architecture hit 47K reads. $CLANK: 12K holders, $0 marketing. Full breakdown Monday.' },
  ]
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">{item.tag}</span>
          <h3 className="text-white font-semibold text-sm mt-1 mb-1.5">{item.title}</h3>
          <p className="text-white/45 text-xs leading-relaxed">{item.body}</p>
        </div>
      ))}
      <p className="text-center text-white/20 text-xs font-mono pt-2">Editorial briefings coming soon</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('Latest')
  const [tokens, setTokens] = useState<ClankerToken[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cursor, setCursor] = useState<string | undefined>()
  const [loadingMore, setLoadingMore] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const fetchTokens = useCallback(async (append = false, currentCursor?: string) => {
    if (append) setLoadingMore(true)
    else setLoading(true)
    setError(false)

    try {
      const params = new URLSearchParams({
        sort: 'desc',
        limit: '20',
        includeMarket: 'true',
        includeUser: 'true',
      })
      if (append && currentCursor) params.set('cursor', currentCursor)

      const res = await fetch(`/api/clanker/tokens?${params.toString()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const json = (await res.json()) as ClankerApiResponse
      const incoming = json.data ?? []

      setTokens(prev => append ? [...prev, ...incoming] : incoming)
      setCursor(json.nextCursor)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch {
      if (!append) setError(true)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  // Initial load + polling
  useEffect(() => {
    fetchTokens()
    intervalRef.current = setInterval(() => fetchTokens(), 30_000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchTokens])

  const trendingTokens = [...tokens].sort(
    (a, b) => (b.related?.market?.marketCap ?? 0) - (a.related?.market?.marketCap ?? 0)
  )

  const displayedTokens = activeTab === 'Trending' ? trendingTokens : tokens

  const sidebarTop5 = trendingTokens.slice(0, 5)

  return (
    <div className="flex min-h-screen flex-col bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">

          {/* Header row */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-10">
            <div className="hidden md:flex md:items-center gap-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/25">Clanker token launches</p>
              {lastUpdated && (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono text-green-400/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  live · {lastUpdated}
                </span>
              )}
            </div>

            {/* Tab nav */}
            <nav className="mx-auto w-fit rounded-xl border border-white/[0.1] bg-white/[0.03] p-1">
              <ul className="flex gap-1" role="tablist" aria-label="Feed sections">
                {TABS.map(tab => (
                  <li key={tab} className="relative" role="presentation">
                    {activeTab === tab && <div className="absolute inset-0 rounded-lg bg-[#2151f5]/15" />}
                    <button
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative z-[1] min-h-[44px] cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === tab ? 'text-[#7ba5ff]' : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {tab}
                      {tab === 'Latest' && (
                        <span className="ml-1.5 inline-flex w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:flex md:items-center md:justify-end">
              <a
                href="https://clanker.world"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/30 hover:text-white transition-colors font-medium"
              >
                Launch token →
              </a>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

            {/* Feed column */}
            <div className="columns-1 gap-3">

              {/* Briefing tab */}
              {activeTab === 'Briefing' && <BriefingPlaceholder />}

              {/* Latest / Trending tabs */}
              {activeTab !== 'Briefing' && (
                <>
                  {loading && (
                    <>
                      <SkeletonCard />
                      <SkeletonCard />
                      <SkeletonCard />
                    </>
                  )}

                  {!loading && error && (
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 text-center">
                      <p className="text-white/40 text-sm mb-3">Unable to fetch launches. Retrying...</p>
                      <button
                        onClick={() => fetchTokens()}
                        className="text-xs text-[#7ba5ff] hover:text-white transition-colors font-mono border border-white/[0.1] px-3 py-1.5 rounded-lg"
                      >
                        Retry now
                      </button>
                    </div>
                  )}

                  {!loading && !error && displayedTokens.map(token => (
                    <TokenCard key={token.id} token={token} />
                  ))}

                  {/* Load more / refresh */}
                  {!loading && !error && displayedTokens.length > 0 && activeTab !== 'Trending' && (
                    <div className="pt-6 text-center break-inside-avoid">
                      {loadingMore ? (
                        <span className="text-xs text-white/20 font-mono tracking-wide">Loading...</span>
                      ) : (
                        <button
                          onClick={() => fetchTokens(true, cursor)}
                          className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono tracking-wide"
                        >
                          load more
                        </button>
                      )}
                    </div>
                  )}

                  {!loading && !error && activeTab === 'Trending' && (
                    <div className="pt-6 text-center break-inside-avoid">
                      <button
                        onClick={() => fetchTokens()}
                        className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono tracking-wide"
                      >
                        ↻ refresh
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 hidden lg:block">

              {/* Trending on Base */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm tracking-wide">Trending on Base</h3>
                  {sidebarTop5.length > 0 && (
                    <span className="text-[9px] font-mono text-green-400/60 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      live
                    </span>
                  )}
                </div>
                <div className="space-y-3.5">
                  {loading && Array.from({ length: 5 }).map((_, i) => <SidebarSkeletonRow key={i} />)}
                  {!loading && sidebarTop5.map((t, i) => {
                    const mc = t.related?.market?.marketCap ?? 0
                    return (
                      <a
                        key={t.id}
                        href={`https://www.clanker.world/token/${t.contract_address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <span className="text-[10px] font-mono text-white/20 w-3 text-right">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-white/80 text-xs font-semibold truncate">${t.symbol}</div>
                          <div className="text-white/25 text-[10px] font-mono truncate">{t.name}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs font-mono text-[#7ba5ff]">{mc > 0 ? fmtMarketCap(mc) : '—'}</div>
                          <div className="text-white/25 text-[10px] font-mono">{timeAgo(t.created_at)}</div>
                        </div>
                      </a>
                    )
                  })}
                </div>
                <p className="mt-4 text-[10px] text-white/20 font-mono">via Clanker API</p>
              </div>

              {/* Launch CTA */}
              <div className="rounded-2xl border border-[#2151f5]/25 bg-[#2151f5]/5 p-5">
                <h3 className="text-white font-semibold text-sm mb-1.5">Launch on Base</h3>
                <p className="text-white/40 text-xs mb-4 leading-relaxed">Deploy with instant Uniswap v3 liquidity. Takes 60 seconds.</p>
                <a
                  href="https://clanker.world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2151f5] text-white text-xs font-semibold rounded-lg hover:bg-[#1a41d4] transition-colors"
                >
                  Launch on Clanker
                </a>
              </div>

              {/* Latest Editorials */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Latest Editorials</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Why Farcaster-native tokens outperform by 3–7x', tag: 'Analysis' },
                    { title: "Clanker's fee architecture: who actually wins", tag: 'Deep Dive' },
                    { title: 'The $CLANK case study: 12K holders, $0 marketing', tag: 'Playbook' },
                  ].map((e, i) => (
                    <Link key={i} to="/editorials" className="block group">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-white/25 group-hover:text-white/40 transition-colors">{e.tag}</span>
                      <p className="text-white/55 text-xs leading-snug mt-0.5 group-hover:text-white/80 transition-colors">{e.title}</p>
                    </Link>
                  ))}
                </div>
                <Link to="/editorials" className="mt-4 inline-flex text-xs text-[#7ba5ff] hover:text-white transition-colors">
                  All editorials →
                </Link>
              </div>

              {/* Follow Alcreon */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Follow Alcreon</h3>
                <div className="space-y-2">
                  <a
                    href="https://x.com/alcreonxyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors text-white/50 group-hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors">@alcreonxyz</div>
                      <div className="text-white/25 text-[10px]">X / Twitter</div>
                    </div>
                  </a>
                  <a
                    href="https://warpcast.com/alcreon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group"
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] group-hover:bg-white/[0.08] transition-colors text-white/50 group-hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 1000 1000" fill="currentColor">
                        <path d="M257.778 155.556h484.444v688.889h-71.111v-244.445h-0.697c-7.056-85.189-78.308-151.111-165.414-151.111-87.107 0-158.359 65.922-165.414 151.111h-0.697v244.445h-81.111V155.556zM128.889 253.333l42.222 177.778h35.556V688.89h71.111V431.111h26.667V253.333H128.889zM771.111 253.333v177.778h26.667V688.89h71.111V431.111h35.556l42.222-177.778H771.111z" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-white/70 text-xs font-semibold group-hover:text-white transition-colors">/alcreon</div>
                      <div className="text-white/25 text-[10px]">Farcaster</div>
                    </div>
                  </a>
                </div>
              </div>

            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
