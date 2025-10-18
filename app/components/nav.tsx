'use client'

import Link from 'next/link'
import DSIcon from './icons/ds-icon'
import LinksHover from './links-hover'
import { useMiniApp } from './mini-app-provider'

const navItems = {
  '/': {
    name: 'home',
  }
}

export function Navbar() {
  const { isInClient, context, addMiniApp } = useMiniApp()
  
  const showAddButton = isInClient && !context?.client?.added

  return (
    <aside className="-ml-[8px] mb-12 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row gap-2 items-center justify-between w-full">
            <div className="flex flex-row gap-2 items-center">
              <Link
                href="/"
                className="cursor-pointer transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
              >
                <DSIcon />
              </Link>
              <div className="flex flex-row space-x-0 pr-10">
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
      </div>
    </aside>
  )
}
