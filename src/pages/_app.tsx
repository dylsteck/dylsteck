import '../styles/globals.css'
import "react-farcaster-embed/dist/styles.css";
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
    )
}
