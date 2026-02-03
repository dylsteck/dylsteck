import { NextResponse } from 'next/server'
import { FeedItem } from '../types'
import { CACHE_CONTROL, CACHE_SECONDS, FARCASTER_MAX_LIMIT, FARCASTER_PAGE_LIMIT } from 'app/lib/constants'
import { buildFarcasterProfileCastsUrl, sortFeedItems, transformFarcasterCast } from 'app/lib/feed-utils'

async function fetchFarcasterPage(cursor?: string, limit: number = FARCASTER_PAGE_LIMIT) {
  try {
    const url = buildFarcasterProfileCastsUrl({ limit, cursor: cursor || null })

    const response = await fetch(url, {
      // Use Next.js cache with appropriate revalidation
      next: {
        revalidate: cursor ? CACHE_SECONDS.OLD : CACHE_SECONDS.RECENT
      }
    })

    if (!response.ok) {
      console.error(`Farcaster API error: ${response.status} ${response.statusText}`)
      return { casts: [], nextCursor: null }
    }

    const data = await response.json()
    return {
      casts: data.result?.casts || [],
      nextCursor: data.next?.cursor || null
    }
  } catch (error) {
    console.error('Error fetching Farcaster posts:', error)
    return { casts: [], nextCursor: null }
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') || undefined
  const limitParam = parseInt(searchParams.get('limit') || `${FARCASTER_PAGE_LIMIT}`, 10)
  const limit = Math.min(Number.isFinite(limitParam) ? limitParam : FARCASTER_PAGE_LIMIT, FARCASTER_MAX_LIMIT)

  try {
    const result = await fetchFarcasterPage(cursor, limit)

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
        // Cache response in browser/CDN
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
