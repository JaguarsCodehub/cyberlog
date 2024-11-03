import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import resend from "next-auth/providers/resend";
import { db } from "./lib/db";

export const authConfig = {
  providers: [
    google,
    resend({
      from: process.env.EMAIL_FROM,
      name: "Email",
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    verifyRequest: "/verify",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
  },
  adapter: PrismaAdapter(db),
} satisfies NextAuthConfig;
