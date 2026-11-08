import useSWR from 'swr'
import { FeedItem } from 'app/lib/feed-types'
import { CACHE_SECONDS } from 'app/lib/constants'
import { sortFeedItems } from 'app/lib/feed-utils'

async function fetchFeed(url: string): Promise<FeedItem[]> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch feed')
  }
  const data = await response.json()
  return sortFeedItems(data.items || [])
}

export function useFeed() {
  const { data, error } = useSWR('/api/feed', fetchFeed, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: CACHE_SECONDS.RECENT * 1000,
  })

  return {
    items: data ?? [],
    isLoading: !data && !error,
    error,
  }
}
