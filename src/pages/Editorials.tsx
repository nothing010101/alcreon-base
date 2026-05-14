import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { editorials, CATEGORIES, type Category } from '../data/editorials'

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-7 h-7 bg-base-blue rounded-full flex items-center justify-center font-mono font-bold text-white text-xs flex-shrink-0">
      {initials}
    </div>
  )
}

export default function Editorials() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? editorials
    : editorials.filter(e => e.category === activeCategory)

  const featured = editorials.find(e => e.featured)
  const rest = filtered.filter(e => !e.featured)

  return (
    <div className="flex min-h-screen flex-col bg-[#060a10]">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content" className="flex-1 overflow-x-clip">
        {/* Page header — matches original exactly */}
        <header className="pb-16 pt-24 text-center">
          <h1 className="font-bold text-white leading-[1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)' }}>
            Editorials
          </h1>
          <p className="mt-4 text-white/40 text-base max-w-md mx-auto font-body">
            Independent analysis on token launches, Base chain strategy, and on-chain intelligence.
          </p>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-8">
          {/* Category tab nav */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 mb-12">
            <div className="hidden md:block" />
            <nav className="mx-auto w-fit rounded-xl border border-white/[0.1] bg-white/[0.04] p-1">
              <ul className="flex gap-1 flex-wrap justify-center" role="tablist">
                {CATEGORIES.map(cat => (
                  <li key={cat} className="relative" role="presentation">
                    {activeCategory === cat && (
                      <div className="absolute inset-0 rounded-lg bg-base-blue/15" />
                    )}
                    <button
                      role="tab"
                      aria-selected={activeCategory === cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative z-[1] min-h-[44px] cursor-pointer rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                        activeCategory === cat ? 'text-base-light' : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="hidden md:block" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-20">
          {/* Featured editorial */}
          {featured && activeCategory === 'All' && (
            <article className="group mb-12 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 transition-all overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-base-light bg-base-blue/10 border border-base-blue/20 px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">
                    {featured.tag}
                  </span>
                </div>
                <h2 className="font-serif text-white leading-[1.15] tracking-tight mb-4 group-hover:text-white/90 transition-colors"
                  style={{ fontSize: 'clamp(1.5rem,3vw,2.25rem)' }}>
                  {featured.title}
                </h2>
                <p className="text-white/50 text-base leading-relaxed mb-6 max-w-2xl">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <Avatar initials={featured.avatar} />
                  <span className="text-white/60 text-sm">{featured.author}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="label-mono">{featured.date}</span>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="label-mono">{featured.readTime} read</span>
                </div>
              </div>
            </article>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(editorial => (
              <article key={editorial.slug}
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-white/15 transition-all p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 bg-white/[0.05] px-2.5 py-1 rounded-full">
                    {editorial.tag}
                  </span>
                </div>
                <h3 className="font-serif text-white text-xl leading-[1.2] tracking-tight mb-3 flex-1 group-hover:text-white/90 transition-colors">
                  {editorial.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-5 line-clamp-3">
                  {editorial.excerpt}
                </p>
                <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                  <Avatar initials={editorial.avatar} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white/60 text-xs">{editorial.author}</div>
                    <div className="label-mono">{editorial.date} · {editorial.readTime}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30 font-body">
              No editorials in this category yet.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
