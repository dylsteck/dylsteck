import { createStart, createMiddleware } from '@tanstack/react-start'
import { getBlogPosts, processMarkdownComponents } from './blog/utils'

const blogMarkdownMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const url = new URL(request.url)
    const pathname = url.pathname
    const acceptHeader = request.headers.get('accept') || ''

    const markdownPathMatch = pathname.match(/^\/blog\/([^\/]+)\.md$/)
    const blogPostMatch = pathname.match(/^\/blog\/([^\/]+)$/)

    if (
      (request.method === 'GET' || request.method === 'HEAD') &&
      blogPostMatch &&
      (markdownPathMatch ||
        acceptHeader.includes('text/markdown') ||
        acceptHeader.includes('text/x-markdown') ||
        acceptHeader.includes('application/markdown'))
    ) {
      const postId = markdownPathMatch?.[1] ?? blogPostMatch[1]
      const post = getBlogPosts().find((p) => p.slug === postId)
      if (post) {
        const processedContent = processMarkdownComponents(post.content)
        const response = new Response(request.method === 'HEAD' ? null : processedContent, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            ...(!markdownPathMatch ? { Vary: 'Accept' } : {}),
          },
        })
        return { request, pathname, context: {}, response } as any
      }
      if (markdownPathMatch) {
        const response = new Response(request.method === 'HEAD' ? null : 'Post not found', {
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
        return { request, pathname, context: {}, response } as any
      }
    }

    return await next()
  }
)

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [blogMarkdownMiddleware],
  }
})
