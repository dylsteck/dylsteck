import 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string
          'auto-rotate'?: boolean
          'camera-controls'?: boolean
          'interaction-policy'?: string
        },
        HTMLElement
      >
    }
  }
}

export {}

