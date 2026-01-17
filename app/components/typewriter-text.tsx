'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
}

export default function TypewriterText({ 
  text, 
  speed = 30,
  className = '' 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    setIsTyping(true)
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  // Blink cursor after typing completes
  useEffect(() => {
    if (!isTyping) {
      const cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 530)
      return () => clearInterval(cursorInterval)
    } else {
      setShowCursor(true)
    }
  }, [isTyping])

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayedText}</span>
      <span className={`inline-block w-[1ch] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </div>
  )
}
