const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: { 
    domains: ['res.cloudinary.com']
  },
  transpilePackages: ["geist"],
}

module.exports = withMDX(nextConfig)