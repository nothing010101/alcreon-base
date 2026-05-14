import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { streamPosts, briefingPosts, type FeedPost } from '../data/feedPosts'

const TABS = ['Stream', 'Briefing', 'Launches'] as const
type Tab = typeof TABS[number]

function Avatar({ initials, size = 'md' }: { initials: string; size?: 'sm' | 'md' }) {
  const colors: Record<string, string> = {
    JP: 'bg-blue-600', CW: 'bg-base-blue', LX: 'bg-purple-600',
    AL: 'bg-base-blue', HA: 'bg-pink-600', DL: 'bg-orange-500',
    P6: 'bg-zinc-500', VB: 'bg-indigo-600', BK: 'bg-red-600',
  }
  const bg = colors[initials] || 'bg-zinc-600'
  const sz = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
  return (
    <div className={`${sz} ${bg} rounded-full flex items-center justify-center font-mono font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  )
}

function PostCard({ post }: { post: FeedPost }) {
  return (
    <article className="py-5 border-b border-white/[0.07] hover:bg-white/[0.02] transition-colors px-2 -mx-2 rounded-lg">
      <div className="flex gap-3">
        <Avatar initials={post.author.avatar} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1 flex-wrap">
            <span className="font-medium text-white text-sm">{post.author.name}</span>
            {post.author.verified && (
              <svg className="w-3.5 h-3.5 text-base-blue flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="text-white/30 text-sm">@{post.author.handle}</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-white/30 text-xs">{post.timestamp}</span>
            {post.tag && (
              <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-base-light bg-base-blue/10 border border-base-blue/20 px-2 py-0.5 rounded-full">
                {post.tag}
              </span>
            )}
          </div>

          <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-3">
            {post.content}
          </p>

          {post.tokenMention && (
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono mb-3 ${
              post.tokenMention.positive
                ? 'bg-green-500/10 border-green-500/20 text-green-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <span className="text-white/60">${post.tokenMention.symbol}</span>
              <span>{post.tokenMention.change}</span>
            </div>
          )}

          <div className="flex items-center gap-5 text-white/30">
            <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors group text-xs">
              <svg className="w-3.5 h-3.5 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 2l4 4-4 4M3 11v-1a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v1a4 4 0 01-4 4H3" />
              </svg>
              {post.reposts}
            </button>
            <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors group text-xs">
              <svg className="w-3.5 h-3.5 group-hover:text-pink-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes.toLocaleString()}
            </button>
            <button className="flex items-center gap-1.5 hover:text-white/60 transition-colors text-xs">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState<Tab>('Stream')

  const posts = activeTab === 'Briefing' ? briefingPosts : streamPosts

  return (
    <div className="flex min-h-screen flex-col bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" className="flex-1 overflow-x-clip">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-20">
          <div className="space-y-6">
            <div className="pb-8">
              {/* Tab nav — centered like original */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="hidden md:flex md:items-center">
                  <p className="label-mono">Base chain intelligence</p>
                </div>
                <nav className="mx-auto w-fit rounded-xl border border-white/[0.1] bg-white/[0.04] p-1">
                  <ul className="flex gap-1" role="tablist" aria-label="Feed sections">
                    {TABS.map(tab => (
                      <li key={tab} className="relative" role="presentation">
                        {activeTab === tab && (
                          <div className="absolute inset-0 rounded-lg bg-base-blue/15" />
                        )}
                        <button
                          role="tab"
                          aria-selected={activeTab === tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative z-[1] min-h-[44px] cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                            activeTab === tab ? 'text-base-light' : 'text-white/50 hover:text-white'
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
                    className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors font-medium">
                    Launch token →
                  </a>
                </div>
              </div>
            </div>

            {/* Feed layout: main + sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
              {/* Posts */}
              <div>
                {posts.map(post => <PostCard key={post.id} post={post} />)}
                <div className="pt-8 text-center">
                  <button className="text-sm text-white/30 hover:text-white transition-colors font-mono">
                    Load more ↓
                  </button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6 hidden lg:block">
                {/* Trending tokens */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <h3 className="font-serif text-white text-lg mb-4">Trending on Base</h3>
                  <div className="space-y-3">
                    {[
                      { symbol: 'HIGHER', name: 'Higher', change: '+847%', vol: '$4.2M' },
                      { symbol: 'DEGEN', name: 'Degen', change: '+24%', vol: '$12.1M' },
                      { symbol: 'ENJOY', name: 'Enjoy', change: '+112%', vol: '$2.8M' },
                      { symbol: 'NOUN', name: 'Noun', change: '+67%', vol: '$1.9M' },
                      { symbol: 'BASED', name: 'Based', change: '+34%', vol: '$3.4M' },
                    ].map((t, i) => (
                      <div key={t.symbol} className="flex items-center gap-3">
                        <span className="label-mono w-4">{i + 1}</span>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">${t.symbol}</div>
                          <div className="label-mono">{t.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 text-xs font-mono">{t.change}</div>
                          <div className="label-mono">{t.vol}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch CTA */}
                <div className="rounded-2xl border border-base-blue/20 bg-base-blue/5 p-5">
                  <h3 className="font-serif text-white text-lg mb-2">Launch on Base</h3>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">Deploy your token with instant liquidity via Clanker in under 60 seconds.</p>
                  <a href="https://clanker.world" target="_blank" rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-base-blue text-white text-sm font-medium rounded-lg hover:bg-base-light transition-colors">
                    Launch on Clanker →
                  </a>
                </div>

                {/* Editorials */}
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <h3 className="font-serif text-white text-lg mb-4">Latest Editorials</h3>
                  <div className="space-y-4">
                    {[
                      'Why Farcaster-native tokens outperform by 3–7x',
                      "Clanker's fee architecture: who wins",
                      'The next 100 viral tokens will be born on Base',
                    ].map((title, i) => (
                      <Link key={i} to="/editorials" className="block group">
                        <p className="text-white/70 text-sm leading-snug group-hover:text-white transition-colors">{title}</p>
                      </Link>
                    ))}
                  </div>
                  <Link to="/editorials" className="mt-4 inline-flex text-sm text-base-light hover:text-white transition-colors">
                    All editorials →
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
