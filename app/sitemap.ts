import { getBlogPosts } from 'app/blog/utils'
import { videos as videosList } from './video/videos'

export const baseUrl = 'https://dylansteck.com'
export const bannerImg = 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png'

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let videos = videosList.map((video) => ({
    url: `${baseUrl}/video/${video.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...videos]
}
