"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import type { MiniAppContext } from "@farcaster/miniapp-core/dist/context";
import type { AddMiniAppResult } from "@farcaster/miniapp-core/dist/actions/AddMiniApp";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface MiniAppContextType {
  isMiniAppReady: boolean;
  context: MiniAppContext | null;
  error: string | null;
  setMiniAppReady: () => Promise<void>;
  addMiniApp: () => Promise<AddMiniAppResult | null>;
  isInClient: boolean;
}

const FarcasterMiniAppContext = createContext<MiniAppContextType | undefined>(undefined);

export function MiniAppProvider({
  addMiniAppOnLoad,
  children,
}: {
  addMiniAppOnLoad?: boolean;
  children: ReactNode;
}) {
  const [context, setContext] = useState<MiniAppContext | null>(null);
  const [isMiniAppReady, setIsMiniAppReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInClient, setIsInClient] = useState(false);

  const setMiniAppReady = useCallback(async () => {
    try {
      // Check if we're in a Farcaster client
      const contextData = await sdk.context;
      if (contextData) {
        setContext(contextData as MiniAppContext);
        setIsInClient(true);
      } else {
        setError("Not running in a Farcaster client");
        setIsInClient(false);
      }
      
      // Initialize the SDK
      await sdk.actions.ready();
      console.log("Farcaster Mini App SDK initialized successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize SDK";
      setError(errorMessage);
      console.error("SDK initialization error:", err);
      
      // Still mark as ready even if initialization fails (for development)
      setIsInClient(false);
    } finally {
      setIsMiniAppReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isMiniAppReady) {
      setMiniAppReady().then(() => {
        console.log("MiniApp loaded and ready");
      });
    }
  }, [isMiniAppReady, setMiniAppReady]);

  const handleAddMiniApp = useCallback(async (): Promise<AddMiniAppResult | null> => {
    try {
      const result = await sdk.actions.addMiniApp();
      if (result) {
        console.log("Mini App added successfully", result);
        return result;
      }
      return null;
    } catch (error) {
      console.error("[error] adding Mini App", error);
      return null;
    }
  }, []);

  const contextValue: MiniAppContextType = {
    isMiniAppReady,
    setMiniAppReady,
    addMiniApp: handleAddMiniApp,
    context,
    error,
    isInClient,
  };

  return (
    <FarcasterMiniAppContext.Provider value={contextValue}>
      {children}
    </FarcasterMiniAppContext.Provider>
  );
}

export function useMiniApp() {
  const context = useContext(FarcasterMiniAppContext);
  if (context === undefined) {
    throw new Error("useMiniApp must be used within a MiniAppProvider");
  }
  return context;
}