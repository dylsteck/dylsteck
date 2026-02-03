import { useMemo } from 'react'
import useSWRInfinite from 'swr/infinite'
import { FeedItem } from 'app/api/feed/types'
import { CACHE_SECONDS, FARCASTER_PAGE_LIMIT } from 'app/lib/constants'
import { sortFeedItems } from 'app/lib/feed-utils'

interface FeedResponse {
  items: FeedItem[]
  nextCursor: string | null
  hasMore: boolean
}

// Fetcher function for feed pages
async function fetchFeedPage(url: string): Promise<FeedResponse> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch feed')
  }
  const data = await response.json()

  return {
    items: data.items || [],
    nextCursor: data.nextCursor || null,
    hasMore: data.hasMore || false
  }
}

export function useFeed() {
  const getKey = (pageIndex: number, previousPageData: FeedResponse | null) => {
    if (pageIndex === 0) return '/api/feed'
    const nextCursor = previousPageData?.nextCursor
    if (!nextCursor) return null
    return `/api/feed?cursor=${encodeURIComponent(nextCursor)}&limit=${FARCASTER_PAGE_LIMIT}`
  }

  const { data, error, isValidating, size, setSize } = useSWRInfinite<FeedResponse>(
    getKey,
    fetchFeedPage,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: CACHE_SECONDS.RECENT * 1000,
    }
  )

  const pages = data || []
  const items = useMemo(() => {
    const merged = pages.flatMap((page) => page.items)
    if (merged.length === 0) return merged

    const existingIds = new Set<string>()
    const uniqueItems = merged.filter((item) => {
      if (existingIds.has(item.id)) return false
      existingIds.add(item.id)
      return true
    })

    return sortFeedItems(uniqueItems)
  }, [pages])
  const lastPage = pages[pages.length - 1]
  const hasMore = lastPage ? lastPage.hasMore : false
  const isLoading = !data && !error
  const isLoadingMore = isValidating && size > 1

  const loadMore = () => {
    if (!hasMore || isLoadingMore) return
    setSize((prev) => prev + 1)
  }

  return {
    items,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMore,
    error,
  }
}
