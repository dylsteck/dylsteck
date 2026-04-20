import { Tweet } from 'react-tweet'

interface TweetProps {
  id: string
  [key: string]: any
}

export default function TweetComponent({ id, ...props }: TweetProps) {
  return (
    <div className="max-w-[600px] mx-auto my-6">
      <Tweet id={id} {...props} />
    </div>
  )
}
