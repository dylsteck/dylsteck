'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type App = {
  id: number
  name: string
  imageUrl: string
  url: string
  hidden?: boolean
}

interface AppsGridProps {
  apps: App[]
}

export default function AppsGrid({ apps }: AppsGridProps) {
  const [query, setQuery] = useState('')

  const filteredApps = apps.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="w-full max-w-5xl mx-auto px-6 pt-24 pb-12 flex flex-col items-center min-h-screen">
      <div className="relative w-full max-w-md mb-16 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-neutral-400 group-focus-within:text-white transition-colors duration-200"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-11 pr-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-xl text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-neutral-800/80 transition-all duration-200 backdrop-blur-md text-lg"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-8 gap-y-12 w-full">
        {filteredApps.map((app) => (
          <Link
            key={app.id}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 transition-transform duration-300 ease-out group-hover:scale-110">
              <Image
                src={app.imageUrl}
                alt={app.name}
                fill
                className={`rounded-[22%] shadow-xl object-cover ${
                  app.hidden ? 'opacity-20' : ''
                }`}
                sizes="(max-width: 640px) 80px, 96px"
              />
            </div>
            <span className="text-sm font-medium text-neutral-300 group-hover:text-white transition-colors duration-200 text-center truncate w-full px-1">
              {app.hidden ? '***' : app.name}
            </span>
          </Link>
        ))}
      </div>

      {filteredApps.length === 0 && (
        <div className="mt-12 text-neutral-500 text-lg">No apps found</div>
      )}
    </div>
  )
}
