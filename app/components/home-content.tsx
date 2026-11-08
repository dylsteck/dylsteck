import { lazy, Suspense, useState, type ReactNode } from 'react'
import { ClientOnly, Link, useLocation } from '@tanstack/react-router'
import AboutText from './about-text'
import CoinbaseIcon from './icons/coinbase-icon'
import { PanelLayoutContext } from './panel-layout-context'

const DS3DIcon = lazy(() => import('./icons/ds-3d-icon'))

function LogoPlaceholder() {
  return <div className="home-mark" />
}

export default function HomeContent({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const { pathname } = useLocation()
  const [expandedPath, setExpandedPath] = useState<string | null>(null)
  const expanded = expandedPath === pathname
  const isDetail = pathname !== '/'
  const toggleExpanded = () => {
    setExpandedPath((current) => current === pathname ? null : pathname)
  }

  return (
    <PanelLayoutContext.Provider value={{ isExpanded: expanded, toggleExpanded }}>
      <div className={`home-layout${isCollapsed ? ' is-profile-collapsed' : ''}${expanded ? ' is-content-expanded' : ''}${isDetail ? ' is-detail-page' : ''}`}>
        <section
          className={`home-stage${isCollapsed ? ' is-collapsed' : ''}`}
          aria-label="Dylan Steck"
        >
          <Link to="/about" className="home-about-pill" aria-current={pathname === '/about' ? 'page' : undefined}>
            About
          </Link>
          <button
            type="button"
            className="home-panel-toggle"
            aria-label={isCollapsed ? 'Expand profile' : 'Collapse profile'}
            aria-expanded={!isCollapsed}
            aria-controls="home-profile-details"
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 19V5m-7 7 7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="home-logo" role="img" aria-label="Rotating DS monogram">
            <ClientOnly fallback={<LogoPlaceholder />}>
              <Suspense fallback={<LogoPlaceholder />}>
                <DS3DIcon size="large" />
              </Suspense>
            </ClientOnly>
          </div>
          <div className="home-caption">
            <h1 className="mb-1 text-base font-medium text-neutral-700 dark:text-neutral-300">
              Dylan Steck
            </h1>
            <p className="home-compact-role text-xs text-neutral-500">
              Engineer at{' '}
              <span className="mx-0.5 inline-flex align-middle">
                <CoinbaseIcon className="h-3 w-3 text-[#0052FF] dark:text-white" />
              </span>{' '}
              Coinbase
            </p>
            <div id="home-profile-details" className="home-profile-details">
              <AboutText />
            </div>
          </div>
        </section>
        <section className="home-feed" aria-label={pathname === '/' ? 'Feed' : pathname === '/about' ? 'About' : pathname.startsWith('/video/') ? 'Video' : 'Blog post'} data-scroll-restoration-id="home-content-panel">
          {children}
        </section>
      </div>
    </PanelLayoutContext.Provider>
  )
}
