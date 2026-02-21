/**
 * Send a newsletter broadcast for a blog post.
 * Usage: bun run scripts/send-newsletter.ts <slug>
 * Example: bun run scripts/send-newsletter.ts agentic-workspaces
 *
 * Requires RESEND_API_KEY and RESEND_AUDIENCE_ID (segment ID) in env.
 */

import { Resend } from 'resend'
import { getBlogPosts } from '../app/blog/utils'
import { processMarkdownForRSS } from '../app/lib/markdown-to-html'
import { appUrl } from '../app/sitemap'

const apiKey = process.env.RESEND_API_KEY
const audienceId = process.env.RESEND_AUDIENCE_ID

if (!apiKey || !audienceId) {
  console.error('Missing RESEND_API_KEY or RESEND_AUDIENCE_ID')
  process.exit(1)
}

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: bun run scripts/send-newsletter.ts <slug>')
  process.exit(1)
}

const resend = new Resend(apiKey)

async function main() {
  const posts = getBlogPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    console.error(`Post not found: ${slug}`)
    process.exit(1)
  }

  const { metadata, content } = post
  const title = metadata.title
  const postUrl = `${appUrl}/blog/${slug}`

  const bodyHtml = processMarkdownForRSS(content)
  const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
${bodyHtml}
<hr style="margin: 2em 0; border: none; border-top: 1px solid #ddd;">
<p style="font-size: 14px; color: #666;">
  <a href="${postUrl}">Read on web</a>
</p>
<p style="font-size: 12px; color: #999;">
  <a href="{{{RESEND_UNSUBSCRIBE_URL}}}">Unsubscribe</a>
</p>
</body>
</html>
`

  const { data: createData, error: createError } = await resend.broadcasts.create({
    name: `Newsletter: ${title}`,
    audienceId: audienceId as string,
    from: process.env.RESEND_FROM || 'Dylan Steck <onboarding@resend.dev>',
    subject: `New post: ${title}`,
    html: emailHtml,
  })

  if (createError || !createData?.id) {
    console.error('Resend create error:', createError)
    process.exit(1)
  }

  const { error: sendError } = await resend.broadcasts.send(createData.id)
  if (sendError) {
    console.error('Resend send error:', sendError)
    process.exit(1)
  }

  console.log('Broadcast sent:', createData.id)
}

main()
