'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hologram() {
  const [flicker, setFlicker] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      // Random flicker effect
      setFlicker(0.95 + Math.random() * 0.1)
    }, 100 + Math.random() * 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hologram-scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        @keyframes hologram-flicker {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes hologram-popIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .hologram-container {
          position: relative;
          display: inline-block;
          filter: hue-rotate(180deg) brightness(1.1) contrast(1.2);
          animation: hologram-popIn 0.5s ease-out;
        }

        .hologram-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 255, 255, 0.1) 50%,
            transparent 100%
          );
          animation: hologram-scanline 3s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .hologram-image {
          position: relative;
          filter: drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))
                  drop-shadow(0 0 15px rgba(0, 255, 255, 0.2));
          transition: opacity 0.1s ease;
        }
      `}} />
      
      <div className="w-full max-w-[200px] h-auto flex items-center justify-center">
        <div className="hologram-container inline-block">
          <div className="hologram-image" style={{ opacity: flicker }}>
            <Image
              src="/dylan-transparent.png"
              alt="Dylan Steck"
              width={200}
              height={300}
              className="w-auto h-auto max-w-full block"
              priority
            />
          </div>
        </div>
      </div>
    </>
  )
}

