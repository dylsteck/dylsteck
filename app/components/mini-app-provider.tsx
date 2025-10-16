'use client';

import { useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function MiniAppProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the Farcaster Mini App SDK
    const initializeSDK = async () => {
      try {
        // Call ready() to hide the splash screen and initialize the SDK
        await sdk.actions.ready();
      } catch (error) {
        console.error("Failed to initialize Farcaster Mini App SDK:", error);
      }
    };

    initializeSDK();
  }, []);

  return (
    <>
      {children}
    </>
  );
}