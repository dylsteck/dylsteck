import Link from 'next/link'
import Media from './components/media'
import { fetchMetadata } from 'frames.js/next'
import { Metadata } from 'next'
import { bannerImg, baseUrl } from './sitemap'

export async function generateMetadata(){
  return{
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Dylan Steck',
      template: '%s | Dylan Steck',
    },
    description: 'The homepage of Dylan Steck, a full-stack engineer focused on building software that gives people more agency.',
    openGraph: {
      title: 'Dylan Steck',
      description: 'The homepage of Dylan Steck, a full-stack engineer focused on building software that gives people more agency.',
      images: [bannerImg],
      url: baseUrl,
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
      ...(await fetchMetadata(
        new URL(
          "/frames",
          process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000"
        )
      )),
    },
  } as Metadata
}

export default function Page() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tighter">
        Dylan Steck
      </h1>
      <p className="mb-4">
        Currently building products onchain and hacking at <Link className="underline" href="https://farhack.xyz" target="_blank">FarHack</Link>.
        Full-stack engineer focused on building software that gives people more agency. 
      </p>
      <div className="my-8">
        <Media />
      </div>
    </section>
  )
}
