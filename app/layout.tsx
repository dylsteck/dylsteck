import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { appUrl, bannerImg, createFrame } from './sitemap'
import Head from 'next/head'
import Script from 'next/script'
import { FrameProvider } from './components/frame-provider'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'

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

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <MiniKitProvider chain={null as any}>
            <FrameProvider>
              {children}
            </FrameProvider>
          </MiniKitProvider>
          <Footer />
        </main>
        <Script
          strategy="afterInteractive"
          src="https://dylsteck-analytics.up.railway.app/umami.js"
          async
          defer
          data-website-id="6bd90a5b-62c2-44c5-850b-7e24720d2062"
        />
      </body>
    </html>
  )
}