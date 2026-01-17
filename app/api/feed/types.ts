export type FeedItemType = 'blog' | 'video' | 'farcaster'

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
  castData?: any // Raw Farcaster cast data for FarcasterEmbed component
}
