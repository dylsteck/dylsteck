'use client'

import { Tweet } from 'react-tweet'

interface TweetProps {
  id: string
  [key: string]: any
}

export default function TweetComponent({ id, ...props }: TweetProps) {
  return <Tweet id={id} {...props} />
}

