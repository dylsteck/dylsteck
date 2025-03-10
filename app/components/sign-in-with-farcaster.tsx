/* eslint-disable @next/next/no-img-element */
"use client";

import "@farcaster/auth-kit/styles.css";
import { useSession, signIn, signOut, getCsrfToken } from "next-auth/react";
import { SignInButton, AuthKitProvider, StatusAPIResponse } from "@farcaster/auth-kit";
import React, { useState } from "react";

// const config = {
//   relay: "https://relay.farcaster.xyz",
//   rpcUrl: "https://mainnet.optimism.io",
//   siweUri: "https://dylansteck.com",
//   domain: "dylansteck.com",
// };

const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  siweUri: "https://example.com",
  domain: "example.com",
};

export default function SignInWithFarcaster() {

  return (
    <AuthKitProvider config={config}>
      <Content />
    </AuthKitProvider>
  );
}

function Content() {
  const { data: session } = useSession();
  const [error, setError] = React.useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const getNonce = React.useCallback(async () => {
    const nonce = await getCsrfToken();
    if (!nonce) throw new Error("Unable to generate nonce");
    return nonce;
  }, []);

  const handleSuccess = React.useCallback(
    (res: StatusAPIResponse) => {
      signIn("credentials", {
        message: res.message,
        signature: res.signature,
        name: res.username,
        pfp: res.pfpUrl,
        csrfToken: (res as unknown as any).csrfToken,
        redirect: false,
      });
    },
    []
  );

  return (
    <div className="flex flex-row gap-10 items-center">
      {!session ? (
        <div className="text-white">
          <SignInButton
            nonce={getNonce}
            onSuccess={handleSuccess}
            onError={() => setError(true)}
            onSignOut={() => signOut()}
          />
          {error && <div>Unable to sign in at this time.</div>}
        </div>
      ) : (
        <div className="relative">
          <div className="pt-2 flex-row gap-2 items-center hidden md:flex">
            <div className="flex flex-row gap-2 items-center bg-fcPurple text-white border-1 rounded-full px-2 py-1 pl-2 pr-2">
              <img src={session.user?.image ?? ""} alt="User Image" className="w-8 h-8 rounded-full" />
              <p>{session.user?.name}</p>
            </div>
            <div className="flex flex-row gap-2 items-center bg-red-500 text-white border-1 rounded-full px-2 py-2 pl-3 pr-3 cursor-pointer" onClick={() => signOut()}>
              <p className="font-medium">Logout</p>
            </div>
          </div>
          <div className="text-white pt-2 flex flex-col items-center md:hidden">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex flex-row gap-2 items-center bg-fcPurple text-white border-1 rounded-full px-2 py-1 pl-2 pr-2 cursor-pointer">
              <img src={session.user?.image ?? ""} alt="User Image" className="w-8 h-8 rounded-full" />
              <p>{session.user?.name}</p>
            </button>
            {dropdownOpen && (
              <div className="absolute top-12 right-0 rounded-full shadow-lg bg-red-500 text-white mt-2">
                <button onClick={() => signOut()} className="w-full text-left px-4 py-2">Logout</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}