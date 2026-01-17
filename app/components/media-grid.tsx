'use client'

import { useEffect, useState, useCallback } from 'react'
import { FeedItem } from 'app/api/feed/types'
import MediaGridItem from './media-grid-item'

type ItemSize = 'small' | 'medium' | 'large'

interface PositionedItem extends FeedItem {
  size: ItemSize
  rotation: number
  delay: number
  offset: number // Horizontal offset for imperfect grid
}

const ITEMS_PER_PAGE = 8

export default function MediaGrid() {
  const [allItems, setAllItems] = useState<FeedItem[]>([])
  const [displayedItems, setDisplayedItems] = useState<PositionedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch('/api/feed')
        const data = await response.json()
        const feedItems: FeedItem[] = data.items || []
        setAllItems(feedItems)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching feed:', error)
        setLoading(false)
      }
    }

    fetchFeed()
  }, [])

  useEffect(() => {
    if (allItems.length === 0) return

    const itemsToShow = allItems.slice(0, page * ITEMS_PER_PAGE)
    
    // Use a seeded random function for consistent positioning
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const positionedItems: PositionedItem[] = itemsToShow.map((item, index) => {
      // Assign size with varied distribution (not just cycling)
      const sizeVariation = index % 5
      let size: ItemSize = 'medium'
      if (sizeVariation === 0 || sizeVariation === 3) size = 'small'
      else if (sizeVariation === 1 || sizeVariation === 4) size = 'large'

      // Use seeded random for consistent positioning per item
      const seed = item.id.charCodeAt(0) + index
      const offset = (seededRandom(seed) * 80 - 40)
      const rotation = (seededRandom(seed + 1) * 6 - 3)

      // Staggered delay for animation
      const delay = index * 0.08

      return {
        ...item,
        size,
        rotation,
        delay,
        offset
      }
    })

    setDisplayedItems(positionedItems)
  }, [allItems, page])

  const handleScroll = useCallback(() => {
    if (loading) return
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight

    // Load more when user is near bottom (within 500px)
    if (scrollTop + windowHeight >= documentHeight - 500) {
      const maxPages = Math.ceil(allItems.length / ITEMS_PER_PAGE)
      if (page < maxPages) {
        setPage(prev => prev + 1)
      }
    }
  }, [loading, page, allItems.length])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  if (loading) {
    return null
  }

  if (displayedItems.length === 0) {
    return null
  }

  return (
    <div className="w-full min-h-screen pt-[50vh] pb-20 px-4 sm:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((item, index) => {
            const baseTransform = `translateX(${item.offset}px) rotate(${item.rotation}deg)`
            
            const wrapperStyle: React.CSSProperties = {
              transform: baseTransform,
            }

            const itemStyle: React.CSSProperties = {
              opacity: 0,
              animation: `fadeInFloat 0.8s ease-out ${item.delay}s forwards`,
            }

            return (
              <div key={item.id} className="flex justify-center">
                <div style={wrapperStyle}>
                  <div style={itemStyle}>
                    <MediaGridItem
                      item={item}
                      size={item.size}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInFloat {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
