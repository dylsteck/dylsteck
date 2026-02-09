import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/blog',
                destination: '/feed?filter=blog',
                permanent: true,
            },
            {
                source: '/video',
                destination: '/feed?filter=video',
                permanent: true,
            },
        ];
    },
    images: {
        // Allow same-origin API routes (OG images)
        unoptimized: false,
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
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
            {
                protocol: 'https',
                hostname: 'imagedelivery.net',
            },
            {
                protocol: 'https',
                hostname: 'stream.warpcast.com',
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'zku9gdedgba48lmr.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'wrpcd.net',
            },
            {
                protocol: 'https',
                hostname: 'assets.coingecko.com',
            },
        ],
    },
};

export default nextConfig;
