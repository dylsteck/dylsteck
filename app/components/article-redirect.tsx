import { MediaItem } from "app/types";
import { posts } from "app/blog/posts/posts";
import { Link, useNavigate } from "@tanstack/react-router";
import React from "react";

export default function ArticleRedirect({ id } : { id: string }) {
  const navigate = useNavigate();
  const [post, setPost] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
      const postObject = posts.find((video) => video.id === id);
      if (postObject) {
          setPost(postObject);
          setTimeout(() => {
            navigate({ to: '/blog/$id', params: { id: postObject.id }, replace: true });
          }, 500);
      } else {
          navigate({ to: '/404', replace: true });
      }
  }, [id, navigate]);

  return (
      <div>
          {post !== null ?
              <p>Redirecting to <Link target="_blank" className="underline" to="/blog/$id" params={{ id: post.id }}>{post.title}</Link></p>
              :
              <p>Redirecting...</p>
          }
      </div>
  );
}
