'use client'

import Link from "next/link"
import Media from "./media"
import React from "react";
import sdk from "@farcaster/frame-sdk";

export default function HomePage(){
    const [isSDKLoaded, setIsSDKLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        const load = async () => {
        sdk.actions.ready();
        };
        if (sdk && !isSDKLoaded) {
        setIsSDKLoaded(true);
        load();
        }
    }, [isSDKLoaded]);

    return(
        <section>
            <h1 className="text-2xl font-semibold tracking-tighter">
            Dylan Steck
            </h1>
            <p className="mb-4">
            Currently building products onchain and hacking at <Link className="underline" href="https://farhack.xyz" target="_blank">FarHack</Link>.
            Full-stack engineer focused on building software that gives people more agency. 
            </p>
            <div className="my-8">
                <Media />
            </div>
        </section>
    )
}