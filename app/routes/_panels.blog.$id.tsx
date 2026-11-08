import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { CustomMDX } from '../components/mdx'
import ArticleOutline from '../components/article-outline'
import { usePanelLayout } from '../components/panel-layout-context'
import { formatDate, getBlogPosts } from '../blog/utils'
import { posts } from '../blog/posts/posts'
import { extractArticleSections, type ArticleSection } from '../lib/headings'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'

type BlogData = {
  slug: string
  title: string
  summary: string
  publishedAt: string
  image?: string
  serialized: MDXRemoteSerializeResult
  postYear: number
  sections: ArticleSection[]
}

const getBlogData = createServerFn({ method: 'GET' })
  .inputValidator((id: string) => id)
  .handler(async ({ data: id }): Promise<BlogData | null> => {
    const post = getBlogPosts().find((p) => p.slug === id)
    if (!post) return null

    const postItem = posts.find((p) => p.id === id)
    const serialized = await serialize(post.content)
    const postYear = new Date(
      postItem?.date || post.metadata.publishedAt
    ).getFullYear()

    return {
      slug: post.slug,
      title: post.metadata.title,
      summary: post.metadata.summary,
      publishedAt: post.metadata.publishedAt,
      image: post.metadata.image,
      serialized,
      postYear,
      sections: extractArticleSections(post.content),
    }
  })

export const Route = createFileRoute('/_panels/blog/$id')({
  loader: async ({ params }) => {
    const data = await getBlogData({ data: params.id })
    if (!data) {
      throw notFound()
    }
    return data
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: 'Not found | Dylan Steck' }] }
    }
    const { title, summary: description, publishedAt, postYear } = loaderData
    const id = params.id
    const useLegacyImage = postYear <= 2023
    const postItem = posts.find((p) => p.id === id)
    const ogImage = useLegacyImage
      ? postItem?.banner || bannerImg
      : `${appUrl}/api/og/blog/${id}`
    const miniappImage = useLegacyImage
      ? postItem?.banner || bannerImg
      : `${appUrl}/api/og/blog/${id}?miniapp=true`
    const miniAppEmbed = JSON.stringify(
      createMiniAppEmbed('Read Post', miniappImage, `${appUrl}/blog/${id}`)
    )

    return {
      links: [{ rel: 'alternate', type: 'text/markdown', href: `${appUrl}/blog/${id}.md` }],
      meta: [
        { title: `${title} | Dylan Steck` },
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        {
          property: 'article:published_time',
          content: new Date(publishedAt).toISOString(),
        },
        { property: 'og:url', content: `${appUrl}/blog/${id}` },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: ogImage },
        { name: 'fc:frame', content: miniAppEmbed },
        { name: 'fc:miniapp', content: miniAppEmbed },
      ],
    }
  },
  component: BlogPost,
})

function BlogPost() {
  const data = Route.useLoaderData()
  const { isExpanded, toggleExpanded } = usePanelLayout()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: data.title,
    datePublished: new Date(data.publishedAt).toISOString(),
    dateModified: new Date(data.publishedAt).toISOString(),
    description: data.summary,
    image: data.image ? [`${appUrl}${data.image}`] : [bannerImg],
    url: `${appUrl}/blog/${data.slug}`,
    author: [
      {
        '@type': 'Person',
        name: 'Dylan Steck',
        url: 'https://dylansteck.com',
      },
    ],
  }

  return (
    <>
      <div className="blog-panel-toolbar">
        <Link to="/" className="blog-panel-toggle" aria-label="Back to home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5m7-7-7 7 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <button
          type="button"
          className="blog-panel-toggle blog-expand-toggle"
          aria-label={isExpanded ? 'Collapse article' : 'Expand article'}
          aria-expanded={isExpanded}
          aria-controls="blog-article"
          onClick={toggleExpanded}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d={isExpanded ? 'M4 10h6V4m10 10h-6v6M10 10 3 3m11 11 7 7' : 'M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7'}
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      {isExpanded && <ArticleOutline sections={data.sections} />}
      <section id="blog-article" className="blog-article mx-auto w-full max-w-4xl px-6 pt-12 pb-12 min-[900px]:w-[70%] sm:px-8 sm:pt-16">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {data.title}
        </h1>
        <div className="flex justify-between items-center mt-2 mb-8 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(data.publishedAt)}
          </p>
        </div>
        <article className="prose">
          <CustomMDX source={data.serialized} />
        </article>
      </section>
    </>
  )
}
