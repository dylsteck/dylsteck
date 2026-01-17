import { FarcasterEmbed } from 'react-farcaster-embed'

interface CastProps {
  url: string
  [key: string]: any
}

export default function Cast({ url, ...props }: CastProps) {
  return (
    <div className="max-w-[600px] mx-auto my-6">
      <FarcasterEmbed url={url} {...props} />
    </div>
  )
}

