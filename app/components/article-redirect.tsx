"use client";
import { MediaItem } from "app/types";
import { posts } from "app/blog/posts/posts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ArticleRedirect({ id } : { id: string }) {
  const router = useRouter();
  const [post, setPost] = React.useState<MediaItem | null>(null);

  React.useEffect(() => {
      const postObject = posts.find((video) => video.id === id);
      if (postObject) {
          setPost(postObject);
          setTimeout(() => {
            router.replace(`/blog/${postObject.id}`);
          }, 500);
      } else {
          router.replace('/404');
      }
  }, [id, router]);

  return (
      <div>
          {post !== null ? 
              <p>Redirecting to <Link target="_blank" className="underline" href={`/blog/${post.id}`}>{post.title}</Link></p>
              :
              <p>Redirecting...</p>
          }
      </div>
  );
}