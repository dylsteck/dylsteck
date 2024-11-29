import { getBlogPosts } from 'app/blog/utils'
import { videos as videosList } from './video/videos'

export const appUrl = process.env.NEXT_PUBLIC_URL || 'https://dylansteck.com';
export const bannerImg = 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png'
export const iconImg = 'https://i.imgur.com/DDrGKML.png';

export function createFrame(title = 'Launch Site', imageUrl = bannerImg){
  return {
    version: "next",
    imageUrl: imageUrl,
    button: {
      title: title,
      action: {
        type: "launch_frame",
        name: "Dylan Steck",
        url: appUrl,
        splashImageUrl: iconImg,
        splashBackgroundColor: "#000000",
      },
    },
  };
}

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${appUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let videos = videosList.map((video) => ({
    url: `${appUrl}/video/${video.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  let routes = ['', '/blog'].map((route) => ({
    url: `${appUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogs, ...videos]
}
