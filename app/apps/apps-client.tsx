'use client'

import { useEffect } from 'react'
import AppsGrid from './grid'
import type { App } from './page'

interface AppsPageClientProps {
  apps: App[]
}

export default function AppsPageClient({ apps }: AppsPageClientProps) {
  useEffect(() => {
    // Add class to body and html to hide scrollbar
    document.body.classList.add('scrollbar-hide')
    document.documentElement.classList.add('scrollbar-hide')
    
    return () => {
      // Remove class when component unmounts
      document.body.classList.remove('scrollbar-hide')
      document.documentElement.classList.remove('scrollbar-hide')
    }
  }, [])

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <AppsGrid apps={apps} />
    </div>
  )
}
