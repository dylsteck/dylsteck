import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.imgur.com',
            },
            {
                protocol: 'https',
                hostname: 'proxy.wrpcd.net',
            },
            {
                protocol: 'https',
                hostname: 'farhack.xyz',
            },
            {
                protocol: 'https',
                hostname: 'promptarena.xyz',
            },
        ],
    },
};

export default nextConfig;
