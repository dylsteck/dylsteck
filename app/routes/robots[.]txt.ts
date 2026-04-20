import { createFileRoute } from '@tanstack/react-router'
import { appUrl } from '../lib/site'

export const Route = createFileRoute('/robots.txt')({
  server: {
    handlers: {
      GET: async () => {
        const body = `User-agent: *
Allow: /api/og/*
Sitemap: ${appUrl}/sitemap.xml
`
        return new Response(body, {
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
      },
    },
  },
})
