import { createFileRoute } from '@tanstack/react-router'
import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY
const segmentId = process.env.RESEND_AUDIENCE_ID
const resend = apiKey ? new Resend(apiKey) : null

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const Route = createFileRoute('/api/subscribe')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!resend || !segmentId) {
          return Response.json(
            { error: 'Email subscription is not configured' },
            { status: 503 }
          )
        }

        let body: { email?: string }
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const email = body.email?.trim()
        if (!email) {
          return Response.json({ error: 'Email is required' }, { status: 400 })
        }

        if (!EMAIL_REGEX.test(email)) {
          return Response.json(
            { error: 'Invalid email format' },
            { status: 400 }
          )
        }

        const { data, error } = await resend.contacts.create({
          email,
          segments: [{ id: segmentId }],
        })

        if (error) {
          console.error('Resend contact create error:', error)
          return Response.json(
            { error: error.message || 'Failed to subscribe' },
            { status: 500 }
          )
        }

        return Response.json({ success: true, id: data?.id })
      },
    },
  },
})
