import { apps } from '../apps/apps'
import type { FeedItem } from './feed-types'

export const appFeedItems: FeedItem[] = apps
  .filter((app) => !app.hidden)
  .map((app) => ({
    id: `app-${app.name}`,
    type: 'app',
    title: app.name,
    imageUrl: app.imageUrl,
    url: app.url,
  }))
