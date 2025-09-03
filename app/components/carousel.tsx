'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { posts } from '../blog/posts/posts'
import { videos } from '../video/videos'
import { MediaItem } from '../types'

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  
  const allMedia = [...posts, ...videos].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allMedia.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [allMedia.length])

  if (allMedia.length === 0) return null

  const currentItem = allMedia[currentIndex]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-10">
      <Link href={`/${currentItem.type}/${currentItem.id}`} className="max-w-full max-h-full flex items-center justify-center">
        <img
          key={currentIndex}
          src={currentItem.banner}
          alt={currentItem.title}
          className="max-w-full max-h-full object-contain cursor-pointer"
          style={{
            animation: currentIndex === 0 ? 'none' : 'slideIn 0.5s ease-in-out'
          }}
        />
      </Link>
      <style jsx>{`
        @keyframes slideIn {
          from { 
            transform: translateX(30px);
          }
          to { 
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
