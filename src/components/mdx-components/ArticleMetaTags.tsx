import Head from "next/head";

export type ArticleMetaTagsProps = {
    title: string;
    description: string;
    slug: string;
    image: string;
}


export function ArticleMetaTags({ title, description, slug, image }: ArticleMetaTagsProps){
    return(
        <Head>
            <title>{title} | Dylan Steck</title>
            <meta name="description" content={description} />
            <meta name="author" content="Dylan Steck" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={`https://dylansteck.com/articles/${slug}`} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Dylan Steck" />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Head>
    )
}