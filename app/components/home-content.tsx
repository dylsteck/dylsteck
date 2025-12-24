'use client'

import { useState } from 'react'
import Hologram from './hologram'
import DSModelViewerIcon from './icons/ds-model-viewer-icon'

export default function HomeContent() {
    const [showHologram, setShowHologram] = useState(false)

    return(
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black">
                <div className="relative">
                    <DSModelViewerIcon size="large" />
                    <button
                        onClick={() => setShowHologram(!showHologram)}
                        className="absolute -top-2 -right-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors cursor-pointer whitespace-nowrap px-2"
                        style={{ transform: 'translateX(100%)' }}
                    >
                        meet me
                    </button>
                </div>
            </div>
            {showHologram && (
                <div className="fixed left-0 top-0 bottom-0 flex items-center z-50 animate-slide-in-from-bottom-left">
                    <div className="pl-4">
                        <Hologram />
                    </div>
                </div>
            )}
            <style jsx global>{`
                @keyframes slide-in-from-bottom-left {
                    from {
                        transform: translateX(-100%) translateY(calc(100vh - 200px));
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-from-bottom-left {
                    animation: slide-in-from-bottom-left 0.6s ease-out;
                }
            `}</style>
        </>
    )
}

