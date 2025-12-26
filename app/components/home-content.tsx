'use client'

import { useState } from 'react'
import Hologram from './hologram'
import DSModelViewerIcon from './icons/ds-model-viewer-icon'
import AquaBubble from './aqua-bubble'

function CurvedLabelBubble({ 
    text, 
    size = 150, 
    className = '', 
    floatDelay = 0, 
    onClick,
    children
}: { 
    text: string, 
    size?: number, 
    className?: string, 
    floatDelay?: number,
    onClick?: () => void,
    children?: React.ReactNode
}) {
    const curveId = `curve-${text.toLowerCase().replace(/\s+/g, '-')}`
    return (
        <div 
            className={`absolute pointer-events-auto group animate-float ${className}`}
            style={{ animationDelay: `${floatDelay}s` }}
        >
            {/* Curved Label */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-24 pointer-events-none z-30">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path 
                            id={curveId}
                            d="M 15,40 A 35,35 0 0,1 85,40" 
                        />
                    </defs>
                    <text 
                        className="text-[9px] font-black uppercase tracking-[0.4em] fill-black dark:fill-white" 
                        style={{ textShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}
                    >
                        <textPath href={`#${curveId}`} startOffset="50%" textAnchor="middle">
                            {text}
                        </textPath>
                    </text>
                </svg>
            </div>

            <AquaBubble 
                size={size} 
                onClick={onClick}
                className="group-hover:scale-105 transition-transform"
            >
                {children}
            </AquaBubble>
        </div>
    )
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
            <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black overflow-hidden">
                <div className="relative">
                    {/* The 3D Logo */}
                    <div className="relative z-0">
                        <DSModelViewerIcon size="large" />
                    </div>

                    {/* The Bubbles Container */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {/* Feed Bubble */}
                        <CurvedLabelBubble 
                            text="feed" 
                            size={120} 
                            className="top-0 -left-52"
                            floatDelay={0.5}
                        />

                        {/* Apps Bubble */}
                        <CurvedLabelBubble 
                            text="apps" 
                            size={130} 
                            className="top-48 -left-52"
                            floatDelay={2}
                        />

                        {/* The "Trapped" Hologram Bubble */}
                        {!isPopped && (
                            <CurvedLabelBubble 
                                text="meet me" 
                                size={150} 
                                className="-top-4 -right-48"
                                floatDelay={1.5}
                                onClick={handleHologramClick}
                            >
                                <div className="scale-[0.4] transition-all duration-500 group-hover:scale-[0.45] group-hover:brightness-110">
                                    <Hologram />
                                </div>
                            </CurvedLabelBubble>
                        )}
                    </div>
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

            <style jsx global>{`
                @keyframes slide-in-from-bottom-right {
                    from {
                        transform: translateX(100%) translateY(calc(100vh - 200px));
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0) translateY(0);
                        opacity: 1;
                    }
                }
                .animate-slide-in-from-bottom-right {
                    animation: slide-in-from-bottom-right 0.8s cubic-bezier(0.19, 1, 0.22, 1);
                }
            `}</style>
        </>
    )
}
