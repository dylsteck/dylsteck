# Email Newsletter

This site uses [Resend](https://resend.com) for email subscriptions and newsletter broadcasts.

## Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. In the Resend dashboard, create an **Audience** or **Segment** (e.g. "Newsletter")
3. Copy your API key and Audience/Segment ID
4. Add to `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=your-audience-or-segment-id
```

5. For production, add and verify your domain in Resend, then set:

```
RESEND_FROM=Dylan Steck <newsletter@dylansteck.com>
```

## Sending newsletters

### Option 1: PR with `newsletter` label

1. Add a new blog post via PR (new `.md` file in `app/blog/posts/`)
2. Add the `newsletter` label to the PR
3. Merge → GitHub Action sends the newsletter to all subscribers

### Option 2: Manual script

```bash
bun run send-newsletter <slug>
```

Example: `bun run send-newsletter agentic-workspaces`

## GitHub secrets

For the CI workflow, add these repo secrets:

- `RESEND_API_KEY`
- `RESEND_AUDIENCE_ID` (your Audience or Segment ID)
- `RESEND_FROM` (optional; defaults to onboarding@resend.dev)

## Email content

Newsletters use the full blog post content (same HTML as RSS feed), with an unsubscribe link. The markdown-to-HTML conversion is shared between RSS and email (`app/lib/markdown-to-html.ts`).
