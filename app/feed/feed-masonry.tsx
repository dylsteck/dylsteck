import { useEffect, useState, useTransition } from 'react'
import Image from '../components/image'
import { Link, useNavigate, useSearch, useLocation } from '@tanstack/react-router'
import type { FeedItem } from 'app/api/feed/types'
import FeedFilter, { FILTER_OPTIONS, FilterType, ViewMode } from '../components/feed-filter'
import { useFeed } from '../hooks/use-feed'

function parseFilterFromSearch(filter: string | undefined): FilterType {
  return FILTER_OPTIONS.includes(filter as FilterType) ? filter as FilterType : 'all'
}

export default function FeedMasonry({ embedded = false }: { embedded?: boolean }) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const search = useSearch({ strict: false }) as {
    filter?: string
    view?: string
  }
  const [, startTransition] = useTransition()

  const [shouldAnimate, setShouldAnimate] = useState(false)

  const activeFilter = parseFilterFromSearch(search.filter)
  const viewMode: ViewMode = search.view === 'list' ? 'list' : 'grid'

  const { items: allItems, isLoading } = useFeed()

  useEffect(() => {
    if (!isLoading && allItems.length > 0) {
      setShouldAnimate(true)
    }
  }, [isLoading, allItems.length])

  const handleViewModeChange = (mode: ViewMode) => {
    startTransition(() => {
      navigate({
        to: pathname,
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          view: mode === 'grid' ? undefined : mode,
        }),
        replace: false,
      })
    })
  }

  const handleFilterChange = (filter: FilterType) => {
    startTransition(() => {
      const nextFilter = filter === 'all' ? undefined : filter
      navigate({
        to: pathname,
        search: (prev: Record<string, unknown>) => ({
          ...prev,
          filter: nextFilter,
        }),
        replace: false,
      })
    })
  }

  const filteredItems = activeFilter === 'all'
    ? allItems
    : allItems.filter(item => item.type === activeFilter)

  if (isLoading) {
    return (
      <>
        <div className={embedded ? 'home-feed-toolbar' : 'pt-8 sm:pt-9'}>
          <FeedFilter embedded={embedded} activeFilter={activeFilter} onFilterChange={handleFilterChange} viewMode={viewMode} onViewModeChange={handleViewModeChange} />
        </div>
        <div className={embedded ? 'home-feed-items' : 'max-w-7xl mx-auto px-6 sm:px-8 pb-6 sm:pb-12 pt-2 sm:pt-4'}>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={embedded ? 'home-feed-toolbar' : 'pt-8 sm:pt-9'}>
        <FeedFilter embedded={embedded} activeFilter={activeFilter} onFilterChange={handleFilterChange} viewMode={viewMode} onViewModeChange={handleViewModeChange} />
      </div>
      <div className={embedded ? 'home-feed-items' : 'max-w-7xl mx-auto px-6 sm:px-8 pb-6 sm:pb-12 pt-2 sm:pt-4'}>
        {viewMode === 'grid' ? (
          <div className={`masonry-grid feed-grid ${embedded ? 'home-feed-grid' : ''} ${shouldAnimate ? 'feed-items-animate' : ''}`}>
            {filteredItems.map((item, index) => (
              <FeedMasonryItem key={item.id} item={item} index={index} shouldAnimate={shouldAnimate} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredItems.map((item, index) => (
              <FeedListItem key={item.id} item={item} index={index} shouldAnimate={shouldAnimate} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function FeedMasonryItem({ item, index, shouldAnimate }: { item: FeedItem; index: number; shouldAnimate: boolean }) {
  if (!item.imageUrl) {
    return null
  }

  return (
    <Link
      to={item.url}
      className={`group block ${shouldAnimate ? 'feed-item-fade-in' : ''}`}
      style={shouldAnimate ? { animationDelay: `${Math.min(index * 50, 500)}ms` } : undefined}
    >
      <div className="transition-all duration-300 hover:opacity-90">
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

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const sameYear = date.getFullYear() === now.getFullYear()
  return sameYear
    ? `${months[date.getMonth()]} ${date.getDate()}`
    : `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

function FeedListItem({ item, index, shouldAnimate }: { item: FeedItem; index: number; shouldAnimate: boolean }) {
  const className = `group block ${shouldAnimate ? 'feed-item-fade-in' : ''}`
  const style = shouldAnimate ? { animationDelay: `${Math.min(index * 30, 300)}ms` } : undefined

  return (
    <Link to={item.url} className={className} style={style}>
      <div className="flex items-baseline justify-between gap-4 py-1 transition-all duration-200 hover:opacity-70">
        <div className="min-w-0">
          <p className="text-sm text-neutral-900 dark:text-neutral-100 truncate">
            {item.title}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-0.5">
            {item.type}
          </p>
        </div>
        <span className="text-xs text-neutral-500 dark:text-neutral-500 shrink-0 tabular-nums">
          {formatRelativeDate(item.date)}
        </span>
      </div>
    </Link>
  )
}
