import Link from 'next/link';
import { Metadata } from 'next';
import { posts } from 'app/blog/posts/posts';
import { MediaItem } from 'app/types';
import Video from 'app/components/video';
import ArticleRedirect from 'app/components/article-redirect';
import { getBlogPosts } from 'app/blog/utils';
import { appUrl, createFrame } from 'app/sitemap';

export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }))
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let post = getBlogPosts().find((post) => post.slug === id);
  let postItem = posts.find((post) => post.id === id);
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
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(publishedTime).toISOString(),
      url: `${appUrl}/articles/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    other: {
      "fc:frame": JSON.stringify(createFrame('Read Post', ogImage, `${appUrl}/blog/${post.slug}`)),
      "fc:miniapp": JSON.stringify(createFrame('Read Post', ogImage, `${appUrl}/blog/${post.slug}`)),
    },
  };
}

// redirects `/articles/[id]` slugs from the old site to `/blog/[id]`
export default async function ArticlePage({ params }){
  const { id } = await params;

  return <ArticleRedirect id={id} />;
};