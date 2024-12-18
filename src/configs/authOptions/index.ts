import { minecraftEndpoint } from "@/consts";
import type { IUser } from "@/lib/features/user/userSlice";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { customLogin } from "./customLogin";
import { customSingUp } from "./customSignUp";
import { forgotPass } from "./forgotPass";
import { googleLoginProvider } from "./googleLogin";
import { guestLogin } from "./guestLogin";

declare module "next-auth" {
  interface User {
    user?: IUser;
    access_token?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user?: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: IUser;
  }
}

export const authOptions: (cookies?: any) => NextAuthOptions = (cookies) => ({
  providers: [
    GoogleProvider(googleLoginProvider),
    CredentialsProvider(customLogin),
    CredentialsProvider(guestLogin),
    CredentialsProvider(customSingUp(cookies)),
    CredentialsProvider(forgotPass),
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger, session }) => {
      if (trigger === "update") {
        token.user = { ...token.user, ...session.user };
      }

      if (account?.id_token) {
        try {
          const response = await fetch(`${minecraftEndpoint}/auth/google-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: account.id_token,
              referral_code: cookies?.referral_code,
            }),
          });

          const result = await response.json();
          const dataResponse = await fetch(`${minecraftEndpoint}/me`, {
            headers: {
              Authorization: `Bearer ${result.data}`,
            },
          });

          const userData = await dataResponse.json();

          token.accessToken = result.data;
          token.user = userData.data;
        } catch (_error) {
          token.error = "GoogleAuthError";
        }
      } else if (user) {
        // token.user = user.user;
        // token.accessToken = user.access_token;

        const dataResponse = await fetch(`${minecraftEndpoint}/me`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });
        const userData = await dataResponse.json();

        token.accessToken = user as any;
        token.user = userData.data;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.error === "GoogleAuthError") {
        throw new Error("Google Authentication Error");
      }

      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1209600, // 14 days
  },
  pages: { signIn: "/login", error: "/error" },
});
