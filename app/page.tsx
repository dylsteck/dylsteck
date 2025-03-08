import React from "react";
import Link from 'next/link'
import Media from './components/media'
import { Metadata } from 'next'
import { appUrl, bannerImg, createFrame } from './sitemap'

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
      "fc:frame": JSON.stringify(createFrame()),
    },
  } as Metadata
}

export default function Home(){
    return(
        <section>
            <h1 className="text-2xl font-semibold tracking-tighter">
            Dylan Steck
            </h1>
            <div className="pt-3 flex flex-col items-start">
              <p>
                Engineer at <Link className="underline" href="https://base.org" target="_blank">Base</Link>
              </p>
              <p className="w-full md:max-w-[75%]">
              Building products onchain that give people more agency
              </p>
            </div>
            <div className="pt-5">
              <Media />
            </div>
        </section>
    )
}