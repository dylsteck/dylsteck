import { FeedItem } from './feed-types'

export function parseDate(dateString: string): number {
  const parsed = new Date(dateString)

  if (isNaN(parsed.getTime())) {
    const months: { [key: string]: string } = {
      january: '01',
      february: '02',
      march: '03',
      april: '04',
      may: '05',
      june: '06',
      july: '07',
      august: '08',
      september: '09',
      october: '10',
      november: '11',
      december: '12',
    }

    const parts = dateString.toLowerCase().match(/(\w+)\s+(\d+),\s+(\d+)/)
    if (parts) {
      const month = months[parts[1]]
      const day = parts[2].padStart(2, '0')
      const year = parts[3]
      return new Date(`${year}-${month}-${day}`).getTime()
    }
  }

  return parsed.getTime()
}

export function sortFeedItems(items: FeedItem[]): FeedItem[] {
  return [...items].sort((a, b) => {
    const timestampA = a.dateTimestamp ?? (a.date ? parseDate(a.date) : 0)
    const timestampB = b.dateTimestamp ?? (b.date ? parseDate(b.date) : 0)
    return timestampB - timestampA
  })
}
