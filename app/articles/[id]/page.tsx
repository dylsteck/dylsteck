import Link from 'next/link';
import { Metadata } from 'next';
import { posts } from 'app/blog/posts/posts';
import { MediaItem } from 'app/types';
import Video from 'app/components/video';
import ArticleRedirect from 'app/components/article-redirect';
import { getBlogPosts } from 'app/blog/utils';

const baseUrl = 'https://dylansteck.com'

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }))
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.id);
  let postItem = posts.find((post) => post.id === params.id);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = postItem?.banner;

  return {
    title: `${title} | Dylan Steck`,
    description,
    openGraph: {
      title: `${title} | Dylan Steck`,
      description,
      type: 'article',
      publishedTime: new Date(publishedTime).toISOString(),
      url: `${baseUrl}/articles/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Dylan Steck`,
      description,
      images: [ogImage],
    },
  };
}

// redirects `/articles/[id]` slugs from the old site to `/blog/[id]`
export default function ArticlePage({ params }){
  const { id } = params

  return <ArticleRedirect id={id} />;
};