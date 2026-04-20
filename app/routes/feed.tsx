import { Suspense } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import FeedMasonry from '../feed/feed-masonry'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'

const miniAppEmbed = JSON.stringify(createMiniAppEmbed())

type FeedSearch = {
  filter?: string
  view?: 'grid' | 'list'
}

export const Route = createFileRoute('/feed')({
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    const filter = typeof search.filter === 'string' ? search.filter : undefined
    const viewRaw = typeof search.view === 'string' ? search.view : undefined
    const view = viewRaw === 'list' ? 'list' : undefined
    return { filter, view }
  },
  head: () => ({
    meta: [
      { title: 'Feed | Dylan Steck' },
      {
        name: 'description',
        content: 'Feed of blog posts, videos, and Farcaster posts',
      },
      { property: 'og:title', content: 'Feed' },
      {
        property: 'og:description',
        content: 'Feed of blog posts, videos, and Farcaster posts',
      },
      { property: 'og:image', content: bannerImg },
      { property: 'og:url', content: `${appUrl}/feed` },
      { property: 'og:site_name', content: 'Dylan Steck' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { name: 'fc:frame', content: miniAppEmbed },
      { name: 'fc:miniapp', content: miniAppEmbed },
    ],
  }),
  component: FeedPage,
})

function FeedPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Suspense
        fallback={
          <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center">
            <div className="text-neutral-500 text-sm">Loading feed...</div>
          </div>
        }
      >
        <FeedMasonry />
      </Suspense>
    </div>
  )
}
