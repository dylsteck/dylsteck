import { NextResponse } from 'next/server'
import { posts } from 'app/blog/posts/posts'
import { videos } from 'app/video/videos'
import { FeedItem } from './types'
import {
  CACHE_CONTROL,
  FARCASTER_INITIAL_LIMIT,
  FARCASTER_MAX_LIMIT,
  FARCASTER_PAGE_LIMIT,
} from 'app/lib/constants'
import {
  fetchFarcasterCasts,
  parseDate,
  sortFeedItems,
  transformFarcasterCast,
} from 'app/lib/feed-utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') || null
  const limitParam = parseInt(searchParams.get('limit') || '', 10)
  const defaultLimit = cursor ? FARCASTER_PAGE_LIMIT : FARCASTER_INITIAL_LIMIT
  const limit = Number.isFinite(limitParam)
    ? Math.min(limitParam, FARCASTER_MAX_LIMIT)
    : defaultLimit

  try {
    if (cursor) {
      const farcasterResult = await fetchFarcasterCasts({ cursor, limit })
      const farcasterItems: FeedItem[] = farcasterResult.casts
        .map(transformFarcasterCast)
        .filter((item): item is FeedItem => item !== null)

      const items = sortFeedItems(farcasterItems)

      return NextResponse.json({
        items,
        nextCursor: farcasterResult.nextCursor,
        hasMore: !!farcasterResult.nextCursor
      }, {
        headers: {
          'Cache-Control': CACHE_CONTROL.OLD
        }
      })
    }

    const farcasterPromise = fetchFarcasterCasts({ limit })

    // Transform blog posts (static - always included)
    const blogItems: FeedItem[] = posts.map(post => {
      // Use banner if available, otherwise fallback to OG image endpoint
      // Use relative path for same-origin images (Next.js Image handles these)
      const imageUrl = post.banner && post.banner.trim()
        ? post.banner
        : `/api/og/blog/${post.id}`

      return {
        id: `blog-${post.id}`,
        type: 'blog' as const,
        title: post.title,
        date: post.date,
        dateTimestamp: parseDate(post.date),
        imageUrl,
        url: `/blog/${post.id}`,
        description: post.description
      }
    })

    // Transform videos (static - always included)
    const videoItems: FeedItem[] = videos.map(video => ({
      id: `video-${video.id}`,
      type: 'video' as const,
      title: video.title,
      date: video.date,
      dateTimestamp: parseDate(video.date),
      imageUrl: video.banner && video.banner.trim() ? video.banner : undefined,
      url: `/video/${video.id}`,
      description: video.description
    }))

    // Fetch only initial Farcaster posts - client will paginate for more
    const farcasterResult = await farcasterPromise
    const farcasterItems: FeedItem[] = farcasterResult.casts
      .map(transformFarcasterCast)
      .filter((item): item is FeedItem => item !== null)

    const allItems = sortFeedItems([...blogItems, ...videoItems, ...farcasterItems])

    return NextResponse.json({
      items: allItems,
      nextCursor: farcasterResult.nextCursor,
      hasMore: !!farcasterResult.nextCursor
    }, {
      headers: {
        'Cache-Control': CACHE_CONTROL.RECENT
      }
    })
  } catch (error) {
    console.error('Error generating feed:', error)
    return NextResponse.json(
      { error: 'Failed to generate feed', items: [], nextCursor: null, hasMore: false },
      { status: 500 }
    )
  }
}
