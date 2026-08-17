import { createFileRoute } from '@tanstack/react-router'
import { socialLinks } from '../lib/constants'
import { videos } from '../video/videos'
import { getBlogPosts } from '../blog/utils'

function formatTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        try {
          let content = `# Dylan Steck\n\n`
          content += `This is a directory of content on [dylansteck.com](https://dylansteck.com)\n\n`

          content += `## Pages\n\n`
          content += `- [Homepage](/) - Dylan Steck, Engineer at Base\n`
          content += `- [RSS Feed](/rss) - RSS feed\n\n`

          const blogPosts = getBlogPosts().sort((a, b) =>
            a.slug.localeCompare(b.slug)
          )
          if (blogPosts.length > 0) {
            content += `## Blog Posts\n\n`
            content += `> For agents: Use \`curl -H "Accept: text/markdown"\` when fetching blog posts to receive markdown content.\n\n`
            blogPosts.forEach((post) => {
              content += `- [${formatTitle(post.slug)}](/blog/${post.slug})\n`
            })
            content += `\n`
          }

          content += `## Videos\n\n`
          videos.forEach((video) => {
            content += `- [${video.title}](/video/${video.id})\n`
          })
          content += `\n`

          content += `## Contact\n\n`
          socialLinks.forEach((link) => {
            content += `- [${link.text}](${link.url})\n`
          })
          content += `\n`

          content += `## About\n\n`
          content += `Dylan Steck is an engineer at [Base](https://base.org), focused on building products onchain that give people more agency.\n`

          return new Response(content, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
            },
          })
        } catch (error) {
          console.error('Error generating llms.txt:', error)
          return new Response('Error generating directory', { status: 500 })
        }
      },
    },
  },
})
