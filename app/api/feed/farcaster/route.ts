import { NextResponse } from 'next/server'

// Cache for Farcaster posts - in production use Redis or similar
const cache = new Map<string, { data: any; timestamp: number }>()

// Cache duration: 1 day for older posts, 5 minutes for recent
const CACHE_DURATION_OLD = 24 * 60 * 60 * 1000 // 1 day in ms
const CACHE_DURATION_RECENT = 5 * 60 * 1000 // 5 minutes in ms

function getCacheKey(cursor: string | null, limit: number): string {
  return `farcaster:${cursor || 'initial'}:${limit}`
}

function isRecentCast(timestamp: number): boolean {
  // Posts less than 1 hour old are considered "recent"
  return Date.now() - timestamp < 60 * 60 * 1000
}

async function fetchFarcasterPage(cursor?: string, limit: number = 50) {
  const cacheKey = getCacheKey(cursor || null, limit)
  const cached = cache.get(cacheKey)
  
  // Check cache first
  if (cached) {
    const age = Date.now() - cached.timestamp
    // Use longer cache for paginated (older) content
    const maxAge = cursor ? CACHE_DURATION_OLD : CACHE_DURATION_RECENT
    
    if (age < maxAge) {
      return cached.data
    }
  }
  
  try {
    let url = `https://farcaster.xyz/~api/v2/profile-casts?fid=616&limit=${limit}`
    if (cursor) {
      url += `&cursor=${encodeURIComponent(cursor)}`
    }
    
    const response = await fetch(url, {
      // Use Next.js cache with appropriate revalidation
      next: { 
        revalidate: cursor ? 86400 : 300 // 1 day for older, 5 min for recent
      }
    })
    
    if (!response.ok) {
      console.error(`Farcaster API error: ${response.status} ${response.statusText}`)
      return { casts: [], nextCursor: null }
    }
    
    const data = await response.json()
    const result = {
      casts: data.result?.casts || [],
      nextCursor: data.next?.cursor || null
    }
    
    // Store in cache
    cache.set(cacheKey, { data: result, timestamp: Date.now() })
    
    return result
  } catch (error) {
    console.error('Error fetching Farcaster posts:', error)
    return { casts: [], nextCursor: null }
  }
}

function transformFarcasterCast(cast: any) {
  // Only include casts with images or meaningful text
  const hasImage = cast.embeds?.images?.length > 0 || cast.embeds?.videos?.length > 0
  const hasText = cast.text && cast.text.length > 20
  
  if (!hasImage && !hasText) {
    return null
  }

  // Extract image from embeds
  let imageUrl: string | undefined = undefined
  
  if (cast.embeds?.images?.length > 0) {
    imageUrl = cast.embeds.images[0].url
  } else if (cast.embeds?.videos?.length > 0) {
    imageUrl = cast.embeds.videos[0].thumbnailUrl || cast.embeds.videos[0].imageUrl
  } else if (cast.embeds?.urls?.length > 0) {
    for (const embed of cast.embeds.urls) {
      if (embed.openGraph?.image) {
        imageUrl = embed.openGraph.image
        break
      }
    }
  }

  const timestamp = cast.timestamp ? new Date(cast.timestamp).getTime() : Date.now()
  const formattedDate = new Date(cast.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return {
    id: `farcaster-${cast.hash}`,
    type: 'farcaster' as const,
    title: cast.text?.substring(0, 100) || 'Farcaster post',
    date: formattedDate,
    dateTimestamp: timestamp,
    imageUrl,
    text: cast.text,
    url: `https://warpcast.com/${cast.author?.username || 'dylsteck.eth'}/${cast.hash}`,
    description: cast.text,
    castData: cast
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') || undefined
  const limit = Math.min(parseInt(searchParams.get('limit') || '25', 10), 50)
  
  try {
    const result = await fetchFarcasterPage(cursor, limit)
    
    const items = result.casts
      .map(transformFarcasterCast)
      .filter((item: any) => item !== null)
    
    // Sort by timestamp (newest first)
    items.sort((a: any, b: any) => b.dateTimestamp - a.dateTimestamp)
    
    return NextResponse.json({
      items,
      nextCursor: result.nextCursor,
      hasMore: !!result.nextCursor
    }, {
      headers: {
        // Cache response in browser/CDN
        'Cache-Control': cursor 
          ? 'public, max-age=86400, stale-while-revalidate=86400' // 1 day for older
          : 'public, max-age=300, stale-while-revalidate=60' // 5 min for recent
      }
    })
  } catch (error) {
    console.error('Error in Farcaster feed route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Farcaster feed', items: [], nextCursor: null, hasMore: false },
      { status: 500 }
    )
  }
}
