import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
require("dotenv").config();

import CredentialProvider from "next-auth/providers/credentials";

// refresh token

const refreshToken = async (token: JWT): Promise<JWT> => {
  const res = await fetch(`${process.env.SOCKETURL}/auth/refresh`, {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendToken.refreshToken}`,
      "Content-Type": "application/json",
    },
  });

  console.log("refresh", res);

  const result = await res.json();
  return { ...token, backendToken: result };
};



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials, req) {
        console.log(credentials);
        if (!credentials?.email || !credentials.password) return null;
        const { email, password } = credentials;

        console.log(email, password);
        //make a post request to the backend
        const res = await fetch(`${process.env.SOCKETURL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(res);

        if (res.status === 200) {
          const user = await res.json();
          console.log(user);
          return user;
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      console.log("token", token, user);
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendToken.expiresIn) return token;
      return await refreshToken(token);
    },

    async session({ session, token }) {
      console.log(session);
      (session.user = token.user), console.log("token", token.backendToken);
      session.backendToken = token.backendToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
