export type AppGroup = 'now' | 'started' | 'smaller'

export type App = {
  name: string
  imageUrl: string
  url: string
  line: string
  group: AppGroup
  note?: string
  hidden?: boolean
}

export const appGroups: { id: AppGroup; label: string }[] = [
  { id: 'now', label: 'Now' },
  { id: 'started', label: 'Started' },
  { id: 'smaller', label: 'Smaller' },
]

export const apps: App[] = [
  {
    name: 'Base',
    imageUrl: 'https://res.cloudinary.com/base-app/image/upload/f_auto/v1766017009/7c0c93f6-8252-41d2-9696-594a07232e86.png',
    url: 'https://base.app',
    line: 'Onchain app at Coinbase.',
    group: 'now',
    note: 'embedded-apps',
  },
  {
    name: 'Cortex',
    imageUrl: 'https://i.imgur.com/Pwf5x4V.png',
    url: 'https://withcortex.com',
    line: 'A desktop built around tasks, not windows.',
    group: 'started',
    note: 'cortex-one-pager',
  },
  {
    name: 'FarHack',
    imageUrl: 'https://farhack.xyz/icons/icon-512x512.png',
    url: 'https://farhack.xyz',
    line: 'Hackathons for Farcaster builders.',
    group: 'started',
    note: 'farcon-and-farhack-2024',
  },
  {
    name: 'prompt arena',
    imageUrl: 'https://i.imgur.com/gqX2VkV.png',
    url: 'https://github.com/dylsteck/promptarena',
    line: 'A small arena for prompts.',
    group: 'started',
  },
  {
    name: 'bec.watch',
    imageUrl: 'https://i.imgur.com/ylSBHuG.png',
    url: 'https://becwatch.vercel.app',
    line: 'A log of the bacon, egg, and cheeses I eat.',
    group: 'smaller',
  },
  {
    name: 'Casterscan',
    imageUrl:
      'https://proxy.wrpcd.net/?url=https%3A%2F%2Fi.imgur.com%2FPD1XTs5.jpeg&s=b941d7bb7bc34acf57038dc3cea0360a5a2a453e4a00044a4ebf2b2c98c1827f',
    url: 'https://casterscan.com',
    line: 'A block explorer for Farcaster.',
    group: 'smaller',
  },
  {
    name: 'litecast',
    imageUrl: 'https://i.imgur.com/ghxT2nT.png',
    url: 'https://litecast.xyz',
    line: 'An open source Farcaster client.',
    group: 'smaller',
    note: 'thoughts-on-building-a-farcaster-client',
  },
  {
    name: 'tap',
    imageUrl: 'https://i.imgur.com/8Knijje.png',
    url: 'https://github.com/dylsteck/tap',
    line: 'It just takes one tap.',
    group: 'smaller',
  },
  {
    name: 'The Terminal',
    imageUrl: 'https://i.imgur.com/zXbk9g9.png',
    url: 'https://farcaster.xyz/yb/0x80ad5a55',
    line: 'Season one of Terminally Onchain.',
    group: 'smaller',
  },
]
