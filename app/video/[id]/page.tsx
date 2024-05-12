"use client";
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { videos } from '../videos';
import { MediaItem } from 'app/types';
import Link from 'next/link';

const Page = () => {
  const [video, setVideo] = React.useState<MediaItem | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    const pathnameParts = pathname.split('/');
    const id = pathnameParts[pathnameParts.length - 1];
    const videoObject = videos.find((video) => video.id === id);
    
    if (videoObject) {
      setVideo(videoObject);
      setTimeout(() => {
        router.replace(`https://www.youtube.com/watch?v=${id}`);
      }, 500);
    } else {
      router.replace('/404');
    }
  }, [pathname, router]);

  return (
    <div>
     {video ? 
     <p>Redirecting to <Link target="_blank" className="underline" href={`https://www.youtube.com/watch?v=${video.id}`}>{video.title}</Link> on YouTube</p> :
     <p>Redirecting...</p>
     }
    </div>
  );
};

export default Page;