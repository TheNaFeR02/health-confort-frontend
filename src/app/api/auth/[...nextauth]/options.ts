import { Account, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth"
import { parseURL } from "@/utils/parseURL";
import { z } from "Zod"
import { loginUser } from "@/services/loginUser";
import { userSchema } from "@/types/userSchema"
import { getUserDetails } from "@/services/getUserDetails"
import GoogleProvider from "next-auth/providers/google";
import { signinGoogle } from "@/services/signinGoogle";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error('Missing required environment variables GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET');
}

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
    }),
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    // async signIn({ user, account, profile }) {
    //   console.log("-----------SIGN IN CALLBACK-----------")
    //   return true
    // },

    async jwt({ token, user, account }) {
      // either way i would need to save the token in the jwt callback. So maybe the await signinGoogle(id_token) wont be able to put in the signin callback
      console.log("-----------JWT CALLBACK-----------")
      if (user) {
        token.role = user.role
        token.key = user.key
        token.email = user.email
      }
      // token.role = user.role
      // // if user authenticates with google, the token here user.key will be undefined
      // // we use the account object to get the user id_token of google and then use it for the backend
      // token.key = user.key // Add the user key to the token, this is that will allow to the middleware to check if the user is authenticated. (authorize callback in middleware.ts)
      // token.email = user.email


      if (account?.provider === "google" && account.id_token) {
        console.log("account", account)
        const id_token = account.id_token;

        try {
          const apiToken = await signinGoogle(id_token);
          console.log("token succesfully retrieved w/ Google Provider: ", apiToken);
          token.key = apiToken.key
          return token
        } catch (error) {
          console.error("error", error);
          token.error = error; // if we assign an error to the token, we can use it then in pages to redirect to the error page 
        }
      }
      return token
    },

    async session({ session, token }) {
      console.log("-----------SESSION CALLBACK-----------")
      if (session?.user) {
        session.user.role = token.role
        session.user.key = token.key
        session.user.email = token.email
      }
      session.user.error = token.error;
      return session
    },

    async redirect({ url, baseUrl }) {

      // if the user is authenticated with google, 
      // we redirect to the google-callback page which handles wheter the user is authenticated or not
      if (url.includes("/google-callback")) {
        return '/google-callback';
      }

      // This is the default behavior,
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }

  },

  pages: {
    // /api/auth/signin is the built-in signin page that is used by the CredentialsProvider
    // if you want to use your own signin page, you can do so by specifying the path to your custom signin page here
    // Ref: https://next-auth.js.org/configuration/pages
    
    signIn: "/signin",
    error: "/error",
  }

}