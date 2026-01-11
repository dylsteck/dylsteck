'use client'

import { useEffect, useRef, useState } from 'react'

interface BubbleModalProps {
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  title?: string
  isClosing?: boolean
}

export default function BubbleModal({ 
  isOpen, 
  onClose, 
  children,
  title,
  isClosing = false
}: BubbleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose()
    }
  }

  if (!isOpen && !isClosing) return null

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        className={`fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-md ${
          isClosing ? 'animate-fade-out' : 'animate-fade-in'
        }`}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div className={`relative w-full max-w-2xl max-h-[90vh] pointer-events-auto overflow-hidden ${
          isClosing ? 'animate-bubble-pop-out' : 'animate-bubble-in bubble-modal-container'
        }`}>
          {/* Main Bubble Container */}
          <div className="relative w-full h-full bg-white/70 dark:bg-black/70 backdrop-blur-2xl rounded-[4rem] border border-white/30 dark:border-white/15 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden">
            {/* Glossy Overlay - Top Highlight */}
            <div className="absolute top-0 left-0 right-0 h-[40%] pointer-events-none overflow-hidden rounded-t-[4rem]">
              <div 
                className="absolute top-[5%] left-[20%] w-[60%] h-[30%] rounded-full"
                style={{
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                  filter: 'blur(20px)'
                }}
              />
            </div>

            {/* Glossy Overlay - Bottom Reflection */}
            <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none overflow-hidden rounded-b-[4rem]">
              <div 
                className="absolute bottom-[10%] left-[25%] w-[50%] h-[25%] rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  filter: 'blur(12px)'
                }}
              />
            </div>

            {/* X Button - More Bubbly */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/25 dark:bg-white/15 hover:bg-white/35 dark:hover:bg-white/25 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 border border-white/20 dark:border-white/10"
              aria-label="Close modal"
            >
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div 
                  className="absolute top-[20%] left-[20%] w-[60%] h-[30%] rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.3)',
                    filter: 'blur(8px)'
                  }}
                />
              </div>
              <svg
                className="relative z-10 w-5 h-5 text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 overflow-y-auto max-h-[90vh] scrollbar-hide">
              {title && (
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-neutral-900 dark:text-neutral-100 tracking-wider">
                  {title}
                </h2>
              )}
              <div className="min-h-[200px]">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bubble-in {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(30px);
            filter: blur(10px);
          }
          50% {
            transform: scale(1.02) translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes bubble-float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(10px, -8px) scale(1.005);
          }
          66% {
            transform: translate(-10px, -5px) scale(1.005);
          }
        }

        @keyframes bubble-pop-out {
          0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
          }
          50% {
            opacity: 0.7;
            transform: scale(0.5) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(0.3) translate(0, 0);
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-fade-out {
          animation: fade-out 0.4s ease-in;
        }

        .animate-bubble-in {
          animation: bubble-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-bubble-pop-out {
          animation: bubble-pop-out 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .bubble-modal-container {
          animation: bubble-float 6s ease-in-out infinite;
          animation-delay: 0.6s;
        }

        .bubble-modal-container:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  )
}
