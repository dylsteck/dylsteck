import React, { ReactNode, useEffect, useState } from 'react';
import { FarcasterEmbed as FarcasterEmbedAsync } from 'react-farcaster-embed';
import "react-farcaster-embed/dist/styles.css";

const Cast = ({ url, username, hash }: { url?: string, username?: string, hash?: string}) => {
  const [embedContent, setEmbedContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmbed = async () => {
      try {
        const content = await FarcasterEmbedAsync({ url, username, hash });
        setEmbedContent(content);
      } catch (err) {
        setError(err as unknown as string);
      }
    };

    fetchEmbed();
  }, [url, username, hash]);

  // TODO: style the loading and error states
  if (error) {
    return <div>Error loading embed: {error}</div>;
  }
  if (!embedContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[95%] md:max-w-[50%] pt-4 pb-4">
      <div>
        {embedContent}
      </div>
    </div>
  );
};

export default Cast;