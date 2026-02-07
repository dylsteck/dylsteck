import { NextResponse } from 'next/server'
import { FeedItem } from '../types'
import { CACHE_CONTROL, FARCASTER_MAX_LIMIT, FARCASTER_PAGE_LIMIT } from 'app/lib/constants'
import { fetchFarcasterCasts, sortFeedItems, transformFarcasterCast } from 'app/lib/feed-utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') || undefined
  const limitParam = parseInt(searchParams.get('limit') || `${FARCASTER_PAGE_LIMIT}`, 10)
  const limit = Math.min(Number.isFinite(limitParam) ? limitParam : FARCASTER_PAGE_LIMIT, FARCASTER_MAX_LIMIT)

  try {
    const result = await fetchFarcasterCasts({ cursor, limit })

    const items = result.casts
      .map(transformFarcasterCast)
      .filter((item): item is FeedItem => item !== null)

    const sortedItems = sortFeedItems(items)

    return NextResponse.json({
      items: sortedItems,
      nextCursor: result.nextCursor,
      hasMore: !!result.nextCursor
    }, {
      headers: {
        'Cache-Control': cursor ? CACHE_CONTROL.OLD : CACHE_CONTROL.RECENT
      }
    })
  } catch (error) {
    console.error('Error in Farcaster feed route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Farcaster feed', items: [], nextCursor: null, hasMore: false },
      { status: 500 }
    )
  }
}
