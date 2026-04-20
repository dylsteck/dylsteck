FROM oven/bun:1.3.4 AS deps
WORKDIR /app
COPY package.json bun.lock* package-lock.json* ./
RUN if [ -f bun.lock ]; then bun install --frozen-lockfile; else bun install; fi

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node node_modules/vite/bin/vite.js build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
# Blog post markdown + other source-read files are loaded at runtime via
# fs.readFileSync(process.cwd() + '/app/...'), so we ship the relevant source.
COPY --from=builder /app/app ./app
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
