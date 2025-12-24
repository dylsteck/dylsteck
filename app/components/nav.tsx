'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DS3DIcon from './icons/ds-3d-icon'
import LinksHover from './links-hover'
import { useMiniApp } from './mini-app-provider'

const navItems = {
  '/': {
    name: 'home',
  },
  '/apps': {
    name: 'apps',
  }
}

export function Navbar() {
  const { isInClient, context, addMiniApp } = useMiniApp()
  const pathname = usePathname()

  const showAddButton = isInClient && !context?.client?.added

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black p-4">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-row items-center">
            <Link
              href="/"
              className="cursor-pointer transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center relative py-1 px-2 m-1"
            >
              <DS3DIcon size="small" />
            </Link>
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="cursor-pointer transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {name}
                </Link>
              )
            })}
            <LinksHover />
          </div>
          {showAddButton && (
            <button
              onClick={addMiniApp}
              className="cursor-pointer transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
            >
              [+] add
            </button>
          )}
        </div>
      </nav>
      <div className="fixed top-[68px] left-0 w-full h-px bg-neutral-200 dark:bg-neutral-800 z-50" />
    </>
  )
}
