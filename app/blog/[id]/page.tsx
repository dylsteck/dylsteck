import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { posts } from '../posts/posts';

const baseUrl = 'https://dylansteck.com'
const bannerImg = 'https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png'

export async function generateStaticParams() {
  let posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
      url: `${baseUrl}/blog/${post.slug}`,
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

export default function Blog({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.id);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: `${post.metadata.title} | Dylan Steck`,
            datePublished: new Date(post.metadata.publishedAt).toISOString(),
            dateModified: new Date(post.metadata.publishedAt).toISOString(),
            description: post.metadata.summary,
            image: post.metadata.image 
              ? [
                  `${baseUrl}${post.metadata.image}`
                ]
              : [bannerImg],
            url: `${baseUrl}/blog/${post.slug}`,
            author: [
              {
                '@type': 'Person',
                name: 'Dylan Steck',
                url: 'https://dylansteck.com',
              },
            ],
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}