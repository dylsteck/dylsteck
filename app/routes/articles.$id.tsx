import { createFileRoute } from '@tanstack/react-router'
import ArticleRedirect from '../components/article-redirect'
import { posts } from '../blog/posts/posts'
import { appUrl, bannerImg, createMiniAppEmbed } from '../sitemap'

export const Route = createFileRoute('/articles/$id')({
  head: ({ params }) => {
    const { id } = params
    const postItem = posts.find((post) => post.id === id)
    if (!postItem) {
      return { meta: [{ title: 'Not found | Dylan Steck' }] }
    }
    const postYear = new Date(postItem.date).getFullYear()
    const useLegacyImage = postYear <= 2023
    const ogImage = useLegacyImage
      ? postItem.banner || bannerImg
      : `${appUrl}/api/og/blog/${id}`
    const miniappImage = useLegacyImage
      ? postItem.banner || bannerImg
      : `${appUrl}/api/og/blog/${id}?miniapp=true`
    const miniAppEmbed = JSON.stringify(
      createMiniAppEmbed('Read Post', miniappImage, `${appUrl}/blog/${id}`)
    )
    return {
      meta: [
        { title: `${postItem.title} | Dylan Steck` },
        { name: 'description', content: postItem.description },
        { property: 'og:title', content: postItem.title },
        { property: 'og:description', content: postItem.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `${appUrl}/articles/${id}` },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: postItem.title },
        { name: 'twitter:description', content: postItem.description },
        { name: 'twitter:image', content: ogImage },
        { name: 'fc:frame', content: miniAppEmbed },
        { name: 'fc:miniapp', content: miniAppEmbed },
      ],
    }
  },
  component: ArticlePage,
})

function ArticlePage() {
  const { id } = Route.useParams()

  return (
    <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0">
      <ArticleRedirect id={id} />
    </div>
  )
}
