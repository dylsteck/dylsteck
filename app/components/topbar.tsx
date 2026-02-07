'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { path: '/feed', label: 'Feed' },
  { path: '/apps', label: 'Apps' },
  { path: '/info', label: 'Info' },
]

export default function Topbar() {
  const pathname = usePathname()
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-30 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-1 sm:py-1">
        <div className="flex items-center justify-between">
          {/* Left: Name */}
          <Link
            href="/"
            className={`text-sm sm:text-sm font-medium transition-opacity hover:opacity-70 ${
              pathname === '/'
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            Dylan Steck
          </Link>

          {/* Right: Navigation Links - Not as far right */}
          <div className="flex items-center gap-3 sm:gap-5 mr-8 sm:mr-16">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`text-xs sm:text-xs transition-colors ${
                    isActive
                      ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
