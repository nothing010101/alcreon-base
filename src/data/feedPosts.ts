export interface LinkPreview {
  domain: string
  title: string
  description?: string
}

export interface QuotePost {
  author: string
  handle: string
  content: string
}

export interface FeedPost {
  id: string
  author: {
    name: string
    handle: string
    initials: string
    color: string
    verified?: boolean
  }
  content: string
  timestamp: string
  comments: number
  reposts: number
  likes: number
  tag?: string
  link?: LinkPreview
  quote?: QuotePost
}

export const streamPosts: FeedPost[] = [
  {
    id: '1',
    author: { name: 'mfer.base', handle: 'mferbase', initials: 'MB', color: '#2151f5', verified: false },
    content: 'launched $COPE at 2am last night thinking i was first. checked clanker after. there are already 4 other $COPE tokens 💀\n\nanyway ours has the best LP depth so i\'m choosing not to be upset about this',
    timestamp: '3m',
    comments: 12,
    reposts: 41,
    likes: 203,
  },
  {
    id: '2',
    author: { name: 'degen signal', handle: 'degensignal', initials: 'DS', color: '#7c3aed', verified: false },
    content: '$HIGHER 7d chart is just violence rn\n\nzero marketing. launched via clanker 8 days ago. pure organic warpcast spread. whoever built this just sat back and watched\n\nthis is literally the thesis playing out',
    timestamp: '9m',
    comments: 56,
    reposts: 203,
    likes: 1243,
    link: {
      domain: 'dexscreener.com',
      title: 'HIGHER/WETH on Uniswap V3 (Base)',
      description: '$2.4M 24h volume · 14,200 holders · +847% 7d',
    },
  },
  {
    id: '3',
    author: { name: 'base.girl', handle: 'basegirl_eth', initials: 'BG', color: '#0891b2', verified: false },
    content: 'the amount of tokens launched with no image, no description, no nothing is wild. like ok you deployed something. what is it. why should i care\n\nminimum viable token presence pls',
    timestamp: '14m',
    comments: 89,
    reposts: 312,
    likes: 2104,
  },
  {
    id: '4',
    author: { name: 'onchain weather', handle: 'onchainweather', initials: 'OW', color: '#059669', verified: false },
    content: 'noticed: tokens launched between 9-11pm ET consistently outperform morning launches by 2-4x in first 24h volume\n\nmy theory is that\'s when warpcast engagement peaks in the US and europe overlap is still active\n\nanyone tracking this systematically?',
    timestamp: '23m',
    comments: 34,
    reposts: 167,
    likes: 891,
  },
  {
    id: '5',
    author: { name: 'clanker.world', handle: 'clanker', initials: 'CK', color: '#2151f5', verified: true },
    content: '847 tokens deployed in the last 24 hours\n\ntop by volume:\n• $NOUN — $2.1M\n• $FRAME — $890K  \n• $VIBES — $340K\n\nwe\'re shipping something next week that changes how LP works. stay tuned',
    timestamp: '31m',
    comments: 203,
    reposts: 891,
    likes: 5621,
  },
  {
    id: '6',
    author: { name: 'rugdetector', handle: 'rugdetector9000', initials: 'RD', color: '#dc2626', verified: false },
    content: 'hot take: the best tokens aren\'t the ones with the biggest launch day\n\nthey\'re the ones that survive week 2\n\nanyone can pump week 1 with a farcaster frame. week 2 is when you find out if there\'s any actual community there',
    timestamp: '38m',
    comments: 145,
    reposts: 567,
    likes: 3201,
  },
  {
    id: '7',
    author: { name: 'jesse.base', handle: 'jessepollak', initials: 'JP', color: '#2151f5', verified: true },
    content: 'Base is for everyone. every token launched on clanker is someone somewhere trying to build something. most won\'t work. that\'s ok. the ones that do are building the financial internet',
    timestamp: '47m',
    comments: 412,
    reposts: 1893,
    likes: 14203,
  },
  {
    id: '8',
    author: { name: 'fees.eth', handle: 'feesdoteth', initials: 'FE', color: '#ca8a04', verified: false },
    content: 'reminder: when you deploy via clanker, 1% of LP fees go to you forever\n\nnot a one-time thing. not a launch fee. literally passive income if the token gets any traction\n\npeople sleep on this part of the model',
    timestamp: '1h',
    comments: 67,
    reposts: 334,
    likes: 2876,
  },
  {
    id: '9',
    author: { name: 'warpcast analytics', handle: 'wcanalytics', initials: 'WA', color: '#7c3aed', verified: false },
    content: 'tokens launched with a farcaster frame in the same cast:\n• avg first-hour volume: $34K\n\ntokens launched without:\n• avg first-hour volume: $4.2K\n\nyeah. attach a frame to your launch cast. this is not optional anymore',
    timestamp: '1h',
    comments: 91,
    reposts: 445,
    likes: 3109,
    link: {
      domain: 'warpcast.com',
      title: 'Farcaster frames for token launches — a data breakdown',
      description: '8x difference in first-hour volume. Analysis of 2,400 clanker launches.',
    },
  },
  {
    id: '10',
    author: { name: 'anon deployer', handle: 'anondeployer', initials: 'AD', color: '#64748b', verified: false },
    content: 'third time deploying a token this month. first two died in week 2. trying a different approach this time: building the community FIRST in a warpcast channel, THEN deploying\n\nwill report back',
    timestamp: '2h',
    comments: 23,
    reposts: 89,
    likes: 743,
  },
  {
    id: '11',
    author: { name: 'base intern', handle: 'baseintern', initials: 'BI', color: '#2151f5', verified: false },
    content: 'someone just sent $CLANK to a burn address accidentally. lost $4K. this is why we have testnets. but also testnet tokens aren\'t fun so nobody uses them. the eternal dilemma',
    timestamp: '2h',
    comments: 156,
    reposts: 234,
    likes: 4521,
  },
  {
    id: '12',
    author: { name: 'L2 maxi', handle: 'l2maxi_eth', initials: 'L2', color: '#0891b2', verified: false },
    content: 'Base TVL just crossed $2.4B\n\nfor context: that\'s more than Arbitrum had at this point in its lifecycle. the Coinbase distribution advantage is very real and people are still underestimating it',
    timestamp: '3h',
    comments: 78,
    reposts: 312,
    likes: 2134,
    quote: {
      author: 'DefiLlama',
      handle: 'DefiLlama',
      content: 'Base TVL: $2.41B (+3.2% 24h). New all-time high.',
    },
  },
  {
    id: '13',
    author: { name: 'token graveyard', handle: 'tokengraveyard', initials: 'TG', color: '#64748b', verified: false },
    content: 'RIP to the 743 tokens that launched this week and already have $0 volume\n\nyou tried. you deployed. clanker took your $100 fee. the market has spoken\n\n🪦',
    timestamp: '3h',
    comments: 201,
    reposts: 678,
    likes: 8923,
  },
  {
    id: '14',
    author: { name: 'basementor', handle: 'basementor', initials: 'BM', color: '#059669', verified: false },
    content: 'if you\'re about to launch a token, checklist:\n\n□ does it have a name that isn\'t already taken\n□ does it have an actual image (not a screenshot of text)\n□ is the description longer than 5 words\n□ do you have at least one farcaster channel ready\n□ have you told 10 people it\'s launching\n\nif 3+ are no, wait',
    timestamp: '4h',
    comments: 445,
    reposts: 2341,
    likes: 15678,
  },
  {
    id: '15',
    author: { name: 'punk6529', handle: 'punk6529', initials: 'P6', color: '#7c3aed', verified: true },
    content: 'the clanker model is doing something interesting to the relationship between ideas and capital\n\nbefore: idea → whitepaper → raise → token → maybe community\nafter: idea → token → community forms (or doesn\'t) → price discovery\n\nthe order changed. that matters',
    timestamp: '5h',
    comments: 891,
    reposts: 3421,
    likes: 24103,
  },
]

