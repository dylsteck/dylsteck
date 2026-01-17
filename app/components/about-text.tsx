'use client'

import { useState } from 'react'
import BaseIcon from './icons/base-icon'

export default function AboutText() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="text-sm text-neutral-500 dark:text-neutral-500 flex items-center gap-1.5 cursor-pointer transition-all duration-300 hover:opacity-80 no-underline"
      style={{ whiteSpace: 'nowrap' }}
    >
      engineer at{' '}
      <span className="inline-flex items-center">
        <BaseIcon className="w-4 h-4" />
      </span>
      base{isExpanded ? ' working on Base app' : ''}.
    </button>
  )
}
