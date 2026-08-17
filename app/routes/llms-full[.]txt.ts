import { createFileRoute } from '@tanstack/react-router'
import { socialLinks } from '../lib/constants'
import { videos } from '../video/videos'
import {
  getBlogPosts,
  getRootMarkdownFiles,
  processMarkdownComponents,
} from '../blog/utils'

function formatTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

export const Route = createFileRoute('/llms-full.txt')({
  server: {
    handlers: {
      GET: async () => {
        try {
          let content = `# Dylan Steck - Full Content\n\n`
          content += `This file contains all markdown content from [dylansteck.com](https://dylansteck.com)\n\n`

          content += `## Pages\n\n`
          content += `- [Homepage](/) - Dylan Steck, Engineer at Base\n`
          content += `- [RSS Feed](/rss) - RSS feed\n\n`

          const blogPosts = getBlogPosts().sort((a, b) =>
            a.slug.localeCompare(b.slug)
          )
          if (blogPosts.length > 0) {
            content += `## Blog Posts\n\n`
            blogPosts.forEach((post) => {
              content += `- [${formatTitle(post.slug)}](/blog/${post.slug})\n`
            })
            content += `\n`
          }

          content += `## Videos\n\n`
          videos.forEach((video) => {
            content += `- [${video.title}](/video/${video.id}) - ${video.description}\n`
          })
          content += `\n`

          content += `## Contact\n\n`
          socialLinks.forEach((link) => {
            content += `- [${link.text}](${link.url})\n`
          })
          content += `\n`

          content += `${'='.repeat(80)}\n\n`

          getRootMarkdownFiles().forEach((file) => {
            content += `## ${file.path}\n\n`
            content += processMarkdownComponents(file.content)
            content += `\n\n${'-'.repeat(60)}\n\n`
          })

          blogPosts.forEach((post) => {
            content += `## ${formatTitle(post.slug)} - [/blog/${post.slug}](/blog/${post.slug})\n\n`
            content += processMarkdownComponents(post.content)
            content += `\n\n${'-'.repeat(60)}\n\n`
          })

          content += `## About\n\n`
          content += `Dylan Steck is an engineer at [Base](https://base.org), focused on building products onchain that give people more agency.\n`
          content += `This export contains all the markdown content from his personal website at dylansteck.com.\n`

          return new Response(content, {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Content-Disposition': 'inline; filename="llms-full.txt"',
            },
          })
        } catch (error) {
          console.error('Error generating llms-full.txt:', error)
          return new Response('Error generating full content export', { status: 500 })
        }
      },
    },
  },
})
