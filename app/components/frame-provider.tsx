'use client';

import { useMiniKit } from "@coinbase/onchainkit/minikit";
import { useEffect } from "react";

export function FrameProvider({ children }: { children: React.ReactNode }){
  const { setFrameReady, isFrameReady } = useMiniKit();

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  return (
    <>
      {children}
    </>
  )
}