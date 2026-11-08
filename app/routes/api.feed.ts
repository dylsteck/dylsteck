import { createFileRoute } from '@tanstack/react-router'
import { posts } from '../blog/posts/posts'
import { videos } from '../video/videos'
import { appFeedItems } from '../lib/app-feed'
import type { FeedItem } from '../lib/feed-types'
import { CACHE_CONTROL } from '../lib/constants'
import { parseDate, sortFeedItems } from '../lib/feed-utils'

export const Route = createFileRoute('/api/feed')({
  server: {
    handlers: {
      GET: async () => {
        try {
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

          const items = sortFeedItems([...blogItems, ...videoItems, ...appFeedItems])

          return new Response(JSON.stringify({ items }), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': CACHE_CONTROL.RECENT,
            },
          })
        } catch (error) {
          console.error('Error generating feed:', error)
          return new Response(
            JSON.stringify({
              error: 'Failed to generate feed',
              items: [],
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
