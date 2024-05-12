import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import Footer from './components/footer'
import { bannerImg, baseUrl } from './sitemap'
import Head from 'next/head'
import { fetchMetadata } from 'frames.js/next'

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
        <script async defer data-website-id="6bd90a5b-62c2-44c5-850b-7e24720d2062" src="https://dylsteck-analytics.up.railway.app/umami.js"></script>
      </Head>
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
