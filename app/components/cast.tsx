import { FarcasterEmbed } from 'react-farcaster-embed'

interface CastProps {
  url: string
  [key: string]: any
}

export default function Cast({ url, ...props }: CastProps) {
  return <FarcasterEmbed url={url} {...props} />
}

