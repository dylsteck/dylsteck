import { getArticles, getNotes } from 'app/blog/utils'

export const baseUrl = 'https://dylansteck.com'

export default async function sitemap() {
  let articles = getArticles().map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let notes = getNotes().map((post) => ({
    url: `${baseUrl}/notes/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articles, ...notes]
}
