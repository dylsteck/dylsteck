import React from "react";
import Link from 'next/link'
import Media from './components/media'
import { Metadata } from 'next'
import { appUrl, bannerImg, createFrame } from './sitemap'
import DSGrayIcon from './components/icons/ds-gray-icon'

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
      "fc:miniapp": JSON.stringify(createFrame()),
    },
  } as Metadata
}

export default function Home(){
    return(
        <>
            <section className="fixed top-[68px] left-0 w-full bg-white dark:bg-black z-30 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-row">
                    <div className="w-full md:w-1/2 border-r border-neutral-200 dark:border-neutral-800 py-8 flex items-center justify-center">
                        <DSGrayIcon />
                    </div>
                    <div className="w-full md:w-1/2 px-8 py-8">
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
                    </div>
                </div>
            </section>
            <section className="fixed top-[200px] left-0 w-full bottom-0 bg-white dark:bg-black z-20">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 md:border-r border-b md:border-b-0 border-neutral-200 dark:border-neutral-800 h-full">
                        <div className="grid grid-cols-2 h-full">
                            <div className="bg-neutral-300 dark:bg-neutral-700 border-r border-b border-neutral-200 dark:border-neutral-800"></div>
                            <div className="bg-neutral-300 dark:bg-neutral-700 border-b border-neutral-200 dark:border-neutral-800"></div>
                            <div className="bg-neutral-300 dark:bg-neutral-700 border-r border-neutral-200 dark:border-neutral-800"></div>
                            <div className="bg-neutral-300 dark:bg-neutral-700"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 h-full overflow-y-auto p-2 pt-0 md:p-4 text-black dark:text-white">
                        <Media />
                    </div>
                </div>
            </section>
        </>
    )
}