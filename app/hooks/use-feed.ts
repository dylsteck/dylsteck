import useSWR from 'swr'
import { FeedItem } from 'app/lib/feed-types'
import { CACHE_SECONDS } from 'app/lib/constants'
import { sortFeedItems } from 'app/lib/feed-utils'
import { appFeedItems } from 'app/lib/app-feed'

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
    // Apps ship with the page, so stale API data cannot hide the local catalog.
    items: data
      ? sortFeedItems([...data.filter((item) => item.type !== 'app'), ...appFeedItems])
      : appFeedItems,
    isLoading: !data && !error,
    error,
  }
}
