export type ArticleSection = {
  id: string
  title: string
  level: 2 | 3
}

export function slugify(value: unknown): string {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function plainHeading(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .trim()
}

export function extractArticleSections(markdown: string): ArticleSection[] {
  const sections: ArticleSection[] = []
  const headingPattern = /^(#{2,3})\s+(.+)$/gm

  for (const match of markdown.matchAll(headingPattern)) {
    const title = plainHeading(match[2] ?? '')
    if (!title) continue
    sections.push({
      id: slugify(title),
      title,
      level: match[1] === '###' ? 3 : 2,
    })
  }

  return sections
}