export const briefingPosts: FeedPost[] = [
  {
    id: 'b1',
    author: { name: 'Alcreon', handle: 'alcreon', initials: 'AL', color: '#2151f5', verified: true },
    content: '🔵 BASE BRIEFING — May 14\n\nTop clanker launches (24h):\n• $NOUN — 8,400 holders, $2.1M vol\n• $FRAME — 3,200 holders, $890K vol\n• $VIBES — 1,800 holders, $340K vol\n\nTotal deploys: 847\nBase TVL: $2.41B (+1.2%)\nAvg launch liquidity: $24K',
    timestamp: '6h',
    comments: 89,
    reposts: 423,
    likes: 2341,
    tag: 'Briefing',
  },
  {
    id: 'b2',
    author: { name: 'Alcreon', handle: 'alcreon', initials: 'AL', color: '#2151f5', verified: true },
    content: '🔵 SIGNAL — Holder retention at all-time high\n\n30-day retention on Base tokens: 61%\nFor context: 6 months ago this was 19%\n\nSomething has changed in how communities form around clanker tokens. The editorial on this is in the link.',
    timestamp: '12h',
    comments: 67,
    reposts: 287,
    likes: 1876,
    tag: 'Signal',
    link: {
      domain: 'alcreon.com',
      title: 'Base token holder retention is at an all-time high',
      description: '60-day retention now 61% — 3× higher than comparable launches 18 months ago. Here\'s what the data shows.',
    },
  },
  {
    id: 'b3',
    author: { name: 'Alcreon', handle: 'alcreon', initials: 'AL', color: '#2151f5', verified: true },
    content: '🔵 WEEKLY WRAP — May 13\n\nThis week\'s editorial got 47K reads (new record): "The Fee Architecture Nobody Talks About"\n\nMost surprising stat: $CLANK got 12K holders in 48h with literally zero marketing spend. Zero. Full breakdown coming Monday.',
    timestamp: '1d',
    comments: 134,
    reposts: 567,
    likes: 3892,
    tag: 'Briefing',
  },
  {
    id: 'b4',
    author: { name: 'Alcreon', handle: 'alcreon', initials: 'AL', color: '#2151f5', verified: true },
    content: '🔵 MARKET SIGNAL\n\nBase token sentiment index: BULLISH (72/100)\n\nKey inputs:\n• Net new wallets +48K (24h)\n• Clanker deploy rate +34% WoW\n• Frame-attached launches up 67%\n• Avg 48h survival rate: 41% (up from 28%)\n\nFundamentals are moving in one direction',
    timestamp: '1d',
    comments: 45,
    reposts: 198,
    likes: 1654,
    tag: 'Signal',
  },
]

