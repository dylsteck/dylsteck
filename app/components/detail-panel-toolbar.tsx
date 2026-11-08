import { Link } from '@tanstack/react-router'
import { usePanelLayout } from './panel-layout-context'

export default function DetailPanelToolbar({
  label,
  controlsId,
}: {
  label: string
  controlsId: string
}) {
  const { isExpanded, toggleExpanded } = usePanelLayout()

  return (
    <div className="detail-panel-toolbar">
      <Link to="/" className="detail-panel-toggle" aria-label="Back to home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
      <button
        type="button"
        className="detail-panel-toggle detail-expand-toggle"
        aria-label={isExpanded ? `Collapse ${label}` : `Expand ${label}`}
        aria-expanded={isExpanded}
        aria-controls={controlsId}
        onClick={toggleExpanded}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d={isExpanded ? 'M4 10h6V4m10 10h-6v6M10 10 3 3m11 11 7 7' : 'M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7'}
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
