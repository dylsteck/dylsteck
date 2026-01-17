import { Suspense } from 'react'
import { Metadata } from 'next'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'
import FeedMasonry from './feed-masonry'

export function generateMetadata() {
  return {
    metadataBase: new URL(appUrl),
    title: {
      default: 'Feed',
      template: '%s | Dylan Steck',
    },
    description: 'Feed of blog posts, videos, and Farcaster posts',
    openGraph: {
      title: 'Feed',
      description: 'Feed of blog posts, videos, and Farcaster posts',
      images: [bannerImg],
      url: `${appUrl}/feed`,
      siteName: 'Dylan Steck',
      locale: 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'fc:frame': JSON.stringify(createMiniAppEmbed()),
      'fc:miniapp': JSON.stringify(createMiniAppEmbed()),
    },
  } as Metadata
}

export default function FeedPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <Suspense fallback={
        <div className="min-h-screen w-full bg-white dark:bg-black flex items-center justify-center">
          <div className="text-neutral-500 text-sm">Loading feed...</div>
        </div>
      }>
        <FeedMasonry />
      </Suspense>
    </div>
  )
}
