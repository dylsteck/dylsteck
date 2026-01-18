'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Hologram from './hologram'
import DS3DIcon from './icons/ds-3d-icon'
import AquaBubble from './aqua-bubble'
import BubbleModal from './bubble-modal'
import FeedContent from './feed-content'
import MediaGrid from './media-grid'
import AboutText from './about-text'

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
    const router = useRouter()
    const [showHologram, setShowHologram] = useState(false)
    const [isPopped, setIsPopped] = useState(false)
    const [openModal, setOpenModal] = useState<'feed' | 'apps' | null>(null)
    const [isClosingModal, setIsClosingModal] = useState(false)

    const handleHologramClick = () => {
        setIsPopped(true)
        setTimeout(() => setShowHologram(true), 300)
    }

    const handleFeedClick = () => {
        setOpenModal('feed')
        setIsClosingModal(false)
    }

    const handleAppsClick = () => {
        setOpenModal('apps')
        setIsClosingModal(false)
    }

    const handleCloseModal = () => {
        setIsClosingModal(true)
        setTimeout(() => {
            setOpenModal(null)
            setIsClosingModal(false)
        }, 400)
    }

    const handleFeedItemClick = (url: string) => {
        setIsClosingModal(true)
        // Start navigation during animation (~100ms delay)
        setTimeout(() => {
            router.push(url)
        }, 100)
        // Close modal after animation completes
        setTimeout(() => {
            setOpenModal(null)
            setIsClosingModal(false)
        }, 400)
    }

    return(
        <>
            {/* Main page background */}
            <div className="fixed inset-0 bg-white dark:bg-black -z-10" />


            {/* The 3D Logo - Fixed and always visible */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="relative">
                    <DS3DIcon size="large" />
                </div>
            </div>

            {/* Engineer at Base - Bottom left */}
            <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
                <AboutText />
            </div>

            {/* Scrollable Media Grid - Commented out for now */}
            {/* <div className="relative z-10 bg-white dark:bg-black min-h-screen">
                <MediaGrid />
            </div> */}

            {/* The Bubbles Container - Commented out for now */}
            {/* <div className="absolute inset-0 z-10 pointer-events-none">
                <CurvedLabelBubble 
                    text="feed" 
                    size={120} 
                    className="top-0 -left-52"
                    floatDelay={0.5}
                    onClick={handleFeedClick}
                />

                <CurvedLabelBubble 
                    text="apps" 
                    size={130} 
                    className="top-48 -left-52"
                    floatDelay={2}
                    onClick={handleAppsClick}
                />

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
            </div> */}

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

            {/* Feed Modal */}
            <BubbleModal
                isOpen={openModal === 'feed'}
                onClose={handleCloseModal}
                title="feed"
                isClosing={isClosingModal && openModal === 'feed'}
            >
                <FeedContent onItemClick={handleFeedItemClick} />
            </BubbleModal>

            {/* Apps Modal */}
            <BubbleModal
                isOpen={openModal === 'apps'}
                onClose={handleCloseModal}
                title="apps"
            >
                {/* Content will be added here later */}
            </BubbleModal>

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