export const launchPosts: FeedPost[] = [
  {
    id: 'l1',
    author: { name: '$NOUN', handle: 'noun_base', initials: 'NO', color: '#e11d48', verified: false },
    content: '$NOUN just launched on clanker 🏛️\n\nFor the nouns ecosystem. For Base. For builders.\n\nLP live. Liquidity deep. Frame ready.\n\nhttps://clanker.world/clanker/noun',
    timestamp: '2m',
    comments: 234,
    reposts: 891,
    likes: 4201,
    tag: 'New',
    link: {
      domain: 'clanker.world',
      title: 'NOUN on Clanker',
      description: '8,400 holders · $2.1M 24h volume · Base chain',
    },
  },
  {
    id: 'l2',
    author: { name: 'vibes.base', handle: 'vibesbase', initials: 'VB', color: '#7c3aed', verified: false },
    content: '$VIBES is live\n\nidk what else to say. check the chart. good vibes only\n\nclanker.world/clanker/vibes',
    timestamp: '18m',
    comments: 45,
    reposts: 123,
    likes: 891,
    tag: 'New',
  },
  {
    id: 'l3',
    author: { name: 'framemaxi', handle: 'framemaxi', initials: 'FM', color: '#0891b2', verified: false },
    content: '$FRAME is the token for everyone building on farcaster\n\nlaunched via clanker. frame-native from day one. if you\'re shipping frames you should have some\n\n3,200 holders in 6 hours. we\'re just getting started',
    timestamp: '1h',
    comments: 167,
    reposts: 445,
    likes: 2876,
    tag: 'New',
  },
  {
    id: 'l4',
    author: { name: 'higher collective', handle: 'highercollective', initials: 'HC', color: '#059669', verified: false },
    content: '$HIGHER hits 14K holders 📈\n\n8 days since launch. zero paid marketing. just warpcast and good vibes\n\nthis is what organic looks like on Base',
    timestamp: '3h',
    comments: 312,
    reposts: 1234,
    likes: 9821,
    tag: 'Milestone',
    link: {
      domain: 'dexscreener.com',
      title: 'HIGHER/WETH — Uniswap V3 (Base)',
      description: '+847% 7d · $4.2M 24h volume · 14,200 holders',
    },
  },
]
