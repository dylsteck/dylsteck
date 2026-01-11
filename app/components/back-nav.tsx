'use client'

import Link from 'next/link'
import DS3DIcon from './icons/ds-3d-icon'

export default function BackNav() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black p-4 border-b border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-row items-center">
        <Link
          href="/"
          className="cursor-pointer transition-all hover:opacity-70 flex items-center relative py-1 px-2 m-1"
        >
          <DS3DIcon size="small" />
        </Link>
      </div>
    </nav>
  )
}
