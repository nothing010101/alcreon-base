import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { fetchBriefings, formatDateUTC, type Editorial } from '../lib/notion'
import Footer from '../components/Footer'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClankerTrustStatus {
  isTrustedDeployer: boolean
  isTrustedClanker: boolean
  fidMatchesDeployer: boolean
  verifiedAddresses: string[]
}

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
  trustStatus?: ClankerTrustStatus
}

interface ClankerApiResponse {
  data: ClankerToken[]
  nextCursor?: string
}

interface DexScreenerPair {
  baseToken: { address: string; symbol: string; name: string }
  priceUsd: string
  volume: { h1: number; h24: number }
  liquidity: { usd: number }
  priceChange: { h1: number }
}

interface DexScreenerResponse {
  pairs: DexScreenerPair[] | null
}

interface DexData {
  priceUsd: string
  volH1: number
  volH24: number
  liquidity: number
  changeH1: number
}

interface EnrichedToken extends ClankerToken {
  dex?: DexData
  dexFailed?: boolean
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

function ageMinutes(iso: string): number {
  return (Date.now() - new Date(iso).getTime()) / 60000
}

function fmtMc(v: number): string {
  if (v >= 1_000_000_000) return `$${(v / 1_000_000_000).toFixed(1)}B`
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`
  return `$${v.toFixed(2)}`
}

function fmtPrice(v: number | string): string {
  const n = typeof v === 'string' ? parseFloat(v) : v
  if (isNaN(n)) return '—'
  if (n >= 1) return `$${n.toFixed(2)}`
  if (n >= 0.001) return `$${n.toFixed(5)}`
  return `$${n.toExponential(2)}`
}

function fmtVol(v: number): string {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
  if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`
  return `$${v.toFixed(0)}`
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

function isTrusted(token: ClankerToken): boolean {
  if (!token.trustStatus) return true
  return token.trustStatus.isTrustedDeployer || token.trustStatus.isTrustedClanker
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
          <div className="h-3 w-40 rounded bg-white/[0.04]" />
          <div className="h-3 w-52 rounded bg-white/[0.04]" />
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

function TokenCard({ token }: { token: EnrichedToken }) {
  const [expanded, setExpanded] = useState(false)
  const [holderCount, setHolderCount] = useState<number | null>(null)
  const [holderLoading, setHolderLoading] = useState(false)
  const fetchedRef = useRef(false)

  const mc = token.related?.market?.marketCap ?? 0
  const deployer = token.related?.user?.display_name || token.related?.user?.username
  const pfp = token.related?.user?.pfp_url
  const trusted = isTrusted(token)
  const dex = token.dex

  const fetchHolders = useCallback(async () => {
    if (fetchedRef.current) return
    const apiKey = import.meta.env.VITE_BASESCAN_API_KEY
    if (!apiKey) return
    fetchedRef.current = true
    setHolderLoading(true)
    try {
      const url = `/api/basescan/api?module=token&action=tokeninfo&contractaddress=${token.contract_address}&apikey=${apiKey}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('basescan error')
      const json = await res.json() as { status: string; result: { holdersCount?: string }[] }
      if (json.status === '1' && json.result?.[0]?.holdersCount) {
        setHolderCount(parseInt(json.result[0].holdersCount, 10))
      } else {
        setHolderCount(-1)
      }
    } catch {
      setHolderCount(-1)
    } finally {
      setHolderLoading(false)
    }
  }, [token.contract_address])

  function handleExpand(e: React.MouseEvent) {
    e.preventDefault()
    setExpanded(prev => {
      if (!prev) fetchHolders()
      return !prev
    })
  }

  return (
    <div className="mb-3 break-inside-avoid">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all overflow-hidden">
        {/* Main card — click opens clanker */}
        <a
          href={`https://www.clanker.world/clanker/${token.contract_address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4"
        >
          <div className="flex gap-3">
            {/* Image / avatar */}
            {token.img_url ? (
              <img
                src={token.img_url}
                alt={token.name}
                className="w-10 h-10 rounded-xl object-cover flex-shrink-0 bg-white/[0.04]"
                onError={(e) => {
                  const t = e.currentTarget
                  t.style.display = 'none'
                  const sib = t.nextElementSibling as HTMLElement | null
                  if (sib) sib.style.display = 'flex'
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
              {/* Row 1: name + badges */}
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="font-bold text-white text-[0.8125rem] leading-none">{token.name}</span>
                <span className="text-white/40 text-xs font-mono">${token.symbol}</span>
                {!trusted && (
                  <span className="text-[9px] font-mono text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded-full">
                    ⚠ Unverified
                  </span>
                )}
                <div className="ml-auto flex items-center gap-1">
                  {token.pair && (
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-full">
                      {token.pair}
                    </span>
                  )}
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#7ba5ff]/60 bg-[#2151f5]/10 border border-[#2151f5]/20 px-1.5 py-0.5 rounded-full">
                    {typeLabel(token.type)}
                  </span>
                </div>
              </div>

              {/* Row 2: deployer + time */}
              <div className="flex items-center gap-1.5 mb-2 text-[10px] text-white/30 font-mono">
                {deployer && (
                  <>
                    {pfp && <img src={pfp} alt={deployer} className="w-3.5 h-3.5 rounded-full object-cover" />}
                    <span>@{deployer}</span>
                    <span className="text-white/15">·</span>
                  </>
                )}
                <span>{timeAgo(token.created_at)}</span>
              </div>

              {/* Row 3: MC / Price / Liq */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1.5 text-xs font-mono">
                {mc > 0 && (
                  <span className="text-white/55">
                    <span className="text-white/25 text-[10px]">MC </span>{fmtMc(mc)}
                  </span>
                )}
                {dex && (
                  <>
                    <span className="text-white/55">
                      <span className="text-white/25 text-[10px]">Price </span>{fmtPrice(dex.priceUsd)}
                    </span>
                    {dex.liquidity > 0 && (
                      <span className="text-white/55">
                        <span className="text-white/25 text-[10px]">Liq </span>{fmtVol(dex.liquidity)}
                      </span>
                    )}
                  </>
                )}
                {token.dexFailed && !dex && (
                  <span className="text-white/20 text-[10px]">market data unavailable</span>
                )}
              </div>

              {/* Row 4: Vol 1h / 24h change */}
              {dex && (
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
                  {dex.volH1 > 0 && (
                    <span className="text-white/45">
                      <span className="text-white/25 text-[10px]">Vol 1h </span>{fmtVol(dex.volH1)}
                    </span>
                  )}
                  {dex.changeH1 !== 0 && (
                    <span className={dex.changeH1 >= 0 ? 'text-green-400' : 'text-red-400'}>
                      24h: {dex.changeH1 >= 0 ? '+' : ''}{dex.changeH1.toFixed(1)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </a>

        {/* Expand toggle */}
        <div className="border-t border-white/[0.05] px-4 py-2 flex items-center justify-between">
          <button
            onClick={handleExpand}
            className="text-[10px] font-mono text-white/20 hover:text-white/50 transition-colors"
          >
            {expanded ? '▲ less' : '▼ holders'}
          </button>
          <a
            href={`https://basescan.org/token/${token.contract_address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-mono text-white/15 hover:text-white/40 transition-colors"
          >
            basescan ↗
          </a>
        </div>

        {/* Expanded: holders */}
        {expanded && (
          <div className="px-4 pb-3 text-xs font-mono text-white/40">
            {holderLoading && <span className="text-white/25">Loading holders...</span>}
            {!holderLoading && holderCount !== null && holderCount >= 0 && (
              <span>Holders: <span className="text-white/70">{holderCount.toLocaleString()}</span></span>
            )}
            {!holderLoading && holderCount === -1 && (
              <span className="text-white/20">Holders: —</span>
            )}
            {!holderLoading && holderCount === null && !import.meta.env.VITE_BASESCAN_API_KEY && (
              <span className="text-white/20">Set VITE_BASESCAN_API_KEY to see holders</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Briefing section ────────────────────────────────────────────────────────

function BriefingSkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 animate-pulse">
      <div className="h-2.5 w-20 rounded bg-white/[0.06] mb-3" />
      <div className="h-4 w-3/4 rounded bg-white/[0.06] mb-2" />
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-white/[0.04]" />
        <div className="h-3 w-4/5 rounded bg-white/[0.04]" />
      </div>
    </div>
  )
}

function BriefingList({ items, loading }: { items: Editorial[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="space-y-3">
        <BriefingSkeletonCard />
        <BriefingSkeletonCard />
        <BriefingSkeletonCard />
      </div>
    )
  }
  if (items.length === 0) {
    return <p className="text-center text-white/20 text-xs font-mono pt-4">No briefings yet.</p>
  }
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30">{item.tag}</span>
          <h3 className="text-white font-semibold text-sm mt-1 mb-1.5">{item.title}</h3>
          <p className="text-white/45 text-xs leading-relaxed">{item.excerpt}</p>
          {item.publishAt && (
            <p className="text-white/20 text-[10px] font-mono mt-2">{formatDateUTC(item.publishAt)}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Feed ────────────────────────────────────────────────────────────────

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('Latest')
  const [tokens, setTokens] = useState<EnrichedToken[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [cursor, setCursor] = useState<string | undefined>()
  const [loadingMore, setLoadingMore] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [hideUnverified, setHideUnverified] = useState(false)
  const [briefings, setBriefings] = useState<Editorial[]>([])
  const [briefingsLoading, setBriefingsLoading] = useState(false)
  const briefingsFetchedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── DexScreener batch fetch ─────────────────────────────────────────────────
  const fetchDex = useCallback(async (list: ClankerToken[]): Promise<Map<string, DexData>> => {
    const map = new Map<string, DexData>()
    if (list.length === 0) return map
    try {
      const addresses = list.map(t => t.contract_address).join(',')
      const res = await fetch(`/api/dexscreener/tokens/v1/base/${addresses}`)
      if (!res.ok) return map
      const rawPairs = (await res.json()) as DexScreenerPair[]
      const pairs = Array.isArray(rawPairs) ? rawPairs : []
      // Group by base token address, take most liquid pair
      const grouped = new Map<string, DexScreenerPair>()
      for (const pair of pairs) {
        if (!pair?.baseToken?.address) continue
        const addr = pair.baseToken.address.toLowerCase()
        const existing = grouped.get(addr)
        if (!existing || (pair.liquidity?.usd ?? 0) > (existing.liquidity?.usd ?? 0)) {
          grouped.set(addr, pair)
        }
      }
      for (const [addr, pair] of grouped) {
        map.set(addr, {
          priceUsd: pair.priceUsd ?? '0',
          volH1: pair.volume?.h1 ?? 0,
          volH24: pair.volume?.h24 ?? 0,
          liquidity: pair.liquidity?.usd ?? 0,
          changeH1: pair.priceChange?.h1 ?? 0,
        })
      }
    } catch {
      // dex fetch failed — tokens will show dexFailed flag
    }
    return map
  }, [])

  // ── Clanker + DexScreener combined fetch ────────────────────────────────────
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
      const incoming: ClankerToken[] = json.data ?? []

      // Fetch DexScreener in parallel
      const dexMap = await fetchDex(incoming)
      const dexFailed = dexMap.size === 0 && incoming.length > 0

      const enriched: EnrichedToken[] = incoming.map(t => ({
        ...t,
        dex: dexMap.get(t.contract_address.toLowerCase()),
        dexFailed: dexFailed,
      }))

      setTokens(prev => append ? [...prev, ...enriched] : enriched)
      setCursor(json.nextCursor)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch {
      if (!append) setError(true)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [fetchDex])

  // Fetch briefings when Briefing tab is opened
  useEffect(() => {
    if (activeTab !== 'Briefing' || briefingsFetchedRef.current) return
    briefingsFetchedRef.current = true
    setBriefingsLoading(true)
    fetchBriefings()
      .then(setBriefings)
      .finally(() => setBriefingsLoading(false))
  }, [activeTab])

  // Initial load + 30s polling
  useEffect(() => {
    fetchTokens()
    intervalRef.current = setInterval(() => fetchTokens(), 30_000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [fetchTokens])

  // ── Volume filter — only apply if DexScreener data exists ─────────────────
  const visibleTokens = tokens.filter(t => {
    if (t.dex !== undefined) {
      const age = ageMinutes(t.created_at)
      if (age <= 15 && t.dex.volH1 < 100) return false
    }
    if (hideUnverified && !isTrusted(t)) return false
    return true
  })

  // ── Trending = sort by market cap ───────────────────────────────────────────
  const trendingTokens = [...visibleTokens].sort(
    (a, b) => (b.related?.market?.marketCap ?? 0) - (a.related?.market?.marketCap ?? 0)
  )

  const displayedTokens = activeTab === 'Trending' ? trendingTokens : visibleTokens

  // ── Sidebar: top 5 by DexScreener vol h1 (skip tokens with no dex data) ───
  const sidebarTop5 = [...tokens]
    .filter(t => t.dex !== undefined && t.dex.volH1 > 0)
    .sort((a, b) => (b.dex?.volH1 ?? 0) - (a.dex?.volH1 ?? 0))
    .slice(0, 5)

  const useDexSidebar = sidebarTop5.length > 0
  const sidebarFallback: EnrichedToken[] = []

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
            <div>
              {/* Filter bar */}
              {activeTab !== 'Briefing' && (
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => setHideUnverified(v => !v)}
                    className={`inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                      hideUnverified
                        ? 'border-amber-400/40 bg-amber-400/10 text-amber-400/80'
                        : 'border-white/[0.1] bg-white/[0.03] text-white/30 hover:text-white/60'
                    }`}
                  >
                    <span>{hideUnverified ? '✓' : '○'}</span>
                    Hide Unverified
                  </button>
                  {!loading && (
                    <span className="text-[10px] font-mono text-white/20">
                      {displayedTokens.length} tokens
                    </span>
                  )}
                </div>
              )}

              <div className="columns-1 gap-3">
                {activeTab === 'Briefing' && <BriefingList items={briefings} loading={briefingsLoading} />}

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

                    {!loading && !error && displayedTokens.length > 0 && (
                      <div className="pt-6 text-center break-inside-avoid">
                        {activeTab === 'Trending' ? (
                          <button
                            onClick={() => fetchTokens()}
                            className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono tracking-wide"
                          >
                            ↻ refresh
                          </button>
                        ) : loadingMore ? (
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
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 hidden lg:block">

              {/* Trending on Base */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm tracking-wide">Trending on Base</h3>
                  {useDexSidebar && (
                    <span className="text-[9px] font-mono text-green-400/60 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                      live
                    </span>
                  )}
                </div>
                <div className="space-y-3.5">
                  {loading && Array.from({ length: 5 }).map((_, i) => <SidebarSkeletonRow key={i} />)}
                  {!loading && (useDexSidebar ? sidebarTop5 : sidebarFallback).map((t, i) => (
                    <a
                      key={t.id}
                      href={`https://www.clanker.world/clanker/${t.contract_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <span className="text-[10px] font-mono text-white/20 w-3 text-right">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-xs font-semibold truncate">${t.symbol}</div>
                        <div className="text-white/25 text-[10px] font-mono">
                          {t.dex ? `Vol 1h: ${fmtVol(t.dex.volH1)}` : ''}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {t.dex && (
                          <div className={`text-xs font-mono ${t.dex.changeH1 >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {t.dex.changeH1 >= 0 ? '+' : ''}{t.dex.changeH1.toFixed(1)}%
                          </div>
                        )}
                        <div className="text-white/25 text-[10px] font-mono">{t.dex ? fmtPrice(t.dex.priceUsd) : timeAgo(t.created_at)}</div>
                      </div>
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-white/20 font-mono">via DexScreener</p>
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
