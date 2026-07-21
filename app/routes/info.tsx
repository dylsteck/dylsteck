import { createFileRoute } from '@tanstack/react-router'
import Image from '../components/image'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'
import CoinbaseIcon from '../components/icons/coinbase-icon'
import FarcasterIcon from '../components/icons/farcaster-icon'

const miniAppEmbed = JSON.stringify(createMiniAppEmbed())

export const Route = createFileRoute('/info')({
  head: () => ({
    meta: [
      { title: 'Info | Dylan Steck' },
      { name: 'description', content: 'Information about Dylan Steck' },
      { property: 'og:title', content: 'Info' },
      { property: 'og:description', content: 'Information about Dylan Steck' },
      { property: 'og:image', content: bannerImg },
      { property: 'og:url', content: `${appUrl}/info` },
      { property: 'og:site_name', content: 'Dylan Steck' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { name: 'fc:frame', content: miniAppEmbed },
      { name: 'fc:miniapp', content: miniAppEmbed },
    ],
  }),
  component: InfoPage,
})

function InfoPage() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-black pt-8 sm:pt-9">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
        <div className="max-w-xl">
          <Image
            src="/dylan.png"
            alt="Dylan Steck"
            width={260}
            height={260}
            className="mb-7 h-auto w-[260px] opacity-95"
          />
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          As a kid I had a few blogs I wanted to customize, and that led me to learn coding online. The more I learned about programming and the world of tech, the more I was hooked to the idea of anyone anywhere being able to build anything.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          In high school I started becoming interested in why desktops still work the way they do, which led me to start working on <span className="inline-flex items-center mx-0.5 align-middle"><Image src="/cortex-icon.png" alt="Cortex" width={22} height={22} className="w-[22px] h-[22px]" /></span> <a href="https://withcortex.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Cortex</a>, rethinking the desktop around tasks that connect directly to your data instead of apps in separate windows.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100 mb-6">
          When I got to college I had been building apps already and knew that's what I wanted to spend my time doing. I fortunately got down the crypto rabbit hole at the right time, found out and got super passionate about <span className="inline-flex items-center mx-0.5 align-middle"><FarcasterIcon className="w-3.5 h-3.5 text-[#6A3CFF]" /></span> <a href="https://farcaster.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Farcaster</a>, and through a series of internships and projects dove head first into the space. Around the time I had helped out with <a href="https://farcon.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">FarCon LA</a> and was doing work at <a href="https://neynar.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Neynar</a>, I dropped out of college to keep pursuing this dream.
        </p>
        <p className="text-left text-sm text-neutral-900 dark:text-neutral-100">
          Now I work on <a href="https://base.app" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Base app</a> at <span className="inline-flex items-center mx-0.5 align-middle"><CoinbaseIcon className="w-3.5 h-3.5 text-[#0052FF] dark:text-white" /></span> <a href="https://coinbase.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Coinbase</a>, where I help figure out how all our onchain legos can fit together so we can bring more people onchain. In my free time, I'm exploring what interfaces for agentic coding and work will look like.
        </p>
        <div className="mt-6">
          <p className="text-left text-sm text-neutral-900 dark:text-neutral-300 mb-3">Links</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <a href="https://app.ens.domains/dylsteck.eth" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 dark:text-white hover:opacity-70 transition-opacity">ENS</a>
            <a href="https://farcaster.xyz/dylsteck.eth" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 dark:text-white hover:opacity-70 transition-opacity">Farcaster</a>
            <a href="https://github.com/dylsteck" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 dark:text-white hover:opacity-70 transition-opacity">GitHub</a>
            <a href="https://linkedin.com/in/dylansteck" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 dark:text-white hover:opacity-70 transition-opacity">LinkedIn</a>
            <a href="https://x.com/dylan_steck" target="_blank" rel="noopener noreferrer" className="text-sm text-neutral-900 dark:text-white hover:opacity-70 transition-opacity">X</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
