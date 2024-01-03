import '../styles/globals.css'
import { AppProps } from 'next/app';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export default function App({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
    )
}
