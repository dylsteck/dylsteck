import useSWR from 'swr'
import { FeedItem } from 'app/api/feed/types'

interface FeedResponse {
  items: FeedItem[]
  farcasterCursor: string | null
  hasMoreFarcaster: boolean
}

interface FarcasterResponse {
  items: FeedItem[]
  nextCursor: string | null
}

// Fetcher function for initial feed
async function fetchFeed(): Promise<FeedResponse> {
  const response = await fetch('/api/feed')
  if (!response.ok) {
    throw new Error('Failed to fetch feed')
  }
  const data = await response.json()
  
  // Sort by timestamp
  const sortedItems = (data.items || []).sort((a: FeedItem, b: FeedItem) => {
    const timestampA = a.dateTimestamp ?? new Date(a.date).getTime()
    const timestampB = b.dateTimestamp ?? new Date(b.date).getTime()
    return timestampB - timestampA
  })
  
  return {
    items: sortedItems,
    farcasterCursor: data.farcasterCursor || null,
    hasMoreFarcaster: data.hasMoreFarcaster || false
  }
}

// Fetcher function for more Farcaster posts
async function fetchMoreFarcaster(url: string): Promise<FarcasterResponse> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch more Farcaster posts')
  }
  const data = await response.json()
  return {
    items: data.items || [],
    nextCursor: data.nextCursor || null
  }
}

export function useFeed() {
  const { data, error, isLoading } = useSWR<FeedResponse>(
    '/api/feed',
    fetchFeed,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    items: data?.items || [],
    farcasterCursor: data?.farcasterCursor || null,
    hasMoreFarcaster: data?.hasMoreFarcaster || false,
    isLoading,
    error
  }
}

export function useMoreFarcaster(cursor: string | null, enabled: boolean) {
  const { data, error, isLoading } = useSWR<FarcasterResponse>(
    enabled && cursor ? `/api/feed/farcaster?cursor=${encodeURIComponent(cursor)}&limit=25` : null,
    fetchMoreFarcaster,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return {
    items: data?.items || [],
    nextCursor: data?.nextCursor || null,
    isLoading,
    error
  }
}
