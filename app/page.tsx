import React from "react";
// import Link from 'next/link'
// import Media from './components/media'
// import Carousel from './components/carousel'
import { Metadata } from 'next'
import { appUrl, bannerImg, createMiniAppEmbed } from './sitemap'
import HomeContent from './components/home-content'

export function generateMetadata(){
  return{
    metadataBase: new URL(appUrl),
    title: {
      default: 'Dylan Steck',
      template: '%s | Dylan Steck',
    },
    description: 'The homepage of Dylan Steck, an engineer at Base focused on building products onchain that give people more agency',
    openGraph: {
      title: 'Dylan Steck',
      description: 'The homepage of Dylan Steck, an engineer at Base focused on building products onchain that give people more agency',
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
      "fc:frame": JSON.stringify(createMiniAppEmbed()),
      "fc:miniapp": JSON.stringify(createMiniAppEmbed()),
    },
  } as Metadata
}

export default function Home(){
    // Keeping components but not rendering them for now - see commented imports above
    return <HomeContent />
}