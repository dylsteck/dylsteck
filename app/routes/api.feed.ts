import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../blog/posts/posts'
import { videos } from '../video/videos'
import type { FeedItem } from '../lib/feed-types'
import {
  CACHE_CONTROL,
  FARCASTER_INITIAL_LIMIT,
  FARCASTER_MAX_LIMIT,
  FARCASTER_PAGE_LIMIT,
} from '../lib/constants'
import {
  fetchFarcasterCasts,
  parseDate,
  sortFeedItems,
  transformFarcasterCast,
} from '../lib/feed-utils'

export const Route = createFileRoute('/api/feed')({
  server: {
    handlers: {
      GET: async ({ request }) => {
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

            return new Response(
              JSON.stringify({
                items,
                nextCursor: farcasterResult.nextCursor,
                hasMore: !!farcasterResult.nextCursor,
              }),
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': CACHE_CONTROL.OLD,
                },
              }
            )
          }

          const farcasterPromise = fetchFarcasterCasts({ limit })

          const blogItems: FeedItem[] = posts.map((post) => {
            const imageUrl =
              post.banner && post.banner.trim()
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
              description: post.description,
            }
          })

          const videoItems: FeedItem[] = videos.map((video) => ({
            id: `video-${video.id}`,
            type: 'video' as const,
            title: video.title,
            date: video.date,
            dateTimestamp: parseDate(video.date),
            imageUrl: video.banner && video.banner.trim() ? video.banner : undefined,
            url: `/video/${video.id}`,
            description: video.description,
          }))

          const farcasterResult = await farcasterPromise
          const farcasterItems: FeedItem[] = farcasterResult.casts
            .map(transformFarcasterCast)
            .filter((item): item is FeedItem => item !== null)

          const allItems = sortFeedItems([
            ...blogItems,
            ...videoItems,
            ...farcasterItems,
          ])

          return new Response(
            JSON.stringify({
              items: allItems,
              nextCursor: farcasterResult.nextCursor,
              hasMore: !!farcasterResult.nextCursor,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                'Cache-Control': CACHE_CONTROL.RECENT,
              },
            }
          )
        } catch (error) {
          console.error('Error generating feed:', error)
          return new Response(
            JSON.stringify({
              error: 'Failed to generate feed',
              items: [],
              nextCursor: null,
              hasMore: false,
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }
          )
        }
      },
    },
  },
})
