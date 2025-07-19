'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { socialLinks } from '../lib/constants'
import { useIsMobile } from '../hooks'

export default function LinksHover(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside to close on mobile
  useEffect(() => {
    if (isMobile && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsVisible(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isMobile, isVisible])

  const handleMouseEnter = (): void => {
    if (!isMobile) {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = (): void => {
    if (!isMobile) {
      setIsVisible(false)
    }
  }

  const handleClick = (e: React.MouseEvent): void => {
    // On mobile, handle click to toggle
    if (isMobile) {
      e.preventDefault()
      e.stopPropagation()
      setIsVisible(!isVisible)
    }
  }



  return (
    <div 
      ref={containerRef}
      className="inline-flex items-center gap-1 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span 
        className="py-1 px-2 m-1 cursor-pointer select-none"
        onClick={handleClick}
      >
        links
      </span>
      
      <div 
        className={`inline-flex items-center gap-1 transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {socialLinks.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2 m-1"
          >
            {link.text.toLowerCase()}
          </Link>
        ))}
      </div>
    </div>
  )
}