import Link from 'next/link'
import Media from './components/media'
import { Metadata } from 'next'
import { appUrl, bannerImg, createFrame } from './sitemap'
import HomePage from './components/home'

export function generateMetadata(){
  return{
    metadataBase: new URL(appUrl),
    title: {
      default: 'Dylan Steck',
      template: '%s | Dylan Steck',
    },
    description: 'The homepage of Dylan Steck, a full-stack engineer focused on building software that gives people more agency.',
    openGraph: {
      title: 'Dylan Steck',
      description: 'The homepage of Dylan Steck, a full-stack engineer focused on building software that gives people more agency.',
      images: [bannerImg],
      url: appUrl,
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
      "fc:frame": JSON.stringify(createFrame()),
    },
  } as Metadata
}

export default function Page() {
  
  return <HomePage />
}
