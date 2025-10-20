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

function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  // Convert headings (must be done before other conversions)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert italic text (single asterisk or underscore)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Convert line breaks to paragraphs
  html = html.split('\n\n').map(para => {
    // Don't wrap if it's already an HTML tag
    if (para.trim().startsWith('<')) {
      return para;
    }
    return para.trim() ? `<p>${para.trim()}</p>` : '';
  }).join('\n');

  return html;
}

function processMarkdownForRSS(content: string): string {
  let processed = content;

  // Replace Tweet components with text references
  processed = processed.replace(/<Tweet\s+id="([^"]+)"\s*\/>/g, (match, id) => {
    return `[Tweet: https://x.com/x/status/${id}]`;
  });

  // Replace Cast components with text references
  processed = processed.replace(/<Cast\s+id="([^"]+)"\s*\/>/g, (match, id) => {
    return `[Cast: https://farcaster.xyz/${id}]`;
  });

  // Convert markdown to HTML
  processed = convertMarkdownToHTML(processed);

  return processed;
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
        let fullContent = post.content ? processMarkdownForRSS(post.content) : "";
        let imageUrl = postItem?.banner ?? "";
        let imageType = imageUrl.endsWith('.png') ? 'image/png' : 'image/jpeg';
        return `<item>
          <title>${post.metadata.title}</title>
          <link>${`${appUrl}/blog/${post.slug}`}</link>
          <description>${description}</description>
          <content:encoded><![CDATA[${fullContent}]]></content:encoded>
          <enclosure url="${imageUrl}" type="${imageType}" />
          <pubDate>${new Date(
            post.metadata.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    })
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
