import { FarcasterCastData, FeedItem } from 'app/api/feed/types'
import {
  CACHE_SECONDS,
  DEFAULT_FARCASTER_USERNAME,
  FARCASTER_API_BASE,
  FARCASTER_BASE_URL,
  FARCASTER_FID,
  FARCASTER_IMAGE_PROXY_BASE,
  WARPCAST_CDN_BASE,
} from './constants'

type FarcasterCast = FarcasterCastData

export function buildFarcasterProfileCastsUrl({
  fid = FARCASTER_FID,
  limit,
  cursor,
}: {
  fid?: number
  limit: number
  cursor?: string | null
}): string {
  let url = `${FARCASTER_API_BASE}/profile-casts?fid=${fid}&limit=${limit}`
  if (cursor) {
    url += `&cursor=${encodeURIComponent(cursor)}`
  }
  return url
}

export function buildFarcasterCastUrl(username: string | undefined, castHash: string): string {
  const handle = username || DEFAULT_FARCASTER_USERNAME
  return `${FARCASTER_BASE_URL}/${handle}/${castHash}`
}

export function buildFarcasterCastImageUrl(castHash: string): string {
  const castImageBase = `${WARPCAST_CDN_BASE}/cast-collectibles/image?castHash`
  const encodedBase = encodeURIComponent(castImageBase)
  return `${FARCASTER_IMAGE_PROXY_BASE}/${encodedBase}=${castHash}`
}

export function transformFarcasterCast(cast: FarcasterCast): FeedItem | null {
  const hasImage = (cast.embeds?.images?.length ?? 0) > 0 || (cast.embeds?.videos?.length ?? 0) > 0
  const hasText = cast.text && cast.text.length > 20

  if (!hasImage && !hasText) {
    return null
  }

  let imageUrl: string | undefined = undefined

  if (cast.embeds?.images?.length) {
    imageUrl = cast.embeds.images[0].url
  } else if (cast.embeds?.videos?.length) {
    imageUrl = cast.embeds.videos[0].thumbnailUrl || cast.embeds.videos[0].imageUrl
  } else if (cast.embeds?.urls?.length) {
    for (const embed of cast.embeds.urls) {
      if (embed.openGraph?.image) {
        imageUrl = embed.openGraph.image
        break
      }
    }
  }

  const castDate = cast.timestamp ? new Date(cast.timestamp) : new Date()
  const timestamp = castDate.getTime()
  const formattedDate = castDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return {
    id: `farcaster-${cast.hash}`,
    type: 'farcaster' as const,
    title: cast.text?.substring(0, 100) || 'Farcaster post',
    date: formattedDate,
    dateTimestamp: timestamp,
    imageUrl,
    text: cast.text,
    url: buildFarcasterCastUrl(cast.author?.username, cast.hash),
    description: cast.text,
    castData: cast,
  }
}

export function parseDate(dateString: string): number {
  const parsed = new Date(dateString)

  if (isNaN(parsed.getTime())) {
    const months: { [key: string]: string } = {
      january: '01',
      february: '02',
      march: '03',
      april: '04',
      may: '05',
      june: '06',
      july: '07',
      august: '08',
      september: '09',
      october: '10',
      november: '11',
      december: '12',
    }

    const parts = dateString.toLowerCase().match(/(\w+)\s+(\d+),\s+(\d+)/)
    if (parts) {
      const month = months[parts[1]]
      const day = parts[2].padStart(2, '0')
      const year = parts[3]
      return new Date(`${year}-${month}-${day}`).getTime()
    }
  }

  return parsed.getTime()
}

export function sortFeedItems(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => {
    const timestampA = a.dateTimestamp ?? parseDate(a.date)
    const timestampB = b.dateTimestamp ?? parseDate(b.date)
    return timestampB - timestampA
  })
}

export async function fetchFarcasterCasts({
  cursor,
  limit,
}: {
  cursor?: string | null
  limit: number
}): Promise<{ casts: FarcasterCast[]; nextCursor: string | null }> {
  try {
    const url = buildFarcasterProfileCastsUrl({ limit, cursor })

    const response = await fetch(url, {
      next: { revalidate: cursor ? CACHE_SECONDS.OLD : CACHE_SECONDS.RECENT }
    })

    if (!response.ok) {
      console.error(`Farcaster API error: ${response.status} ${response.statusText}`)
      return { casts: [], nextCursor: null }
    }

    const data = await response.json()
    return {
      casts: data.result?.casts || [],
      nextCursor: data.next?.cursor || null
    }
  } catch (error) {
    console.error('Error fetching Farcaster posts:', error)
    return { casts: [], nextCursor: null }
  }
}
