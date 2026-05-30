import React from 'react'

type EmbedBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

type EmbedBoundaryState = {
  hasError: boolean
}

export default class EmbedBoundary extends React.Component<
  EmbedBoundaryProps,
  EmbedBoundaryState
> {
  state: EmbedBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): EmbedBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
