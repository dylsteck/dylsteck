"use client";
import { MediaItem } from "app/types";
import { videos } from "app/video/videos";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Video({ ytId } : { ytId: string }) {
  const router = useRouter();
  const [video, setVideo] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
      const videoObject = videos.find((video) => video.id === ytId);
      if (videoObject) {
          setVideo(videoObject);
          setTimeout(() => {
            router.replace(`https://www.youtube.com/watch?v=${ytId}`);
          }, 500);
      } else {
          router.replace('/404');
      }
  }, [ytId, router]);

  return (
      <div>
          {video !== null ? 
              <p>Redirecting to <Link target="_blank" className="underline" href={`https://www.youtube.com/watch?v=${video.id}`}>{video.title}</Link> on YouTube</p>
              :
              <p>Redirecting...</p>
          }
      </div>
  );
}