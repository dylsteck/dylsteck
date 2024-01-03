import Layout from "../components/layout";
import dsLogo from "../assets/DylanLogoTransparent.png";
import Image from "next/image";
import Link from "next/link";
import CortexName from "../components/CortexName";
import Projects from "../components/Projects";
import Featured from "../components/Featured";
import Experience from "../components/Experience";
import dsGreyLogo from '../../public/dsGreyLogo.png';
import Nav from "../components/Nav";
import Head from "next/head";

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
        <meta property="og:image" content="https://i.imgur.com/Y5OSybl.png" />
        <meta property="og:site_name" content="Dylan Steck" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://dylansteck.com" />
        <meta name="twitter:title" content="Dylan Steck" />
        <meta name="twitter:description" content="Dylan Steck is a developer and designer building Cortex" />
        <meta name="twitter:image" content="https://i.imgur.com/Y5OSybl.png" />
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
          {/* TODO: contact info under here, maybe resume or about somewhere in future */}
        </div> 
      </div>
    </Layout>
  )
}