import { createFileRoute } from '@tanstack/react-router'
import { appUrl } from '../lib/site'
import { getBlogPosts } from '../blog/utils'
import { videos as videosList } from '../video/videos'

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const blogs = getBlogPosts().map((post) => ({
          url: `${appUrl}/blog/${post.slug}`,
          lastModified: post.metadata.publishedAt,
        }))

        const videos = videosList.map((video) => ({
          url: `${appUrl}/video/${video.id}`,
          lastModified: new Date().toISOString().split('T')[0],
        }))

        const routes = ['', '/blog'].map((route) => ({
          url: `${appUrl}${route}`,
          lastModified: new Date().toISOString().split('T')[0],
        }))

        const allUrls = [...routes, ...blogs, ...videos]

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`

        return new Response(xml, {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
          },
        })
      },
    },
  },
})
