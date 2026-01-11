import Link from 'next/link';
import { Metadata } from 'next';
import { videos } from '../videos';
import { MediaItem } from 'app/types';
import Video from 'app/components/video';
import { appUrl, createMiniAppEmbed } from 'app/sitemap';
import BackNav from 'app/components/back-nav';

export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let video = videos.find((video) => video.id === id)
  let videoItem = videos.find((video) => video.id === id)
  if (!video) {
    return
  }

  let ogImage = videoItem?.banner;

  return {
    title: videoItem?.title,
    description: videoItem?.description,
    openGraph: {
      title: videoItem?.title,
      description: videoItem?.description,
      type: 'video.episode',
      date: videoItem?.date,
      url: `${appUrl}/video/${video.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: videoItem?.title,
      description: videoItem?.description,
      images: [ogImage],
    },
    other: {
      "fc:frame": JSON.stringify(createMiniAppEmbed('Watch Video', ogImage, `${appUrl}/video/${video.id}`)),
      "fc:miniapp": JSON.stringify(createMiniAppEmbed('Watch Video', ogImage, `${appUrl}/video/${video.id}`)),
    },
  }
}

export default async function VideoPage({ params }){
  const { id: ytId } = await params;

  return (
    <>
      <BackNav />
      <div className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0 pt-20">
        <Video ytId={ytId} />
      </div>
    </>
  );
};