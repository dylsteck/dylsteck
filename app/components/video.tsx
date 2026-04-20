import { MediaItem } from "app/types";
import { videos } from "app/video/videos";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

export default function Video({ ytId } : { ytId: string }) {
  const navigate = useNavigate();
  const [video, setVideo] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
      const videoObject = videos.find((video) => video.id === ytId);
      if (videoObject) {
          setVideo(videoObject);
          setTimeout(() => {
            if (typeof window !== 'undefined') {
              window.location.replace(`https://www.youtube.com/watch?v=${ytId}`);
            }
          }, 500);
      } else {
          navigate({ to: '/404', replace: true });
      }
  }, [ytId, navigate]);

  return (
      <div>
          {video !== null ?
              <p>Redirecting to <a target="_blank" rel="noopener noreferrer" className="underline" href={`https://www.youtube.com/watch?v=${video.id}`}>{video.title}</a> on YouTube</p>
              :
              <p>Redirecting...</p>
          }
      </div>
  );
}
