import { createFileRoute } from '@tanstack/react-router'
import fs from 'node:fs'
import path from 'node:path'
import { socialLinks } from '../lib/constants'
import { videos } from '../video/videos'

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET: async () => {
        try {
          const appDir = path.join(process.cwd(), 'app')

          let content = `# Dylan Steck\n\n`
          content += `This is a directory of content on [dylansteck.com](https://dylansteck.com)\n\n`

          content += `## Pages\n\n`
          content += `- [Homepage](/) - Dylan Steck, Engineer at Base\n`
          content += `- [RSS Feed](/rss) - RSS feed\n\n`

          const blogPostsDir = path.join(appDir, 'blog', 'posts')
          if (fs.existsSync(blogPostsDir)) {
            content += `## Blog Posts\n\n`
            content += `> For agents: Use \`curl -H "Accept: text/markdown"\` when fetching blog posts to receive markdown content.\n\n`
            const blogFiles = fs
              .readdirSync(blogPostsDir)
              .filter((file) => file.endsWith('.md'))
              .sort()

            blogFiles.forEach((file) => {
              const slug = file.replace('.md', '')
              const title = slug
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (l) => l.toUpperCase())
              content += `- [${title}](/blog/${slug})\n`
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
