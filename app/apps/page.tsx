import React from "react";
import Link from 'next/link'
import Media from '../components/media'
import { Metadata } from 'next'
import { appUrl, bannerImg, createFrame } from '../sitemap'
import Image from 'next/image'

// App type definition
type App = {
  id: number;
  name: string;
  imageUrl: string;
  url: string;
  hidden?: boolean;
}

// Apps data array
const apps: App[] = [
  { 
    id: 1, 
    name: "bec.watch", 
    imageUrl: "https://i.imgur.com/ylSBHuG.png",
    url: "https://bec.watch"
  },
  { 
    id: 2, 
    name: "Casterscan", 
    imageUrl: "https://proxy.wrpcd.net/?url=https%3A%2F%2Fi.imgur.com%2FPD1XTs5.jpeg&s=b941d7bb7bc34acf57038dc3cea0360a5a2a453e4a00044a4ebf2b2c98c1827f",
    url: "https://casterscan.com"
  },
  { 
    id: 3, 
    name: "FarHack", 
    imageUrl: "https://farhack.xyz/icons/icon-512x512.png",
    url: "https://farhack.xyz"
  },
  { 
    id: 4, 
    name: "litecast", 
    imageUrl: "https://i.imgur.com/ghxT2nT.png",
    url: "https://github.com/dylsteck/litecast"
  },
  { 
    id: 5, 
    name: "tap", 
    imageUrl: "https://i.imgur.com/8Knijje.png",
    url: "https://tap.computer"
  },
  { 
    id: 6, 
    name: "Prompt Arena", 
    imageUrl: "https://promptarena.xyz/splash.png",
    url: "https://promptarena.xyz",
    hidden: true
  },
];

export function generateMetadata(){
  return{
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
      "fc:frame": JSON.stringify(createFrame()),
      "fc:miniapp": JSON.stringify(createFrame()),
    },
  } as Metadata
}

export default function Home(){
    return(
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative">
            {/* Semi-transparent overlay */}
            <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm z-0" />
            
            {/* Launchpad Grid */}
            <div className="relative z-10 w-full max-w-7xl px-8 py-16">
                <div className="grid grid-cols-3 gap-16 md:gap-20 lg:gap-24 xl:gap-28">
                    {apps.map((app) => (
                        <div 
                            key={app.id} 
                            className="flex flex-col items-center justify-center group cursor-pointer"
                        >
                            {/* App Icon */}
                            <div className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-2 transform transition-transform duration-200 ease-out group-hover:scale-110">
                                <img
                                    src={app.imageUrl}
                                    alt={app.name}
                                    className={`w-full h-full rounded-2xl shadow-lg object-cover ${app.hidden ? 'opacity-[0.15]' : ''}`}
                                />
                            </div>
                            {/* App Name */}
                            <p className="text-xs md:text-sm text-center text-neutral-900 dark:text-white font-medium mt-1 max-w-[100px] truncate">
                                {app.hidden ? '***' : app.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}