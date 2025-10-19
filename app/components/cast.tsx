'use client'

import { FarcasterEmbed } from 'react-farcaster-embed/dist/client'

interface CastProps {
  url: string
  [key: string]: any
}

export default function Cast({ url, ...props }: CastProps) {
  return <FarcasterEmbed url={url} {...props} />
}

