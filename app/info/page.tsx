import { Metadata } from 'next'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'
import AboutText from '../components/about-text'

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
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-12">
        <div className="pt-8">
          <AboutText />
        </div>
      </div>
    </div>
  )
}
