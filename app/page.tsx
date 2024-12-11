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

export default function Home(){
    return(
        <section>
            <h1 className="text-2xl font-semibold tracking-tighter">
            Dylan Steck
            </h1>
            <p className="mb-4">
            Currently building <Link className="underline" href="https://withcortex.com" target="_blank">Cortex</Link> and hacking at <Link className="underline" href="https://farhack.xyz" target="_blank">FarHack</Link>.
            Full-stack engineer focused on building software that gives people more agency. 
            </p>
            <div className="my-8">
              <Media />
            </div>
        </section>
    )
}