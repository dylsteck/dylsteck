import { Metadata } from 'next'
import { appUrl, bannerImg, createFrame } from '../sitemap'
import AppsGrid from './grid'

type App = {
  id: number
  name: string
  imageUrl: string
  url: string
  hidden?: boolean
}

const apps: App[] = [
  {
    id: 1,
    name: 'bec.watch',
    imageUrl: 'https://i.imgur.com/ylSBHuG.png',
    url: 'https://bec.watch',
  },
  {
    id: 2,
    name: 'Casterscan',
    imageUrl:
      'https://proxy.wrpcd.net/?url=https%3A%2F%2Fi.imgur.com%2FPD1XTs5.jpeg&s=b941d7bb7bc34acf57038dc3cea0360a5a2a453e4a00044a4ebf2b2c98c1827f',
    url: 'https://casterscan.com',
  },
  {
    id: 3,
    name: 'FarHack',
    imageUrl: 'https://farhack.xyz/icons/icon-512x512.png',
    url: 'https://farhack.xyz',
  },
  {
    id: 4,
    name: 'litecast',
    imageUrl: 'https://i.imgur.com/ghxT2nT.png',
    url: 'https://github.com/dylsteck/litecast',
  },
  {
    id: 5,
    name: 'tap',
    imageUrl: 'https://i.imgur.com/8Knijje.png',
    url: 'https://tap.computer',
  },
  {
    id: 6,
    name: 'Prompt Arena',
    imageUrl: 'https://promptarena.xyz/splash.png',
    url: 'https://promptarena.xyz',
    hidden: true,
  },
]

export function generateMetadata() {
  return {
    metadataBase: new URL(appUrl),
    title: {
      default: 'Apps',
      template: '%s | Dylan Steck',
    },
    description: 'Apps by Dylan Steck',
    openGraph: {
      title: 'Apps',
      description: 'Apps by Dylan Steck',
      images: [bannerImg],
      url: `${appUrl}/apps`,
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
      'fc:frame': JSON.stringify(createFrame()),
      'fc:miniapp': JSON.stringify(createFrame()),
    },
  } as Metadata
}

export default function AppsPage() {
  return (
    <div className="min-h-screen w-full bg-black">
      <AppsGrid apps={apps} />
    </div>
  )
}