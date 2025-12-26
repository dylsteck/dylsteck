'use client'

import { useEffect, useState, useRef } from 'react'

interface ModelViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  src: string
  'auto-rotate'?: boolean
  'camera-controls'?: boolean
  'interaction-policy'?: string
}

export default function DSModelViewerIcon({ size = 'large' }: { size?: 'small' | 'large' }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if model-viewer is already loaded
    if (customElements.get('model-viewer')) {
      setIsLoaded(true)
      return
    }

    // Load model-viewer script dynamically
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.1.0/model-viewer.min.js'
    script.onload = () => {
      customElements.whenDefined('model-viewer').then(() => {
        setIsLoaded(true)
      })
    }
    document.head.appendChild(script)

    return () => {
      // Cleanup if component unmounts
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !containerRef.current) return

    const container = containerRef.current
    const modelViewer = document.createElement('model-viewer')
    
    modelViewer.setAttribute('src', '/models/ds-grey.glb')
    modelViewer.setAttribute('auto-rotate', '')
    modelViewer.setAttribute('auto-rotate-delay', '0')
    modelViewer.setAttribute('rotation-speed', '1') // Ensures smooth horizontal spin
    modelViewer.setAttribute('shadow-intensity', '1')
    modelViewer.setAttribute('camera-controls', 'false')
    modelViewer.setAttribute('interaction-prompt', 'none')
    modelViewer.setAttribute('interaction-policy', 'none')
    modelViewer.style.width = '100%'
    modelViewer.style.height = '100%'
    modelViewer.style.background = 'transparent'

    container.appendChild(modelViewer)

    return () => {
      if (container.contains(modelViewer)) {
        container.removeChild(modelViewer)
      }
    }
  }, [isLoaded])

  const dimensions = size === 'small' 
    ? { width: '36px', height: '36px' }
    : { width: '300px', height: '360px' }
  
  const opacity = size === 'small' ? 0.8 : 0.8

  return (
    <div ref={containerRef} style={{ opacity, ...dimensions }} />
  )
}

