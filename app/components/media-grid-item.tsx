'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FeedItem } from 'app/api/feed/types'

interface MediaGridItemProps {
  item: FeedItem
  size: 'small' | 'medium' | 'large'
}

const sizeMap = {
  small: { width: 150, height: 150 },
  medium: { width: 200, height: 200 },
  large: { width: 250, height: 250 }
}

export default function MediaGridItem({ item, size }: MediaGridItemProps) {
  const dimensions = sizeMap[size]
  const hasImage = !!item.imageUrl

  return (
    <Link
      href={item.url}
      className="group block transition-all duration-300 hover:scale-105"
    >
      <div
        className="relative bg-white dark:bg-neutral-900 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
        style={{
          width: dimensions.width,
          height: dimensions.height
        }}
      >
        {hasImage && item.imageUrl ? (
          <>
            <div className="relative w-full h-[calc(100%-60px)] overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes={`${dimensions.width}px`}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-white dark:bg-neutral-900 p-2 flex items-center">
              <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2">
                {item.title}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-full p-4 flex flex-col justify-between">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 line-clamp-4">
              {item.text || item.title}
            </p>
            <div className="mt-auto pt-2">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
                {item.type}
              </span>
            </div>
          </div>
        )}
        
        {/* Type badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-black/70 dark:bg-white/70 text-white dark:text-black rounded">
            {item.type}
          </span>
        </div>
      </div>
    </Link>
  )
}
