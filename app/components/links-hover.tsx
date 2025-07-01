'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { socialLinks } from '../lib/constants'
import { useIsMobile } from '../hooks'

export default function LinksHover(): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const isMobile = useIsMobile()

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
      setIsVisible(!isVisible)
    }
  }

  const handleTouchStart = (): void => {
    // Additional touch handling for mobile
    if (isMobile) {
      setIsVisible(!isVisible)
    }
  }

  return (
    <div 
      className="inline-flex items-center gap-1"
      onMouseEnter={!isMobile ? handleMouseEnter : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <span 
        className="py-1 px-2 m-1 cursor-pointer select-none"
        onClick={handleClick}
        onTouchStart={isMobile ? handleTouchStart : undefined}
      >
        links
      </span>
      
      {isVisible && (
        <div className="inline-flex items-center gap-1">
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
      )}
    </div>
  )
}