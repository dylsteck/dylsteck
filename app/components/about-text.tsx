'use client'

import { useState } from 'react'
import BaseIcon from './icons/base-icon'

export default function AboutText() {
  const [isFirstExpanded, setIsFirstExpanded] = useState(false)
  const [isSecondExpanded, setIsSecondExpanded] = useState(false)

  return (
    <div className="text-sm text-neutral-500 dark:text-neutral-500 max-w-xs text-left">
      <button
        onClick={() => setIsFirstExpanded(!isFirstExpanded)}
        className="inline-flex items-center cursor-pointer transition-all duration-300 hover:opacity-80 no-underline"
      >
        Engineer at{' '}
        <span className="inline-flex items-center mx-1">
          <BaseIcon className="w-4 h-4 text-[rgb(0,0,255)] dark:text-white" />
        </span>
        Base{isFirstExpanded ? ' working on Base app' : ''}.
      </button>{' '}
      <button
        onClick={() => setIsSecondExpanded(!isSecondExpanded)}
        className="block cursor-pointer transition-all duration-300 hover:opacity-80 no-underline text-left w-full"
      >
        Building products that give people more agency{isSecondExpanded ? ' and exploring personal operating systems' : ''}.
      </button>
    </div>
  )
}
