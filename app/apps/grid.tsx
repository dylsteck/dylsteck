'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { App } from './page'

interface AppsGridProps {
  apps: App[]
}

export default function AppsGrid({ apps }: AppsGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-8 sm:gap-x-14 gap-y-8 sm:gap-y-14">
          {apps.map((app, index) => (
          <Link
            key={index}
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
                className={`rounded-[22%] shadow-lg dark:shadow-xl object-cover ${
                  app.hidden ? 'opacity-20' : ''
                }`}
                sizes="(max-width: 640px) 80px, 96px"
              />
            </div>
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors duration-200 text-center truncate w-full px-1">
              {app.hidden ? '***' : app.name}
            </span>
          </Link>
        ))}
        </div>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-500 text-center pb-8">A collection of apps I've built or contributed to. See more on <a href="https://github.com/dylsteck" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:opacity-70 transition-opacity">GitHub</a>.</p>
    </div>
  )
}
