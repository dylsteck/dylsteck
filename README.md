# dylsteck

![dylansteck.com homepage as of February 2026](https://i.imgur.com/DhOeGlK.png)

The homepage of Dylan Steck, live at [dylansteck.com](https://dylansteck.com)

## Features

The site is optimized for performance and SEO, requires minimal outside dependencies, and works as a [Farcaster mini app](https://miniapps.farcaster.xyz)

Features/packages used include:

- [Farcaster mini app SDK](https://miniapps.farcaster.xyz)
- [Geist](https://vercel.com/font)
- [TailwindCSS](https://tailwindcss.com/)
- [TanStack Start](https://tanstack.com/start) on [Vite](https://vite.dev/)
- [MDX](https://mdxjs.com/) and Markdown support
- Optimized for SEO (sitemap, robots, JSON-LD schema)
- RSS feed

Originally built on top of this [Next.js MDX boilerplate repo](https://github.com/vercel/examples/tree/main/solutions/blog)

## Development

```sh
bun install
bun run dev
```

## Deployment

There's a `Dockerfile` at the repo root for self-hosting (e.g. on [Coolify](https://coolify.io)). It builds with Bun and serves the Nitro output on port 3000 via Node:

```sh
docker build -t dylsteck .
docker run -p 3000:3000 dylsteck
```

© 2026 MIT Licensed
