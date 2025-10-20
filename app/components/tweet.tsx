import { unstable_cache } from 'next/cache'
import { EmbeddedTweet, TweetNotFound } from 'react-tweet'
import { getTweet as _getTweet } from 'react-tweet/api'

interface TweetProps {
  id: string
  [key: string]: any
}

const getTweet = unstable_cache(
  async (id: string) => _getTweet(id),
  ['tweet'],
  { revalidate: 3600 * 24 }
)

export default async function TweetComponent({ id, ...props }: TweetProps) {
  try {
    const tweet = await getTweet(id)
    return tweet ? <EmbeddedTweet tweet={tweet} {...props} /> : <TweetNotFound />
  } catch (error) {
    console.error(error)
    return <TweetNotFound error={error} />
  }
}

