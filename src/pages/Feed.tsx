import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { streamPosts, briefingPosts, launchPosts, type FeedPost } from '../data/feedPosts'

const TABS = ['Stream', 'Briefing', 'Launches'] as const
type Tab = typeof TABS[number]

const FARCASTER_EPOCH = 1609459200
const HUB = 'https://hub.pinata.cloud'
const CHANNELS = ['base', 'degen', 'higher', 'clanker', 'onchain', 'crypto']
const AVATAR_COLORS = ['#2151f5', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626']

function timeAgo(isoTs: string): string {
  const diff = Date.now() - new Date(isoTs).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  return `${Math.floor(h / 24)}d`
}

function extractTag(text: string): string | undefined {
  const lower = text.toLowerCase()
  if (lower.includes('launch') || lower.includes('token')) return 'Token'
  if (lower.includes('base chain') || lower.includes('onbase')) return 'Base'
  if (lower.includes('defi') || lower.includes('yield')) return 'DeFi'
  if (lower.includes('nft')) return 'NFT'
  if (lower.includes('ai') || lower.includes('artificial intelligence')) return 'AI'
  return undefined
}

interface HubMessage {
  data: {
    fid: number
    timestamp: number
    castAddBody: { text: string; embeds: { url?: string }[] }
  }
  hash: string
}

interface LivePost {
  id: string
  author: { name: string; handle: string; initials: string; color: string; verified: boolean }
  content: string
  timestamp: string
  likes: number
  reposts: number
  comments: number
  tag?: string
  url: string
  source: 'farcaster'
}

interface GeckoPool {
  attributes: {
    name: string
    base_token_price_usd: string
    volume_usd: { h24: string }
    price_change_percentage: { h24: string }
    transactions: { h24: { buys: number; sells: number } }
  }
}

interface TrendingToken {
  symbol: string
  change: string
  vol: string
  buys: number
}

function LivePostCard({ post }: { post: LivePost }) {
  return (
    <div className="relative mb-3 break-inside-avoid">
      <a href={post.url} target="_blank" rel="noopener noreferrer"
        className="block rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all p-4 cursor-pointer">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 select-none"
            style={{ backgroundColor: post.author.color }}>
            {post.author.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className="font-bold text-white text-[0.8125rem] leading-none">{post.author.name}</span>
              <span className="text-white/30 text-xs">@{post.author.handle}</span>
              <span className="text-white/20 text-[10px]">·</span>
              <span className="text-white/30 text-xs">{post.timestamp}</span>
              {post.tag && (
                <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-full">
                  {post.tag}
                </span>
              )}
            </div>
            <p className="text-white/75 text-[0.8125rem] leading-relaxed whitespace-pre-line line-clamp-6">{post.content}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] font-mono text-white/20 flex items-center gap-1">
                <svg className="w-3 h-3" viewBox="0 0 1000 1000" fill="currentColor">
                  <path d="M257.778 155.556h484.444v688.889h-71.111v-244.445h-0.697c-7.056-85.189-78.308-151.111-165.414-151.111-87.107 0-158.359 65.922-165.414 151.111h-0.697v244.445h-81.111V155.556zM128.889 253.333l42.222 177.778h35.556V688.89h71.111V431.111h26.667V253.333H128.889zM771.111 253.333v177.778h26.667V688.89h71.111V431.111h35.556l42.222-177.778H771.111z" />
                </svg>
                Open on Warpcast
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

function StaticPostCard({ post }: { post: FeedPost }) {
  return (
    <div className="relative mb-3 break-inside-avoid">
      <div className="absolute bottom-3 right-3 z-10 flex gap-1">
        <button type="button" aria-label="Upvote"
          className="inline-flex items-center rounded-full border backdrop-blur-sm transition-colors h-7 w-7 justify-center border-white/20 bg-[#060a10]/85 text-white/50 hover:text-white hover:border-white/40">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        </button>
      </div>
      <div className="block rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 select-none" style={{ backgroundColor: post.author.color }}>
            {post.author.initials}
          </div>
          <div className="flex-1 min-w-0 pr-16">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              <span className="font-bold text-white text-[0.8125rem] leading-none">{post.author.name}</span>
              {post.author.verified && (
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" style={{ color: post.author.color }}>
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              <span className="text-white/30 text-xs">@{post.author.handle}</span>
              <span className="text-white/20 text-[10px]">·</span>
              <span className="text-white/30 text-xs">{post.timestamp}</span>
              {post.tag && (
                <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-full">{post.tag}</span>
              )}
            </div>
            <p className="text-white/75 text-[0.8125rem] leading-relaxed whitespace-pre-line">{post.content}</p>
            <div className="flex items-center gap-5 text-white/25 mt-3">
              <span className="flex items-center gap-1.5 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                {post.comments}
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                {post.reposts}
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {post.likes >= 1000 ? `${(post.likes / 1000).toFixed(post.likes >= 10000 ? 0 : 1)}K` : post.likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('Stream')
  const [livePosts, setLivePosts] = useState<LivePost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [trendingTokens, setTrendingTokens] = useState<TrendingToken[]>([])
  const [lastUpdated, setLastUpdated] = useState<string>('')

  const fetchFarcasterFeed = useCallback(async () => {
    setLoadingPosts(true)
    try {
      const results = await Promise.allSettled(
        CHANNELS.map(ch =>
          fetch(`${HUB}/v1/castsByParent?url=https://warpcast.com/~/channel/${ch}&pageSize=20`)
            .then(r => r.json())
        )
      )

      const allCasts: HubMessage[] = results.flatMap(r =>
        r.status === 'fulfilled' ? (r.value.messages || []) : []
      )

      allCasts.sort((a, b) => b.data.timestamp - a.data.timestamp)

      const seen = new Set<string>()
      const unique = allCasts.filter(c => {
        if (seen.has(c.hash)) return false
        seen.add(c.hash)
        return c.data.castAddBody?.text?.length > 10
      }).slice(0, 40)

      const fidSet = new Set(unique.map(c => c.data.fid))
      const userMap = new Map<number, { username: string; displayName: string }>()

      await Promise.allSettled(
        Array.from(fidSet).map(async fid => {
          try {
            const [uRes, dRes] = await Promise.all([
              fetch(`${HUB}/v1/userDataByFid?fid=${fid}&user_data_type=USER_DATA_TYPE_USERNAME`).then(r => r.json()),
              fetch(`${HUB}/v1/userDataByFid?fid=${fid}&user_data_type=USER_DATA_TYPE_DISPLAY`).then(r => r.json()),
            ])
            userMap.set(fid, {
              username: uRes.data?.userDataBody?.value || `fid${fid}`,
              displayName: dRes.data?.userDataBody?.value || uRes.data?.userDataBody?.value || `User ${fid}`,
            })
          } catch {
            userMap.set(fid, { username: `fid${fid}`, displayName: `User ${fid}` })
          }
        })
      )

      const mapped: LivePost[] = unique.map(cast => {
        const fid = cast.data.fid
        const user = userMap.get(fid) || { username: `fid${fid}`, displayName: `User ${fid}` }
        const tsMs = (cast.data.timestamp + FARCASTER_EPOCH) * 1000
        const name = user.displayName
        return {
          id: cast.hash,
          author: {
            name,
            handle: user.username,
            initials: name.substring(0, 2).toUpperCase(),
            color: AVATAR_COLORS[fid % AVATAR_COLORS.length],
            verified: false,
          },
          content: cast.data.castAddBody.text,
          timestamp: timeAgo(new Date(tsMs).toISOString()),
          likes: 0,
          reposts: 0,
          comments: 0,
          tag: extractTag(cast.data.castAddBody.text),
          url: `https://warpcast.com/~/cast/${cast.hash}`,
          source: 'farcaster',
        }
      })

      setLivePosts(mapped)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch {
      // silent fail, keep existing posts
    } finally {
      setLoadingPosts(false)
    }
  }, [])

  const fetchTrendingTokens = useCallback(async () => {
    try {
      const res = await fetch('https://api.geckoterminal.com/api/v2/networks/base/trending_pools?page=1', {
        headers: { accept: 'application/json;version=20230302' },
      })
      if (!res.ok) return
      const data = await res.json() as { data: GeckoPool[] }
      const pools = data.data || []
      const mapped: TrendingToken[] = pools.slice(0, 5).map((p) => {
        const name = p.attributes.name.split('/')[0].trim()
        const change = parseFloat(p.attributes.price_change_percentage?.h24 || '0')
        const vol = parseFloat(p.attributes.volume_usd?.h24 || '0')
        return {
          symbol: name.length > 10 ? name.substring(0, 10) : name,
          change: `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
          vol: vol >= 1000000 ? `$${(vol / 1000000).toFixed(1)}M` : vol >= 1000 ? `$${(vol / 1000).toFixed(0)}K` : `$${vol.toFixed(0)}`,
          buys: p.attributes.transactions?.h24?.buys || 0,
        }
      })
      setTrendingTokens(mapped)
    } catch {
      // use fallback
    }
  }, [])

  useEffect(() => {
    fetchFarcasterFeed()
    fetchTrendingTokens()
    const interval = setInterval(() => {
      fetchFarcasterFeed()
      fetchTrendingTokens()
    }, 60000)
    return () => clearInterval(interval)
  }, [fetchFarcasterFeed, fetchTrendingTokens])

  const staticPosts =
    activeTab === 'Briefing' ? briefingPosts :
    activeTab === 'Launches' ? launchPosts :
    streamPosts

  const showLive = activeTab === 'Stream' && livePosts.length > 0

  const fallbackTokens = [
    { symbol: 'HIGHER', change: '+847%', vol: '$4.2M', buys: 203 },
    { symbol: 'DEGEN', change: '+24%', vol: '$12.1M', buys: 890 },
    { symbol: 'ENJOY', change: '+112%', vol: '$2.8M', buys: 312 },
    { symbol: 'NOUN', change: '+67%', vol: '$1.9M', buys: 145 },
    { symbol: 'BASED', change: '+34%', vol: '$3.4M', buys: 267 },
  ]
  const tokens = trendingTokens.length > 0 ? trendingTokens : fallbackTokens

  return (
    <div className="flex min-h-screen flex-col bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-10">
            <div className="hidden md:flex md:items-center gap-2">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/25">Base chain intelligence</p>
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
                    <button role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)}
                      className={`relative z-[1] min-h-[44px] cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === tab ? 'text-[#7ba5ff]' : 'text-white/40 hover:text-white/80'
                      }`}>
                      {tab}
                      {tab === 'Stream' && <span className="ml-1.5 inline-flex w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden md:flex md:items-center md:justify-end">
              <a href="https://clanker.world" target="_blank" rel="noopener noreferrer"
                className="text-sm text-white/30 hover:text-white transition-colors font-medium">
                Launch token →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div className="columns-1 gap-3">
              {loadingPosts && livePosts.length === 0 && (
                <div className="flex items-center justify-center py-10 gap-2 text-white/30 text-sm font-mono">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Loading Farcaster…
                </div>
              )}
              {showLive
                ? livePosts.map((p) => <LivePostCard key={p.id} post={p} />)
                : !loadingPosts && staticPosts.map(p => <StaticPostCard key={p.id} post={p} />)
              }
              {!loadingPosts && (
                <div className="pt-6 text-center break-inside-avoid">
                  <button onClick={() => { fetchFarcasterFeed(); fetchTrendingTokens() }}
                    className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono tracking-wide">
                    {showLive ? '↻ refresh' : 'load more'}
                  </button>
                </div>
              )}
            </div>

            <aside className="space-y-5 hidden lg:block">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm tracking-wide">Trending on Base</h3>
                  {trendingTokens.length > 0 && (
                    <span className="text-[9px] font-mono text-green-400/60 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />live
                    </span>
                  )}
                </div>
                <div className="space-y-3.5">
                  {tokens.map((t, i) => (
                    <div key={t.symbol} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/20 w-3 text-right">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-xs font-semibold">${t.symbol}</div>
                        <div className="text-white/25 text-[10px] font-mono">{t.buys} buys 24h</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-mono ${t.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{t.change}</div>
                        <div className="text-white/25 text-[10px] font-mono">{t.vol}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a href="https://www.geckoterminal.com/base/trending-pools" target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex text-[10px] text-white/20 hover:text-white/50 transition-colors font-mono">
                  via GeckoTerminal →
                </a>
              </div>

              <div className="rounded-2xl border border-[#2151f5]/25 bg-[#2151f5]/5 p-5">
                <h3 className="text-white font-semibold text-sm mb-1.5">Launch on Base</h3>
                <p className="text-white/40 text-xs mb-4 leading-relaxed">Deploy with instant Uniswap v3 liquidity. Takes 60 seconds.</p>
                <a href="https://clanker.world" target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2151f5] text-white text-xs font-semibold rounded-lg hover:bg-[#1a41d4] transition-colors">
                  Launch on Clanker
                </a>
              </div>

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

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Follow Alcreon</h3>
                <div className="space-y-2">
                  <a href="https://x.com/alcreonxyz" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
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
                  <a href="https://warpcast.com/alcreon" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
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
