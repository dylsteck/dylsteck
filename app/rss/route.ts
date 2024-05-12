
import { getArticles } from 'app/blog/utils'
import { allItems, BASE_URL } from 'app/consts'

export async function GET() {

  const itemsXml = allItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (item) =>
        `<item>
          <title>${item.title}</title>
          <link>${BASE_URL}/${item.type}s/${item.id}</link>
          <description>${item.title} by Dylan Steck</description>
          <pubDate>${new Date(item.date).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Dylan Steck</title>
        <link>${BASE_URL}</link>
        <description>An RSS feed for all of Dylan Steck's articles, notes, and videos</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}