import { createFileRoute } from '@tanstack/react-router'
import { appUrl } from '../lib/site'
import { getBlogPosts, processMarkdownComponents } from '../blog/utils'
import { posts } from '../blog/posts/posts'

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c: string): string => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown

  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  html = html
    .split('\n\n')
    .map((para) => {
      if (para.trim().startsWith('<')) {
        return para
      }
      return para.trim() ? `<p>${para.trim()}</p>` : ''
    })
    .join('\n')

  return html
}

function processMarkdownForRSS(content: string): string {
  let processed = processMarkdownComponents(content)
  processed = convertMarkdownToHTML(processed)
  return processed
}

export const Route = createFileRoute('/rss')({
  server: {
    handlers: {
      GET: async () => {
        const allBlogs = getBlogPosts()
        const itemsXml = allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .map((post: any) => {
            const postItem = posts.find((p) => p.id === post.slug)
            const description = post.metadata.summary
              ? escapeXml(post.metadata.summary)
              : ''
            const fullContent = post.content ? processMarkdownForRSS(post.content) : ''
            const imageUrl = postItem?.banner ?? ''
            const imageType = imageUrl.endsWith('.png')
              ? 'image/png'
              : 'image/jpeg'
            return `<item>
          <title>${post.metadata.title}</title>
          <link>${`${appUrl}/blog/${post.slug}`}</link>
          <description>${description}</description>
          <content:encoded><![CDATA[${fullContent}]]></content:encoded>
          <enclosure url="${imageUrl}" type="${imageType}" />
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`
          })
          .join('\n')

        const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
        <title>Dylan Steck</title>
        <link>${appUrl}</link>
        <description>This is Dylan Steck's RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

        return new Response(rssFeed, {
          headers: {
            'Content-Type': 'text/xml',
          },
        })
      },
    },
  },
})
