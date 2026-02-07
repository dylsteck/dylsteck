export type FeedItemType = 'blog' | 'video' | 'farcaster'

export type FarcasterCastData = {
  hash: string
  author?: { fid?: number; username?: string; display_name?: string; pfp_url?: string }
  text?: string
  timestamp?: string
  embeds?: {
    images?: { url: string }[]
    videos?: { thumbnailUrl?: string; imageUrl?: string }[]
    urls?: { openGraph?: { image?: string } }[]
  }
  reactions?: { likes_count: number; recasts_count: number }
  replies?: { count: number }
}

export type FeedItem = {
  id: string
  type: FeedItemType
  title: string
  date: string
  dateTimestamp?: number // For accurate sorting
  imageUrl?: string
  text?: string // For Farcaster posts without images
  url: string
  description?: string
  castData?: FarcasterCastData
}
