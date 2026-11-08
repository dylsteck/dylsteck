export type FeedItemType = 'app' | 'blog' | 'video'

export type FeedItem = {
  id: string
  type: FeedItemType
  title: string
  date?: string
  dateTimestamp?: number
  imageUrl?: string
  url: string
  description?: string
}
