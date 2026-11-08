import { createContext, useContext } from 'react'

export const PanelLayoutContext = createContext<{
  isExpanded: boolean
  toggleExpanded: () => void
} | null>(null)

export function usePanelLayout() {
  const context = useContext(PanelLayoutContext)
  if (!context) throw new Error('Panel layout is missing')
  return context
}
