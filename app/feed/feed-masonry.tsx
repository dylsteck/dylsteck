'use client'

import { useEffect, useState, useTransition, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FeedItem } from 'app/api/feed/types'
import { FarcasterEmbed } from 'react-farcaster-embed/dist/client'
import FeedFilter from '../components/feed-filter'

type FilterType = 'all' | 'blog' | 'farcaster' | 'video'

function parseFiltersFromUrl(searchParams: URLSearchParams): FilterType[] {
  const filterParam = searchParams.get('filter')
  if (!filterParam) return ['all']
  
  const filters = filterParam.split(',').filter((f): f is FilterType => {
    return ['all', 'blog', 'farcaster', 'video'].includes(f)
  })
  
  return filters.length > 0 ? filters : ['all']
}

export default function FeedMasonry() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  
  // Farcaster pagination state
  const [farcasterCursor, setFarcasterCursor] = useState<string | null>(null)
  const [hasMoreFarcaster, setHasMoreFarcaster] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  
  // Ref for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  const activeFilters = parseFiltersFromUrl(searchParams)

  // Initial feed load
  useEffect(() => {
    const startTime = Date.now()
    
    async function fetchFeed() {
      try {
        const response = await fetch('/api/feed')
        const data = await response.json()
        const feedItems: FeedItem[] = data.items || []
        
        // Sort by timestamp
        const sortedItems = feedItems.sort((a, b) => {
          const timestampA = a.dateTimestamp ?? new Date(a.date).getTime()
          const timestampB = b.dateTimestamp ?? new Date(b.date).getTime()
          return timestampB - timestampA
        })
        
        // Debug: Log blog posts order
        const blogPosts = sortedItems.filter(item => item.type === 'blog').slice(0, 5)
        console.log('Top 5 blog posts after sorting:', blogPosts.map(p => ({ title: p.title, date: p.date, timestamp: p.dateTimestamp })))
        
        const loadTime = Date.now() - startTime
        if (loadTime > 100) {
          setShouldAnimate(true)
        }
        
        setItems(sortedItems)
        setFarcasterCursor(data.farcasterCursor || null)
        setHasMoreFarcaster(data.hasMoreFarcaster || false)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching feed:', error)
        setLoading(false)
      }
    }

    fetchFeed()
  }, [])

  // Load more Farcaster posts
  const loadMoreFarcaster = useCallback(async () => {
    if (loadingMore || !hasMoreFarcaster || !farcasterCursor) return
    
    setLoadingMore(true)
    
    try {
      const response = await fetch(`/api/feed/farcaster?cursor=${encodeURIComponent(farcasterCursor)}&limit=25`)
      const data = await response.json()
      
      if (data.items && data.items.length > 0) {
        setItems(prevItems => {
          // Merge new Farcaster items with existing items
          const existingIds = new Set(prevItems.map(item => item.id))
          const newItems = data.items.filter((item: FeedItem) => !existingIds.has(item.id))
          
          // Combine and sort
          const combined = [...prevItems, ...newItems]
          combined.sort((a, b) => {
            const timestampA = a.dateTimestamp ?? new Date(a.date).getTime()
            const timestampB = b.dateTimestamp ?? new Date(b.date).getTime()
            return timestampB - timestampA
          })
          
          return combined
        })
      }
      
      setFarcasterCursor(data.nextCursor || null)
      setHasMoreFarcaster(data.hasMore || false)
    } catch (error) {
      console.error('Error loading more Farcaster posts:', error)
    } finally {
      setLoadingMore(false)
    }
  }, [loadingMore, hasMoreFarcaster, farcasterCursor])

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || loading) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreFarcaster && !loadingMore) {
          loadMoreFarcaster()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    
    observer.observe(loadMoreRef.current)
    
    return () => observer.disconnect()
  }, [hasMoreFarcaster, loadingMore, loading, loadMoreFarcaster])

  const handleFilterChange = (newFilters: FilterType[]) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      
      if (newFilters.length === 1 && newFilters[0] === 'all') {
        params.delete('filter')
      } else {
        params.set('filter', newFilters.join(','))
      }
      
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  const filteredItems = activeFilters.includes('all')
    ? items
    : items.filter(item => activeFilters.includes(item.type as FilterType))

  // Show load more only when filtering includes Farcaster
  const showLoadMore = hasMoreFarcaster && (activeFilters.includes('all') || activeFilters.includes('farcaster'))

  if (loading) {
    return (
      <>
        <div className="pt-8 sm:pt-9">
          <FeedFilter activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-6 sm:pb-12 pt-2 sm:pt-4">
          {/* Empty state while loading */}
        </div>
      </>
    )
  }

  return (
    <>
      <div className="pt-8 sm:pt-9">
        <FeedFilter activeFilters={activeFilters} onFilterChange={handleFilterChange} />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-6 sm:pb-12 pt-2 sm:pt-4">
        <div className={`masonry-grid feed-grid ${shouldAnimate ? 'feed-items-animate' : ''}`}>
          {filteredItems.map((item, index) => (
            <FeedMasonryItem key={item.id} item={item} index={index} shouldAnimate={shouldAnimate} />
          ))}
        </div>
        
        {/* Load more trigger */}
        {showLoadMore && (
          <div 
            ref={loadMoreRef} 
            className="flex justify-center py-8"
          >
            {loadingMore && (
              <div className="text-neutral-500 text-sm">Loading more...</div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

function FeedMasonryItem({ item, index, shouldAnimate }: { item: FeedItem; index: number; shouldAnimate: boolean }) {
  if (item.type === 'farcaster' && item.castData) {
    return (
      <div 
        className={`farcaster-embed-wrapper ${shouldAnimate ? 'feed-item-fade-in' : ''}`}
        style={shouldAnimate ? { animationDelay: `${Math.min(index * 50, 500)}ms` } : undefined}
      >
        <FarcasterEmbed 
          castData={item.castData}
          options={{
            hideFarcasterLogo: true,
            silentError: true
          }}
        />
      </div>
    )
  }

  // Skip if no image (shouldn't happen for blog/video posts now, but safety check)
  if (!item.imageUrl) {
    return null
  }

  return (
    <Link
      href={item.url}
      className={`group block ${shouldAnimate ? 'feed-item-fade-in' : ''}`}
      style={shouldAnimate ? { animationDelay: `${Math.min(index * 50, 500)}ms` } : undefined}
    >
      <div className="transition-all duration-300 hover:opacity-90">
        {/* Fixed aspect ratio container: 1200x630 (OG image standard) */}
        <div className="relative w-full mb-2 aspect-[1200/630] overflow-hidden rounded-sm">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {item.title}
        </p>
      </div>
    </Link>
  )
}
