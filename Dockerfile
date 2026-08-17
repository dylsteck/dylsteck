FROM oven/bun:1.3.4 AS deps
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
RUN if [ -f bun.lock ]; then bun install --frozen-lockfile; else bun install; fi

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Nitro Node output for self-hosting. Cloudflare deploys use the default Vite target.
ENV DEPLOY_TARGET=node
RUN node node_modules/vite/bin/vite.js build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
