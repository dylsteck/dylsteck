import Link from 'next/link'
import DSIcon from './icons/ds-icon'
import LinksHover from './links-hover'

const navItems = {
  '/': {
    name: 'home',
  }
}

export function Navbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 p-4">
        <div className="flex flex-row items-center">
          <Link
            href="/"
            className="cursor-pointer transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
          >
            <DSIcon />
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
      </nav>
      <div className="fixed top-[68px] left-0 w-full h-px bg-neutral-200 dark:bg-neutral-800 z-40" />
    </>
  )
}
