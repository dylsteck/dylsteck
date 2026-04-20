import { createFileRoute } from '@tanstack/react-router'
import AppsPageClient from '../apps/apps-client'
import { apps } from '../apps/apps'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'

const miniAppEmbed = JSON.stringify(createMiniAppEmbed())

export const Route = createFileRoute('/apps')({
  head: () => ({
    meta: [
      { title: 'Apps | Dylan Steck' },
      { name: 'description', content: 'Apps by Dylan Steck' },
      { property: 'og:title', content: 'Apps' },
      { property: 'og:description', content: 'Apps by Dylan Steck' },
      { property: 'og:image', content: bannerImg },
      { property: 'og:url', content: `${appUrl}/apps` },
      { property: 'og:site_name', content: 'Dylan Steck' },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { name: 'fc:frame', content: miniAppEmbed },
      { name: 'fc:miniapp', content: miniAppEmbed },
    ],
  }),
  component: AppsPage,
})

function AppsPage() {
  return <AppsPageClient apps={apps} />
}
