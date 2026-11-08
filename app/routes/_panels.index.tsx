import { createFileRoute } from '@tanstack/react-router'
import FeedMasonry from '../feed/feed-masonry'

export const Route = createFileRoute('/_panels/')({
  validateSearch: (search: Record<string, unknown>): {
    filter?: string
    view?: 'list'
  } => ({
    filter: typeof search.filter === 'string' ? search.filter : undefined,
    view: search.view === 'list' ? 'list' : undefined,
  }),
  component: Home,
})

function Home() {
  return <FeedMasonry embedded />
}
