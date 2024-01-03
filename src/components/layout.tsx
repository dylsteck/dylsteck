import Head from "next/head"
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
  }
  
export default function Layout({ children }: LayoutProps) {
    return(
    <>
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

            <script async defer data-website-id="6bd90a5b-62c2-44c5-850b-7e24720d2062" src="https://dylsteck-analytics.up.railway.app/umami.js"></script>
        </Head>
        <main>
                {children}
        </main>
    </>
    )
}