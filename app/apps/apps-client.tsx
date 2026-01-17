'use client'

import { useEffect } from 'react'
import AppsGrid from './grid'

type App = {
  id: number
  name: string
  imageUrl: string
  url: string
  hidden?: boolean
}

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
    <div className="min-h-screen w-full bg-black">
      <AppsGrid apps={apps} />
    </div>
  )
}
