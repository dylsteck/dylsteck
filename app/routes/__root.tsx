/// <reference types="vite/client" />
import type { ReactNode } from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { MiniAppProvider } from '../components/mini-app-provider'
import Topbar from '../components/topbar'
import { appUrl, bannerImg, createMiniAppEmbed } from '../lib/site'
import appCss from '../global.css?url'
import fcCss from 'react-farcaster-embed/dist/styles.css?url'

const cx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(' ')

const miniAppEmbed = JSON.stringify(createMiniAppEmbed())

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { title: 'Dylan Steck' },
      {
        name: 'description',
        content:
          'The homepage of Dylan Steck, an engineer at Base focused on building products onchain that give people more agency',
      },
      { property: 'og:title', content: 'Dylan Steck' },
      {
        property: 'og:description',
        content:
          'The homepage of Dylan Steck, an engineer at Base focused on building products onchain that give people more agency',
      },
      { property: 'og:image', content: bannerImg },
      { property: 'og:url', content: appUrl },
      { property: 'og:site_name', content: 'Dylan Steck' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index, follow' },
      {
        name: 'googlebot',
        content:
          'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1',
      },
      { name: 'base:app_id', content: '689795f24e177e29024ef622' },
      { name: 'fc:frame', content: miniAppEmbed },
      { name: 'fc:miniapp', content: miniAppEmbed },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: fcCss },
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&family=Geist:wght@400;500;600;700&display=swap',
      },
    ],
    scripts: [
      {
        src: 'https://dylsteck-analytics.up.railway.app/umami.js',
        async: true,
        defer: true,
        'data-website-id': '6bd90a5b-62c2-44c5-850b-7e24720d2062',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black'
      )}
      style={{
        fontFamily:
          '"Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <head>
        <HeadContent />
      </head>
      <body className="antialiased bg-white dark:bg-black">
        <MiniAppProvider>
          <Topbar />
          <main className="flex-auto min-w-0 flex flex-col">
            <div className="w-full h-full">{children ?? <Outlet />}</div>
          </main>
        </MiniAppProvider>
        <Scripts />
      </body>
    </html>
  )
}
