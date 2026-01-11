import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { formatDate, getBlogPosts } from 'app/blog/utils';
import { posts } from '../posts/posts';
import { appUrl, bannerImg, createMiniAppEmbed } from 'app/sitemap';
import BackNav from 'app/components/back-nav';

export async function generateStaticParams() {
  let posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
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
  
  const postYear = new Date(postItem?.date || publishedTime).getFullYear();
  const useLegacyImage = postYear <= 2023;
  
  const ogImage = useLegacyImage 
    ? (postItem?.banner || bannerImg)
    : `${appUrl}/api/og/blog/${id}`;
  
  const miniappImage = useLegacyImage
    ? (postItem?.banner || bannerImg)
    : `${appUrl}/api/og/blog/${id}?miniapp=true`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: new Date(publishedTime).toISOString(),
      url: `${appUrl}/blog/${post.slug}`,
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
      "fc:frame": JSON.stringify(createMiniAppEmbed('Read Post', miniappImage, `${appUrl}/blog/${post.slug}`)),
      "fc:miniapp": JSON.stringify(createMiniAppEmbed('Read Post', miniappImage, `${appUrl}/blog/${post.slug}`)),
    },
  };
}

export default async function Blog({ params }) {
  const { id } = await params;
  let post = getBlogPosts().find((post) => post.slug === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BackNav />
      <section className="max-w-xl mx-4 lg:mx-auto px-2 md:px-0 pt-20">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: post.metadata.title,
            datePublished: new Date(post.metadata.publishedAt).toISOString(),
            dateModified: new Date(post.metadata.publishedAt).toISOString(),
            description: post.metadata.summary,
            image: post.metadata.image 
              ? [
                  `${appUrl}${post.metadata.image}`
                ]
              : [bannerImg],
            url: `${appUrl}/blog/${post.slug}`,
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
    </>
  );
}