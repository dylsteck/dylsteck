import { Metadata } from 'next'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'

export function generateMetadata() {
  return {
    metadataBase: new URL(appUrl),
    title: {
      default: 'Info',
      template: '%s | Dylan Steck',
    },
    description: 'Information about Dylan Steck',
    openGraph: {
      title: 'Info',
      description: 'Information about Dylan Steck',
      images: [bannerImg],
      url: `${appUrl}/info`,
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

export default function InfoPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black pt-8 sm:pt-9">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="max-w-xl">
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          As a kid I had a few blogs I wanted to customize, and that led me to learn coding online. The more I learned about programming and the world of tech, the more I was hooked to the idea of anyone anywhere being able to build anything.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          In high school I got deeply interested in operating systems and it led me to start working on Cortex -- where I've been researching what a new operating system would look like.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          When I got to college I had been building websites online already and knew I wanted to spend my time actually building apps. I fortunately got down the crypto rabbit hole at the right time, found out about Farcaster, and through a series of internships and projects dove head first into the space. Around the time I had helped out with FarCon LA and was doing work at Neynar, I dropped out of college to keep pursuing this dream.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100">
          Now I work on Base app at Base, where I help figure out how all our building blocks can fit together so we can bring more people onchain.
        </p>
        </div>
      </div>
    </div>
  )
}
