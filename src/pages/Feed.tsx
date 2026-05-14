import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { streamPosts, briefingPosts, launchPosts, type FeedPost } from '../data/feedPosts'

const TABS = ['Stream', 'Briefing', 'Launches'] as const
type Tab = typeof TABS[number]

function Avatar({ post }: { post: FeedPost }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 select-none"
      style={{ backgroundColor: post.author.color }}
    >
      {post.author.initials}
    </div>
  )
}

function LinkCard({ link }: { link: NonNullable<FeedPost['link']> }) {
  return (
    <div className="mt-3 rounded-xl border border-white/[0.1] overflow-hidden">
      <div className="p-3">
        <span className="text-xs text-white/30">{link.domain}</span>
        <h4 className="text-sm font-semibold leading-snug line-clamp-2 text-white/90 mt-0.5">{link.title}</h4>
        {link.description && (
          <p className="text-xs text-white/40 leading-relaxed line-clamp-2 mt-0.5">{link.description}</p>
        )}
      </div>
    </div>
  )
}

function QuoteCard({ quote }: { quote: NonNullable<FeedPost['quote']> }) {
  return (
    <div className="mt-3 rounded-xl border border-white/[0.1] p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="font-bold text-xs text-white/80">{quote.author}</span>
        <span className="text-white/30 text-xs">@{quote.handle}</span>
      </div>
      <p className="text-sm text-white/60 leading-relaxed line-clamp-4">{quote.content}</p>
    </div>
  )
}

function PostCard({ post }: { post: FeedPost }) {
  return (
    <div className="relative mb-3 break-inside-avoid">
      <div className="absolute bottom-3 right-3 z-10 flex gap-1">
        <button
          type="button"
          aria-label="Upvote"
          className="inline-flex items-center rounded-full border backdrop-blur-sm transition-colors h-7 w-7 justify-center border-white/20 bg-[#060a10]/85 text-white/50 hover:text-white hover:border-white/40"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 10v12" /><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Downvote"
          className="inline-flex items-center rounded-full border backdrop-blur-sm transition-colors h-7 w-7 justify-center border-white/20 bg-[#060a10]/85 text-white/50 hover:text-white hover:border-white/40"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 14V2" /><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
          </svg>
        </button>
      </div>

      <a
        href="#"
        className="block rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all p-4 cursor-pointer"
        onClick={e => e.preventDefault()}
      >
        <div className="flex gap-3">
          <Avatar post={post} />
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
                <span className="ml-auto text-[9px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded-full">
                  {post.tag}
                </span>
              )}
            </div>

            <p className="text-white/75 text-[0.8125rem] leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {post.link && <LinkCard link={post.link} />}
            {post.quote && <QuoteCard quote={post.quote} />}

            <div className="flex items-center gap-5 text-white/25 mt-3">
              <span className="flex items-center gap-1.5 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                {post.comments}
              </span>
              <span className="flex items-center gap-1.5 text-xs">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
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
      </a>
    </div>
  )
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('Stream')

  const posts =
    activeTab === 'Briefing' ? briefingPosts :
    activeTab === 'Launches' ? launchPosts :
    streamPosts

  return (
    <div className="flex min-h-screen flex-col bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">

          {/* Tab nav — centered */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-10">
            <div className="hidden md:flex md:items-center">
              <p className="text-[10px] font-mono uppercase tracking-widest text-white/25">Base chain intelligence</p>
            </div>
            <nav className="mx-auto w-fit rounded-xl border border-white/[0.1] bg-white/[0.03] p-1">
              <ul className="flex gap-1" role="tablist" aria-label="Feed sections">
                {TABS.map(tab => (
                  <li key={tab} className="relative" role="presentation">
                    {activeTab === tab && (
                      <div className="absolute inset-0 rounded-lg bg-[#2151f5]/15" />
                    )}
                    <button
                      role="tab"
                      aria-selected={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative z-[1] min-h-[44px] cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeTab === tab ? 'text-[#7ba5ff]' : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {tab}
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

          {/* Main content + sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

            {/* Posts — masonry on larger screens */}
            <div className="columns-1 sm:columns-1 gap-3">
              {posts.map(post => <PostCard key={post.id} post={post} />)}
              <div className="pt-6 text-center break-inside-avoid">
                <button className="text-xs text-white/20 hover:text-white/50 transition-colors font-mono tracking-wide">
                  load more
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5 hidden lg:block">
              {/* Trending */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Trending on Base</h3>
                <div className="space-y-3.5">
                  {[
                    { symbol: 'HIGHER', change: '+847%', vol: '$4.2M', holders: '14.2K' },
                    { symbol: 'DEGEN', change: '+24%', vol: '$12.1M', holders: '89K' },
                    { symbol: 'ENJOY', change: '+112%', vol: '$2.8M', holders: '31K' },
                    { symbol: 'NOUN', change: '+67%', vol: '$1.9M', holders: '8.4K' },
                    { symbol: 'BASED', change: '+34%', vol: '$3.4M', holders: '22K' },
                  ].map((t, i) => (
                    <div key={t.symbol} className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/20 w-3 text-right">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-xs font-semibold">${t.symbol}</div>
                        <div className="text-white/25 text-[10px] font-mono">{t.holders} holders</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 text-xs font-mono">{t.change}</div>
                        <div className="text-white/25 text-[10px] font-mono">{t.vol}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Launch CTA */}
              <div className="rounded-2xl border border-[#2151f5]/25 bg-[#2151f5]/5 p-5">
                <h3 className="text-white font-semibold text-sm mb-1.5">Launch on Base</h3>
                <p className="text-white/40 text-xs mb-4 leading-relaxed">Deploy with instant Uniswap v3 liquidity. Takes 60 seconds.</p>
                <a href="https://clanker.world" target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#2151f5] text-white text-xs font-semibold rounded-lg hover:bg-[#1a41d4] transition-colors">
                  Launch on Clanker
                </a>
              </div>

              {/* Latest Editorials */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                <h3 className="text-white font-semibold text-sm mb-4 tracking-wide">Latest Editorials</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Why Farcaster-native tokens outperform by 3–7x', tag: 'Analysis' },
                    { title: 'Clanker\'s fee architecture: who actually wins', tag: 'Deep Dive' },
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
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
