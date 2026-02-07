'use client'

import { useState } from 'react'
import Hologram from './hologram'
import DS3DIcon from './icons/ds-3d-icon'
import AboutText from './about-text'

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

            {/* The 3D Logo - Fixed and always visible */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
                <DS3DIcon size="large" />
            </div>

            {/* Engineer at Base - Bottom left */}
            <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
                <AboutText />
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
