'use client'

import React from 'react'

interface AquaBubbleProps {
  children?: React.ReactNode
  size?: number
  className?: string
  onClick?: () => void
  floatDelay?: number
  floatDuration?: number
}

export default function AquaBubble({ 
  children, 
  size = 100, 
  className = '', 
  onClick,
  floatDelay = 0,
  floatDuration = 8
}: AquaBubbleProps) {
  return (
    <div 
      onClick={onClick}
      className={`
        aqua-bubble aqua-glossy cursor-pointer
        flex items-center justify-center
        transition-all duration-300 hover:scale-110 active:scale-95
        ${className}
      `}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        animationDelay: `${floatDelay}s`,
        animationDuration: `${floatDuration}s`
      }}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
        {children}
      </div>
      
      {/* Glossy overlay but without the harsh top highlight */}
      <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
        <div 
          className="absolute bottom-[10%] left-[25%] w-[50%] h-[20%] rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            filter: 'blur(4px)'
          }}
        />
      </div>
    </div>
  )
}

