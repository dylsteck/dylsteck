import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

interface ExtendedSession extends Session {
  user: User;
}

const ADMIN_FID = 616;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Sign in with Farcaster",
      credentials: {
        message: { label: "Message", type: "text", placeholder: "0x0" },
        signature: { label: "Signature", type: "text", placeholder: "0x0" },
        name: { label: "Name", type: "text", placeholder: "0x0" },
        pfp: { label: "Pfp", type: "text", placeholder: "0x0" },
        csrfToken: { label: "CSRF Token", type: "text", placeholder: "0x0" },
      },
      async authorize(credentials) {
        const appClient = createAppClient({
          ethereum: viemConnector(),
        });

        const verifyResponse = await appClient.verifySignInMessage({
          message: credentials?.message as string,
          signature: credentials?.signature as `0x${string}`,
          domain: "example.com",
          // domain: "dylansteck.com",
          nonce: credentials?.csrfToken as string,
        });

        const { success, fid } = verifyResponse;
  
        if (!success) {
          return null;
        }

        if (fid !== ADMIN_FID) {
          return null;
        }

        const user = {
          id: fid,
          name: credentials?.name as string,
          image: credentials?.pfp as string,
        };

        return {
          ...user, 
          id: user.id.toString(),
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: ExtendedSession;
      token: any;
    }) {
      if (session.user) {
        session.user = token.user as User;
      }

      return session;
    },
  },
});