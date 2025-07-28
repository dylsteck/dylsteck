import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { socialLinks } from '../lib/constants'
import { videos } from '../video/videos'

export async function GET() {
  try {
    const appDir = path.join(process.cwd(), 'app')
    
    let content = `# Dylan Steck\n\n`
    content += `This is a directory of content on [dylansteck.com](https://dylansteck.com)\n\n`

    // Add main pages
    content += `## Pages\n\n`
    content += `- [Homepage](/) - Dylan Steck, Engineer at Base\n`
    content += `- [RSS Feed](/rss) - RSS feed\n\n`

    // Add blog posts
    const blogPostsDir = path.join(appDir, 'blog', 'posts')
    if (fs.existsSync(blogPostsDir)) {
      content += `## Blog Posts\n\n`
      const blogFiles = fs.readdirSync(blogPostsDir)
        .filter(file => file.endsWith('.md'))
        .sort()
      
      blogFiles.forEach(file => {
        const slug = file.replace('.md', '')
        const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        content += `- [${title}](/blog/${slug})\n`
      })
      content += `\n`
    }

    // Add all videos from constants
    content += `## Videos\n\n`
    videos.forEach(video => {
      content += `- [${video.title}](/video/${video.id})\n`
    })
    content += `\n`

    // Add contact/social links from constants
    content += `## Contact\n\n`
    socialLinks.forEach(link => {
      content += `- [${link.text}](${link.url})\n`
    })
    content += `\n`

    content += `## About\n\n`
    content += `Dylan Steck is an engineer at [Base](https://base.org), focused on building products onchain that give people more agency.\n`

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    })
  } catch (error) {
    console.error('Error generating llms.txt:', error)
    return new NextResponse('Error generating directory', { status: 500 })
  }
}