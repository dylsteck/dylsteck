export const DEFAULT_FARCASTER_USERNAME = 'dylsteck.eth'
export const FARCASTER_FID = 616

export const FARCASTER_API_BASE = 'https://farcaster.xyz/~api/v2'
export const FARCASTER_BASE_URL = 'https://farcaster.xyz'
export const FARCASTER_IMAGE_PROXY_BASE = 'https://wrpcd.net/cdn-cgi/image/anim=false,fit=contain,f=auto,w=3186'
export const WARPCAST_CDN_BASE = 'https://client.warpcast.com/v2'

export const FARCASTER_INITIAL_LIMIT = 25
export const FARCASTER_PAGE_LIMIT = 25
export const FARCASTER_MAX_LIMIT = 50

export const CACHE_SECONDS = {
  RECENT: 300,
  OLD: 86400,
  STALE_RECENT: 60,
} as const

export const BROWSER_CACHE_SECONDS = {
  OLD: 604800,
  STALE_OLD: 604800,
} as const

export const CACHE_CONTROL = {
  RECENT: `public, max-age=${CACHE_SECONDS.RECENT}, stale-while-revalidate=${CACHE_SECONDS.STALE_RECENT}`,
  OLD: `public, max-age=${BROWSER_CACHE_SECONDS.OLD}, stale-while-revalidate=${BROWSER_CACHE_SECONDS.STALE_OLD}`,
} as const

export const socialLinks = [
  { url: 'https://github.com/dylsteck', text: 'GitHub' },
  { url: `${FARCASTER_BASE_URL}/${DEFAULT_FARCASTER_USERNAME}`, text: 'Farcaster' },
  { url: 'https://x.com/Dylan_Steck', text: 'X' },
  { url: 'https://linkedin.com/in/dylansteck', text: 'LinkedIn' }
]