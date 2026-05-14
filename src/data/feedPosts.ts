export interface FeedPost {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
    verified?: boolean
  }
  content: string
  timestamp: string
  reposts: number
  likes: number
  tag?: string
  tokenMention?: {
    symbol: string
    change: string
    positive: boolean
  }
}

export const streamPosts: FeedPost[] = [
  {
    id: '1',
    author: { name: 'Jesse Pollak', handle: 'jessepollak', avatar: 'JP', verified: true },
    content: 'Base is the home for the next billion onchain users. Every token launched via Clanker is a step toward a world where anyone can create economic primitives, not just institutions.',
    timestamp: '2m ago',
    reposts: 312,
    likes: 2841,
    tag: 'Base',
  },
  {
    id: '2',
    author: { name: 'clanker.eth', handle: 'clanker_world', avatar: 'CW', verified: true },
    content: '$DEGEN just crossed 10,000 holders on Base. This is what permissionless token infrastructure looks like when it works. No whitelist. No KYC. Just vibes and liquidity.',
    timestamp: '8m ago',
    reposts: 89,
    likes: 743,
    tag: 'Launch',
    tokenMention: { symbol: 'DEGEN', change: '+24.3%', positive: true },
  },
  {
    id: '3',
    author: { name: 'Linda Xie', handle: 'ljxie', avatar: 'LX' },
    content: 'The thing people miss about Clanker is not just the speed of deployment — it\'s the instant Uniswap v3 LP provisioning. You\'re not launching a token into a vacuum. You\'re launching into a market.',
    timestamp: '14m ago',
    reposts: 156,
    likes: 1203,
  },
  {
    id: '4',
    author: { name: 'Alcreon', handle: 'alcreon', avatar: 'AL', verified: true },
    content: 'Weekly Base token launch report: 3,847 new tokens deployed this week via Clanker. Top performer: $HIGHER (+847% 7d). Most unique holders gained: $BASED (+12,400 addresses). Full analysis in Editorials →',
    timestamp: '31m ago',
    reposts: 204,
    likes: 1876,
    tag: 'Report',
  },
  {
    id: '5',
    author: { name: 'Hayden Adams', handle: 'haydenzadams', avatar: 'HA', verified: true },
    content: 'Watching Base token volumes this week is genuinely exciting. The combination of low fees + Clanker\'s automated LP = a completely different user experience than any previous token launch ecosystem.',
    timestamp: '45m ago',
    reposts: 71,
    likes: 892,
  },
  {
    id: '6',
    author: { name: 'Defi Llama', handle: 'defillama', avatar: 'DL', verified: true },
    content: 'Base TVL update: $2.41B (+3.2% 24h). Clanker-deployed tokens account for $340M of that — up from $180M just 60 days ago. The compounding effect of permissionless launches is real.',
    timestamp: '1h ago',
    reposts: 445,
    likes: 3201,
    tag: 'Data',
    tokenMention: { symbol: 'BASE', change: '+3.2%', positive: true },
  },
  {
    id: '7',
    author: { name: 'punk6529', handle: 'punk6529', avatar: 'P6' },
    content: 'Counterintuitive take: the value of Clanker is not the tokens it creates. It\'s the *norm* it creates. When launching a token becomes as easy as posting a tweet, the entire relationship between ideas and capital changes.',
    timestamp: '2h ago',
    reposts: 891,
    likes: 7432,
  },
  {
    id: '8',
    author: { name: 'Alcreon', handle: 'alcreon', avatar: 'AL', verified: true },
    content: 'New editorial: "Why Farcaster-native tokens outperform cold launches by 3-7x in first-week volume." The social graph is the distribution layer. Read the full analysis →',
    timestamp: '3h ago',
    reposts: 167,
    likes: 1543,
    tag: 'Editorial',
  },
  {
    id: '9',
    author: { name: 'Vitalik Buterin', handle: 'VitalikButerin', avatar: 'VB', verified: true },
    content: 'Base\'s block time and fee structure makes it uniquely suited for high-frequency token discovery. The interesting question isn\'t "can you launch a token" — it\'s "what happens after."',
    timestamp: '4h ago',
    reposts: 2341,
    likes: 18920,
  },
  {
    id: '10',
    author: { name: 'bankless', handle: 'BanklessHQ', avatar: 'BK', verified: true },
    content: '$ENJOY, $DEGEN, $HIGHER — the Base token meta is creating a new category: meme tokens with actual community infrastructure. These aren\'t pump-and-dumps. They\'re coordination games.',
    timestamp: '5h ago',
    reposts: 334,
    likes: 2987,
    tokenMention: { symbol: 'ENJOY', change: '+12.1%', positive: true },
  },
]

export const briefingPosts: FeedPost[] = [
  {
    id: 'b1',
    author: { name: 'Alcreon', handle: 'alcreon', avatar: 'AL', verified: true },
    content: '🔵 MORNING BRIEFING — Base Chain\n\nTop launches last 24h via Clanker:\n• $NOUN — 8,400 holders, $2.1M volume\n• $FRAME — 3,200 holders, $890K volume\n• $VIBES — 1,800 holders, $340K volume\n\nTotal new tokens: 847\nBase TVL: $2.41B (+1.2%)\n\nFull report in Editorials →',
    timestamp: '6h ago',
    reposts: 423,
    likes: 3201,
    tag: 'Briefing',
  },
  {
    id: 'b2',
    author: { name: 'Alcreon', handle: 'alcreon', avatar: 'AL', verified: true },
    content: '🔵 MARKET SIGNAL\n\nBase token sentiment index: BULLISH (72/100)\n\nKey signals:\n• Net new wallet addresses: +48K (24h)\n• Clanker deploy rate: +34% WoW\n• Average first-hour liquidity: $24K (+12%)\n• 30-day holder retention: 61% (all-time high)\n\nThe fundamentals have never been stronger.',
    timestamp: '12h ago',
    reposts: 287,
    likes: 2140,
    tag: 'Briefing',
  },
  {
    id: 'b3',
    author: { name: 'Alcreon', handle: 'alcreon', avatar: 'AL', verified: true },
    content: '🔵 EVENING BRIEFING\n\nTop editorial this week: "The Fee Architecture Nobody Talks About" — 47K reads.\n\nMost discussed token: $BASED\nBiggest surprise launch: $CLANK (zero marketing, 12K organic holders in 48h)\n\nWhy organic distribution wins — read more →',
    timestamp: '1d ago',
    reposts: 198,
    likes: 1876,
    tag: 'Briefing',
  },
]
