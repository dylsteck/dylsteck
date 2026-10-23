import { lazy, Suspense, useState } from 'react'
import { ClientOnly } from '@tanstack/react-router'
import Hologram from './hologram'
import AboutText from './about-text'

const DS3DIcon = lazy(() => import('./icons/ds-3d-icon'))

function LogoPlaceholder({ size = 'large' }: { size?: 'small' | 'large' }) {
    const containerClass = size === 'small'
        ? 'w-[36px] h-[36px] opacity-80 mt-0.5 mb-1'
        : 'home-mark w-[350px] h-[350px]'
    return <div className={containerClass} />
}

export default function HomeContent() {
    const [showHologram, setShowHologram] = useState(false)
    const [isPopped, setIsPopped] = useState(false)

    const handleHologramClick = () => {
        setIsPopped(true)
        setTimeout(() => setShowHologram(true), 300)
    }

    return(
        <>
            {/* Main page background */}
            <div className="fixed inset-0 bg-white dark:bg-black -z-10" />

            {/* Mark stays centered, caption bottom-left. Short viewports stack them. */}
            <div className="home-stage fixed inset-0 z-20 pointer-events-none">
                <div className="home-logo">
                    <ClientOnly fallback={<LogoPlaceholder />}>
                        <Suspense fallback={<LogoPlaceholder />}>
                            <DS3DIcon size="large" />
                        </Suspense>
                    </ClientOnly>
                </div>
                <div className="home-caption pointer-events-auto">
                    <AboutText />
                </div>
            </div>

            {/* Full size hologram after pop */}
            {showHologram && (
                <div className="fixed right-12 top-0 bottom-0 flex items-center z-50 animate-slide-in-from-bottom-right">
                    <div className="pr-4">
                        <div className="relative">
                             <button
                                onClick={() => {
                                    setShowHologram(false)
                                    setIsPopped(false)
                                }}
                                className="absolute -top-10 right-4 text-[10px] uppercase tracking-[0.3em] text-neutral-400 hover:text-blue-500 transition-colors cursor-pointer"
                            >
                                [ close ]
                            </button>
                            <Hologram />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
