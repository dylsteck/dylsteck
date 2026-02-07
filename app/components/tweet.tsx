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
    return (
      <div className="max-w-[600px] mx-auto my-6">
        {tweet ? <EmbeddedTweet tweet={tweet} {...props} /> : <TweetNotFound />}
      </div>
    )
  } catch (error) {
    console.error(error)
    return (
      <div className="max-w-[600px] mx-auto my-6">
        <TweetNotFound error={error} />
      </div>
    )
  }
}

