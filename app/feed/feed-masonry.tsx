'use client'

import { useEffect, useState, useTransition, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FeedItem } from 'app/api/feed/types'
import FeedFilter, { FILTER_OPTIONS, FilterType } from '../components/feed-filter'
import { useFeed } from '../hooks/use-feed'
import { buildFarcasterCastImageUrl } from 'app/lib/feed-utils'

function parseFiltersFromUrl(searchParams: URLSearchParams): FilterType[] {
  const filterParam = searchParams.get('filter')
  if (!filterParam) return ['all']
  
  const filters = filterParam.split(',').filter((f): f is FilterType => {
    return FILTER_OPTIONS.includes(f as FilterType)
  })
  
  return filters.length > 0 ? filters : ['all']
}

export default function FeedMasonry() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [shouldAnimate, setShouldAnimate] = useState(false)
  
  // Ref for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null)
  
  const activeFilters = parseFiltersFromUrl(searchParams)

  const {
    items: allItems,
    hasMore,
    isLoading,
    isLoadingMore,
    loadMore,
  } = useFeed()

  // Track when initial load completes to set animation
  useEffect(() => {
    if (!isLoading && allItems.length > 0) {
      // Set animation if load took a while (handled by SWR's timing)
      setShouldAnimate(true)
    }
  }, [isLoading, allItems.length])

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current || isLoading) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    )
    
    observer.observe(loadMoreRef.current)
    
    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, isLoading, loadMore])

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
    ? allItems
    : allItems.filter(item => activeFilters.includes(item.type as FilterType))

  // Show load more only when filtering includes Farcaster
  const showLoadMore = hasMore && (activeFilters.includes('all') || activeFilters.includes('farcaster'))

  if (isLoading) {
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
            {isLoadingMore && (
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
    const castHash = item.castData.hash
    const imageUrl = buildFarcasterCastImageUrl(castHash)
    const farcasterUrl = item.url
    
    return (
      <Link
        href={farcasterUrl}
        className={`group block ${shouldAnimate ? 'feed-item-fade-in' : ''}`}
        style={shouldAnimate ? { animationDelay: `${Math.min(index * 50, 500)}ms` } : undefined}
      >
        <div className="transition-all duration-300 hover:opacity-90">
          <div className="relative w-full mb-2 rounded-sm">
            <img
              src={imageUrl}
              alt={item.title || 'Farcaster cast'}
              className="w-full h-auto rounded-sm"
            />
          </div>
          <p className="text-sm text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
            {item.title || item.text?.substring(0, 100) || 'Farcaster post'}
          </p>
        </div>
      </Link>
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
