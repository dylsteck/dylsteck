import React, { ReactNode, useEffect, useState } from 'react';
// @ts-ignore
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

const Cast = ({ url, username, hash }: { url?: string, username?: string, hash?: string}) => {

  return (
    <div className="max-w-[95%] md:max-w-[50%] pt-4 pb-4">
      <FarcasterEmbed url={url} username={username} hash={hash} />
    </div>
  );
};

export default Cast;