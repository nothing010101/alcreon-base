export interface Editorial {
  slug: string
  tag: string
  category: string
  title: string
  excerpt: string
  author: string
  authorHandle: string
  avatar: string
  date: string
  readTime: string
  featured?: boolean
}

export const editorials: Editorial[] = [
  {
    slug: 'farcaster-native-tokens',
    tag: 'Analysis',
    category: 'Playbook',
    title: 'Why Farcaster-native tokens outperform cold launches by 3–7x in first-week volume',
    excerpt: 'The social graph is the distribution layer. Tokens launched into an existing Warpcast audience inherit built-in momentum that no amount of paid promotion can replicate. Here\'s the data.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 14, 2026',
    readTime: '8 min',
    featured: true,
  },
  {
    slug: 'clanker-fee-architecture',
    tag: 'Deep Dive',
    category: 'Playbook',
    title: "Clanker's fee architecture: who wins, who pays, and why it matters for your launch",
    excerpt: 'Most launchers never read the fee docs. A detailed breakdown of how Clanker\'s liquidity provisioning and fee model compares to direct Uniswap v3 deployments — and the hidden advantages most miss.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 12, 2026',
    readTime: '11 min',
    featured: false,
  },
  {
    slug: 'next-100-viral-tokens',
    tag: 'Macro',
    category: 'Analysis',
    title: 'Why the next 100 viral tokens will be born on Base',
    excerpt: 'The convergence of Clanker\'s permissionless infrastructure and Base\'s growing liquidity depth creates a compounding flywheel that no other chain can replicate right now.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 10, 2026',
    readTime: '7 min',
    featured: false,
  },
  {
    slug: 'holder-retention-data',
    tag: 'Data',
    category: 'Analysis',
    title: 'Base token holder retention is at an all-time high. Here\'s what the data shows',
    excerpt: '60-day holder retention on Base is now 61% — 3× higher than comparable L2 launches 18 months ago. We dug into why.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 8, 2026',
    readTime: '6 min',
    featured: false,
  },
  {
    slug: 'organic-distribution-wins',
    tag: 'Playbook',
    category: 'Playbook',
    title: 'Organic distribution beats marketing budgets every time. The $CLANK case study',
    excerpt: 'Zero marketing spend. Zero influencer deals. 12,000 organic holders in 48 hours. How $CLANK did it, and what every launcher can learn from the approach.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 6, 2026',
    readTime: '9 min',
    featured: false,
  },
  {
    slug: 'base-attention-economy',
    tag: 'Analysis',
    category: 'Analysis',
    title: 'The attention economy of Base: why timing your launch matters more than your tokenomics',
    excerpt: 'We analyzed 14,000 Clanker launches over 90 days. Launch timing — day of week, hour, Farcaster activity context — predicts first-week performance as strongly as initial liquidity.',
    author: 'Alcreon',
    authorHandle: 'alcreon',
    avatar: 'AL',
    date: 'May 4, 2026',
    readTime: '10 min',
    featured: false,
  },
]

export const CATEGORIES = ['All', 'Playbook', 'Analysis', 'Data', 'Deep Dive'] as const
export type Category = typeof CATEGORIES[number]
