import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dubcraftEndpoint } from "src/consts";

type MyUser = {
  avatar_url?: string;
  gender?: string;
  id?: number;
  last_name?: string;
  name?: string;
  phone?: string;
};

declare module "next-auth" {
  interface User {
    user?: MyUser;
    access_token?: string;
    refresh_token?: string;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: MyUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: MyUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "custom-login",
      type: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const response = await fetch(`${dubcraftEndpoint}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await response.json();

          if (response.status === 200 && user.statusCode === 200) {
            return user.data;
          }
        } catch (_error) {
          throw new Error("Failed to fetch user");
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "custom-signup",
      type: "credentials",
      credentials: {},
      name: "credentials",
      async authorize(credentials: any) {
        try {
          const response = await fetch(`${dubcraftEndpoint}/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              first_name: credentials?.first_name,
              last_name: credentials?.last_name,
              password: credentials?.password,
              email: credentials?.email,
              phone: credentials?.phone.replace(/\s/g, ""),
              firebase_token: credentials?.firebaseToken,
              policy_approved: !!credentials.policy_approved,
            }),
          });

          const user = await response.json();

          if (response.status === 200 && user.statusCode === 200) {
            return user.data;
          }
        } catch (_error) {
          throw new Error("Failed to register user");
        }
        return null;
      },
    }),
    CredentialsProvider({
      id: "forgot-pass",
      type: "credentials",
      credentials: {},
      name: "credentials",
      async authorize(credentials: any) {
        try {
          const response = await fetch(`${dubcraftEndpoint}/resetPassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firebase_token: credentials?.token,
              password: credentials?.password,
              phone: credentials?.phone,
            }),
          });

          const user = await response.json();

          if (response.status === 200 && user.statusCode === 200) {
            return user.data;
          }
        } catch (_error) {
          throw new Error("Failed to reset password");
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, trigger, session }) => {
      if (trigger === "update") {
        token.user!.phone = session.phone;
      }

      if (account?.id_token) {
        try {
          const response = await fetch(`${dubcraftEndpoint}/googleLogin`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              google_id_token: account.id_token,
            }),
          });

          const data = await response.json();
          token.user = data.data.user;
          token.accessToken = data.data.access_token;
          token.refreshToken = data.data.refreshToken;
        } catch (_error) {
          token.error = "GoogleAuthError";
        }
      } else if (user) {
        token.user = user.user;
        token.accessToken = user.access_token;
        token.refreshToken = user.refresh_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.error === "GoogleAuthError") {
        throw new Error("Google Authentication Error");
      }

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1209600, // 14 days
  },
  pages: { signIn: "/auth/sign-in", error: "/auth/error" },
};
