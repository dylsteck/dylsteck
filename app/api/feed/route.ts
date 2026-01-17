import { NextResponse } from 'next/server'
import { posts } from 'app/blog/posts/posts'
import { videos } from 'app/video/videos'
import { FeedItem } from './types'

// Only fetch initial Farcaster posts - let client paginate for more
const INITIAL_FARCASTER_LIMIT = 25

async function fetchInitialFarcasterPosts() {
  try {
    const url = `https://farcaster.xyz/~api/v2/profile-casts?fid=616&limit=${INITIAL_FARCASTER_LIMIT}`
    
    const response = await fetch(url, {
      next: { revalidate: 300 } // Cache for 5 minutes
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

function transformFarcasterCast(cast: any): FeedItem | null {
  const hasImage = cast.embeds?.images?.length > 0 || cast.embeds?.videos?.length > 0
  const hasText = cast.text && cast.text.length > 20
  
  if (!hasImage && !hasText) {
    return null
  }

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

function parseDate(dateString: string): number {
  const parsed = new Date(dateString)
  
  if (isNaN(parsed.getTime())) {
    const months: { [key: string]: string } = {
      'january': '01', 'february': '02', 'march': '03', 'april': '04',
      'may': '05', 'june': '06', 'july': '07', 'august': '08',
      'september': '09', 'october': '10', 'november': '11', 'december': '12'
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

export async function GET() {
  try {
    // Transform blog posts (static - always included)
    const blogItems: FeedItem[] = posts.map(post => {
      // Use banner if available, otherwise fallback to OG image endpoint
      // Use relative path for same-origin images (Next.js Image handles these)
      const imageUrl = post.banner && post.banner.trim() 
        ? post.banner 
        : `/api/og/blog/${post.id}`
      
      return {
        id: `blog-${post.id}`,
        type: 'blog' as const,
        title: post.title,
        date: post.date,
        dateTimestamp: parseDate(post.date),
        imageUrl,
        url: `/blog/${post.id}`,
        description: post.description
      }
    })

    // Transform videos (static - always included)
    const videoItems: FeedItem[] = videos.map(video => ({
      id: `video-${video.id}`,
      type: 'video' as const,
      title: video.title,
      date: video.date,
      dateTimestamp: parseDate(video.date),
      imageUrl: video.banner && video.banner.trim() ? video.banner : undefined,
      url: `/video/${video.id}`,
      description: video.description
    }))

    // Fetch only initial Farcaster posts - client will paginate for more
    const farcasterResult = await fetchInitialFarcasterPosts()
    const farcasterItems: FeedItem[] = farcasterResult.casts
      .map(transformFarcasterCast)
      .filter((item): item is FeedItem => item !== null)

    // Combine all items
    const allItems = [...blogItems, ...videoItems, ...farcasterItems]

    // Sort by date timestamp (newest first)
    allItems.sort((a, b) => {
      const timestampA = a.dateTimestamp ?? parseDate(a.date)
      const timestampB = b.dateTimestamp ?? parseDate(b.date)
      return timestampB - timestampA
    })

    return NextResponse.json({ 
      items: allItems,
      farcasterCursor: farcasterResult.nextCursor,
      hasMoreFarcaster: !!farcasterResult.nextCursor
    }, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Error generating feed:', error)
    return NextResponse.json(
      { error: 'Failed to generate feed', items: [], farcasterCursor: null, hasMoreFarcaster: false },
      { status: 500 }
    )
  }
}
