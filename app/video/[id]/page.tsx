import Link from 'next/link';
import { Metadata } from 'next';
import { videos } from '../videos';
import { MediaItem } from 'app/types';
import Video from 'app/components/video';
import { appUrl, createFrame } from 'app/sitemap';

export async function generateStaticParams() {
  return videos.map((video) => ({
    id: video.id,
  }))
}

export function generateMetadata({ params }) {
  let video = videos.find((video) => video.id === params.id)
  let videoItem = videos.find((video) => video.id === params.id)
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
      "fc:frame": JSON.stringify(createFrame('Watch Video', ogImage, `${appUrl}/video/${video.id}`)),
      "fc:miniapp": JSON.stringify(createFrame('Watch Video', ogImage, `${appUrl}/video/${video.id}`)),
    },
  }
}

export default function VideoPage({ params }){
  const { id: ytId } = params

  return <Video ytId={ytId} />;
};