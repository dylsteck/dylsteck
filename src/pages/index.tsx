import Featured from "../components/Featured";
import Layout from "../components/layout";
import Nav from "../components/Nav";
import dsLogo from "../assets/DylanLogoTransparent.png";
import dsGreyLogo from '../../public/dsGreyLogo.png';
import Head from "next/head";
import Image from "next/image";
import { articles } from "../lib/articles";
import Link from "next/link";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>Dylan Steck</title>
        <meta name="description" content="Dylan Steck is a developer and designer building Cortex" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <meta name="title" content="Dylan Steck" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dylansteck.com" />
        <meta property="og:title" content="Dylan Steck" />
        <meta property="og:description" content="Dylan Steck is a developer and designer building Cortex" />
        <meta property="og:image" content="https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png" />
        <meta property="og:site_name" content="Dylan Steck" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dylansteck.com" />
        <meta name="twitter:title" content="Dylan Steck" />
        <meta name="twitter:description" content="Dylan Steck is a developer and designer building Cortex" />
        <meta name="twitter:image" content="https://res.cloudinary.com/dz3c2rl2o/image/upload/v1704144251/media/dsmetacard.png" />
        <meta name="twitter:creator" content="@Dylan_Steck" />
      </Head>
      <div className="w-full h-screen flex justify-center items-start">
        <div className="z-50 absolute left-[50vw] right-[50vw] top-[50vh] bottom-[50vh]">
        </div>
        <div className="w-full">
          <Nav />
          <div className="fixed z-[-50] top-[15vh] pl-[5%] md:pl-[25%]">
            <Image alt="DS grey logo" src={dsGreyLogo} width={604.72} height={752} />
          </div>
          <Featured />
          <div className="flex flex-col gap-4 justify-center w-[80%] p-[20%] pb-[7.5%] pl-[25%] max-h-[80%] pt-[5vh]">
            <p className="text-2xl font-medium">Articles</p>
            <div className="flex flex-col gap-5">
              {articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((article) => {
                return(
                  <div key={`article-${article.id}`}>
                    <Link href={`/articles/${article.id}`}>
                      <p className="text-lg">{article.title}</p>
                    </Link>
                    <p className="text-xs">{article.date}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div> 
      </div>
    </Layout>
  )
}