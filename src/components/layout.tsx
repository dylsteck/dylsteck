import Head from "next/head"
import React, { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
  }
  
  
export default function Layout({ children }: LayoutProps) {
    
    return(
    <>
        <Head>
            <script async defer data-website-id="6bd90a5b-62c2-44c5-850b-7e24720d2062" src="https://dylsteck-analytics.up.railway.app/umami.js"></script>
        </Head>
        <main>
                {children}
        </main>
    </>
    )
}