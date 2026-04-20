import { createFileRoute } from '@tanstack/react-router'
import Video from '../components/video'
import { videos } from '../video/videos'
import { appUrl, createMiniAppEmbed } from '../sitemap'

export const Route = createFileRoute('/video/$id')({
  head: ({ params }) => {
    const { id } = params
    const video = videos.find((v) => v.id === id)
    if (!video) {
      return { meta: [{ title: 'Not found | Dylan Steck' }] }
    }
    const ogImage = video.banner
    const miniAppEmbed = JSON.stringify(
      createMiniAppEmbed('Watch Video', ogImage, `${appUrl}/video/${video.id}`)
    )
    return {
      meta: [
        { title: `${video.title} | Dylan Steck` },
        { name: 'description', content: video.description },
        { property: 'og:title', content: video.title },
        { property: 'og:description', content: video.description },
        { property: 'og:type', content: 'video.episode' },
        { property: 'og:url', content: `${appUrl}/video/${video.id}` },
        { property: 'og:image', content: ogImage },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: video.title },
        { name: 'twitter:description', content: video.description },
        { name: 'twitter:image', content: ogImage },
        { name: 'fc:frame', content: miniAppEmbed },
        { name: 'fc:miniapp', content: miniAppEmbed },
      ],
    }
  },
  component: VideoPage,
})

function VideoPage() {
  const { id: ytId } = Route.useParams()

  return (
    <div className="min-h-screen w-full bg-white dark:bg-black">
      <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0 pt-8 sm:pt-9">
        <Video ytId={ytId} />
      </div>
    </div>
  )
}
