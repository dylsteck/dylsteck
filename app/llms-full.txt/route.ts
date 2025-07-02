import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { socialLinks } from '../lib/constants'
import { videos } from '../video/videos'

function readFileContent(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    return `[Error reading file: ${filePath}]`
  }
}

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dirPath)

    files.forEach(function(file) {
      const fullPath = path.join(dirPath, file)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory()) {
        // Skip node_modules, .git, and other build directories
        if (!['node_modules', '.git', '.next', 'dist', 'build'].includes(file)) {
          arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles)
        }
      } else {
        // Include only markdown files
        const ext = path.extname(file).toLowerCase()
        if (ext === '.md') {
          arrayOfFiles.push(fullPath)
        }
      }
    })
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error)
  }

  return arrayOfFiles
}

function formatTitle(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export async function GET() {
  try {
    const projectRoot = process.cwd()
    const appDir = path.join(projectRoot, 'app')
    
    let content = `# Dylan Steck - Full Content\n\n`
    content += `This file contains all markdown content from [dylansteck.com](https://dylansteck.com)\n\n`

    // Add main pages
    content += `## Pages\n\n`
    content += `- [Homepage](/) - Dylan Steck, Engineer at Base\n`
    content += `- [RSS Feed](/rss) - RSS feed\n\n`

    // Add blog posts with links
    const blogPostsDir = path.join(appDir, 'blog', 'posts')
    if (fs.existsSync(blogPostsDir)) {
      content += `## Blog Posts\n\n`
      const blogFiles = fs.readdirSync(blogPostsDir)
        .filter(file => file.endsWith('.md'))
        .sort()
      
      blogFiles.forEach(file => {
        const slug = file.replace('.md', '')
        const title = formatTitle(slug)
        content += `- [${title}](/blog/${slug})\n`
      })
      content += `\n`
    }

    // Add videos section from constants
    content += `## Videos\n\n`
    videos.forEach(video => {
      content += `- [${video.title}](/video/${video.id}) - ${video.description}\n`
    })
    content += `\n`

    // Add contact/social links from constants
    content += `## Contact\n\n`
    socialLinks.forEach(link => {
      content += `- [${link.text}](${link.url})\n`
    })
    content += `\n`

    content += `${'='.repeat(80)}\n\n`

    // Get all markdown files and include their content with better headers
    const allMarkdownFiles = getAllMarkdownFiles(projectRoot)
    
    // Sort files by name for better organization
    const sortedFiles = allMarkdownFiles.sort((a, b) => a.localeCompare(b))

    // Add each markdown file's content with better headers
    sortedFiles.forEach((filePath) => {
      const relativePath = path.relative(projectRoot, filePath)
      const fileContent = readFileContent(filePath)
      
      // Generate better header based on file type
      if (relativePath.includes('app/blog/posts/')) {
        const slug = path.basename(filePath, '.md')
        const title = formatTitle(slug)
        content += `## ${title} - [/blog/${slug}](/blog/${slug})\n\n`
      } else {
        content += `## ${relativePath}\n\n`
      }
      
      content += fileContent
      content += `\n\n${'-'.repeat(60)}\n\n`
    })

    content += `## About\n\n`
    content += `Dylan Steck is an engineer at Base, focused on building products onchain that give people more agency.\n`
    content += `This export contains all the markdown content from his personal website at dylansteck.com.\n`

    return new NextResponse(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'inline; filename="llms-full.txt"',
      },
    })
  } catch (error) {
    console.error('Error generating llms-full.txt:', error)
    return new NextResponse('Error generating full content export', { status: 500 })
  }
}