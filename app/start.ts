import { createStart, createMiddleware } from '@tanstack/react-start'
import { getBlogPosts, processMarkdownComponents } from './blog/utils'

const blogMarkdownMiddleware = createMiddleware().server(
  async ({ request, next }) => {
    const url = new URL(request.url)
    const pathname = url.pathname
    const acceptHeader = request.headers.get('accept') || ''

    const blogPostMatch = pathname.match(/^\/blog\/([^\/]+)$/)

    if (
      blogPostMatch &&
      (acceptHeader.includes('text/markdown') ||
        acceptHeader.includes('text/x-markdown') ||
        acceptHeader.includes('application/markdown'))
    ) {
      const postId = blogPostMatch[1]
      const post = getBlogPosts().find((p) => p.slug === postId)
      if (post) {
        const processedContent = processMarkdownComponents(post.content)
        const response = new Response(processedContent, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
          },
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
