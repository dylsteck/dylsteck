import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from 'react-tweet'
import type {
  QuotedTweet,
  Tweet as TweetData,
  TweetEntities,
} from 'react-tweet/api'
import EmbedBoundary from './embed-boundary'

interface TweetProps {
  id: string
  apiUrl?: string
  fetchOptions?: RequestInit
  onError?: (error: unknown) => unknown
  [key: string]: any
}

type MaybeTweetEntities = Partial<TweetEntities> | null | undefined

function normalizeTweetEntities(
  entities: MaybeTweetEntities
): TweetEntities {
  return {
    hashtags: Array.isArray(entities?.hashtags) ? entities.hashtags : [],
    urls: Array.isArray(entities?.urls) ? entities.urls : [],
    user_mentions: Array.isArray(entities?.user_mentions)
      ? entities.user_mentions
      : [],
    symbols: Array.isArray(entities?.symbols) ? entities.symbols : [],
    ...(Array.isArray(entities?.media) && entities.media.length > 0
      ? { media: entities.media }
      : {}),
  }
}

function normalizeDisplayTextRange(tweet: TweetData | QuotedTweet) {
  return Array.isArray(tweet.display_text_range)
    ? tweet.display_text_range
    : ([0, Array.from(tweet.text || '').length] as [number, number])
}

function normalizeTweet(tweet: TweetData): TweetData {
  return {
    ...tweet,
    display_text_range: normalizeDisplayTextRange(tweet),
    entities: normalizeTweetEntities(tweet.entities),
    quoted_tweet: tweet.quoted_tweet
      ? {
          ...tweet.quoted_tweet,
          display_text_range: normalizeDisplayTextRange(tweet.quoted_tweet),
          entities: normalizeTweetEntities(tweet.quoted_tweet.entities),
        }
      : undefined,
  }
}

function TweetEmbed({
  id,
  apiUrl,
  fetchOptions,
  onError,
  ...props
}: TweetProps) {
  const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions)

  if (isLoading) {
    return <TweetSkeleton />
  }

  if (error || !data) {
    return <TweetNotFound error={onError ? onError(error) : error} />
  }

  return <EmbeddedTweet tweet={normalizeTweet(data)} {...props} />
}

function TweetFallback({ id }: { id: string }) {
  return (
    <div className="max-w-[600px] mx-auto my-6">
      <a
        href={`https://x.com/i/status/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View tweet on X
      </a>
    </div>
  )
}

export default function TweetComponent({ id, ...props }: TweetProps) {
  return (
    <EmbedBoundary fallback={<TweetFallback id={id} />}>
      <div className="max-w-[600px] mx-auto my-6">
        <TweetEmbed id={id} {...props} />
      </div>
    </EmbedBoundary>
  )
}
