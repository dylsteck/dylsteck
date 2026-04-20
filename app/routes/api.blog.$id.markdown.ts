import { createFileRoute } from '@tanstack/react-router'
import { getBlogPosts, processMarkdownComponents } from '../blog/utils'

export const Route = createFileRoute('/api/blog/$id/markdown')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { id } = params
        const post = getBlogPosts().find((post) => post.slug === id)

        if (!post) {
          return new Response(JSON.stringify({ error: 'Post not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const processedContent = processMarkdownComponents(post.content)

        return new Response(processedContent, {
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
          },
        })
      },
    },
  },
})
