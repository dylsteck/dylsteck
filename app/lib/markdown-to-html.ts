import { processMarkdownComponents } from 'app/blog/utils'

export function convertMarkdownToHTML(markdown: string): string {
  let html = markdown

  // Convert headings (must be done before other conversions)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')

  // Convert bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

  // Convert italic text (single asterisk or underscore)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  html = html.replace(/_(.*?)_/g, '<em>$1</em>')

  // Convert links [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  // Convert line breaks to paragraphs
  html = html
    .split('\n\n')
    .map((para) => {
      if (para.trim().startsWith('<')) {
        return para
      }
      return para.trim() ? `<p>${para.trim()}</p>` : ''
    })
    .join('\n')

  return html
}

/**
 * Process markdown for RSS/email: replace MDX components with text refs, then convert to HTML.
 * Same output as RSS feed content:encoded.
 */
export function processMarkdownForRSS(content: string): string {
  const processed = processMarkdownComponents(content)
  return convertMarkdownToHTML(processed)
}
