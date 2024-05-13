import Link from 'next/link';
import { Metadata } from 'next';
import { posts } from 'app/blog/posts/posts';
import { MediaItem } from 'app/types';
import Video from 'app/components/video';
import ArticleRedirect from 'app/components/article-redirect';

const baseUrl = 'https://dylansteck.com'

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }))
}

export function generateMetadata({ params }) {
  let post = posts.find((video) => video.id === params.id)
  let postItem = posts.find((video) => video.id === params.id)
  if (!post) {
    return
  }

  let ogImage = postItem?.banner;

  return {
    title: postItem?.title,
    description: postItem?.description,
    openGraph: {
      title: postItem?.title,
      description: postItem?.description,
      type: 'article',
      date: postItem?.date,
      url: `${baseUrl}/articles/${post.id}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: postItem?.title,
      description: postItem?.description,
      images: [ogImage],
    },
  }
}

// redirects `/articles/[id]` slugs from the old site to `/blog/[id]
export default function ArticlePage({ params }){
  const { id } = params

  return <ArticleRedirect id={id} />;
};