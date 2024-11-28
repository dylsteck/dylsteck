import { appUrl } from 'app/sitemap'
import { getBlogPosts } from 'app/blog/utils'
import { posts } from 'app/blog/posts/posts';

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c: string): string => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export async function GET() {
  let allBlogs = await getBlogPosts()
  const itemsXml = allBlogs
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post: any) => {
        const postItem = posts.find((p) => p.id === post.slug);
        let description = post.metadata.summary ? escapeXml(post.metadata.summary) : "";
        let imageUrl = postItem?.banner ?? "";
        let imageType = imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return `<item>
          <title>${post.metadata.title}</title>
          <link>${`${appUrl}/blog/${post.slug}`}</link>
          <description>${description}</description>
          <enclosure url="${imageUrl}" type="${imageType}" />
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    })
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Dylan Steck</title>
        <link>${appUrl}</link>
        <description>This is Dylan Steck's RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
