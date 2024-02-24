import { Account, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth"
import { parseURL } from "@/utils/parseURL";
import { z } from "Zod"
import { loginUser } from "@/services/loginUser";
import { userSchema } from "@/types/userSchema"
import { getUserDetails } from "@/services/getUserDetails"


export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        try {
          const apiToken = await loginUser(credentials);
          if (!apiToken) return null;
          return await getUserDetails(apiToken.key);
        } catch (error) {
          throw error instanceof Error ? new Error(error.message) : error;
        }
      }
    })
  ],

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role

    async jwt({ token, user, account }) {

      if (user) {
        token.role = user.role
        token.key = user.key // Add the user key to the token, this is that will allow to the middleware to check if the user is authenticated. (authorize callback in middleware.ts)
      }

      return token
    },

    async session({ session, token }) {

      if (session?.user) {
        session.user.role = token.role
        session.user.key = token.key
        session.user.email = token.email
      }

      return session
    },

  },

  pages: {
    // /api/auth/signin is the built-in signin page that is used by the CredentialsProvider
    // if you want to use your own signin page, you can do so by specifying the path to your custom signin page here
    // Ref: https://next-auth.js.org/configuration/pages
    signIn: "/signin",
  }

}