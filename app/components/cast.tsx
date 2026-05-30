import { FarcasterEmbed } from 'react-farcaster-embed/dist/client'
import EmbedBoundary from './embed-boundary'

interface CastProps {
  url: string
  [key: string]: any
}

function CastFallback({ url }: { url: string }) {
  return (
    <div className="max-w-[600px] mx-auto my-6">
      <a href={url} target="_blank" rel="noopener noreferrer">
        View cast on Farcaster
      </a>
    </div>
  )
}

export default function Cast({ url, ...props }: CastProps) {
  return (
    <EmbedBoundary fallback={<CastFallback url={url} />}>
      <div className="max-w-[600px] mx-auto my-6">
        <FarcasterEmbed url={url} {...props} />
      </div>
    </EmbedBoundary>
  )
}
