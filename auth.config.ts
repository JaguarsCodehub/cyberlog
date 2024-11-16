import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import google from "next-auth/providers/google";
import resend from "next-auth/providers/resend";
import { db } from "./lib/db";
import adminEmails from "./data/admin-emails";

// List of common public email domains to block
const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "protonmail.com",
  "mail.com",
];

export const authConfig = {
  providers: [
    google,
    resend({
      from: process.env.EMAIL_FROM,
      name: "Email",
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/access-denied',
    verifyRequest: '/verify',
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      return isAuthenticated;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // First check if it's an admin email
        if (adminEmails.includes(user.email ?? "")) {
          return true; // Allow admin emails regardless of domain
        }

        // For non-admin emails, check domain restrictions
        const emailDomain = user.email?.split("@")[1];
        if (PUBLIC_EMAIL_DOMAINS.includes(emailDomain ?? "")) {
          return false; // Block public email domains for non-admins
        }
        return true; // Allow other corporate emails
      }
      return true;
    },
  },
  adapter: PrismaAdapter(db),
} satisfies NextAuthConfig;
