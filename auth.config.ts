import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/",
    newUser: "/",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true; 
      // No pages that are *fully* protected by auth
    },
  },
} satisfies NextAuthConfig;