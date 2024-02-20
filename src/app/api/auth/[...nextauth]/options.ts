import { Account, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth"
import { parseURL } from "@/utils/parseURL";
import { z } from "Zod"
import { loginUser } from "@/utils/loginUser";
import { userSchema } from "@/types/userSchema"
import { getUserDetails } from "@/utils/getUserDetails"


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

        const apiToken = await loginUser(credentials);

        if (apiToken) {
          return await getUserDetails(apiToken.key);
        }

        return null
      }
    })
  ],

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log("----SIGNIN----");

    //   const apiToken = user.key; // When using CredentialsProvider, <user> comes from authorize()

    //   const res = await fetch(parseURL("/api/auth/user/"), {
    //     method: 'GET',
    //     headers: {
    //       "Authorization": `Token ${apiToken}`
    //     }
    //   });

    //   if (!res.ok) {
    //     console.error('Failed to fetch user details.');
    //     return false;
    //   }

    //   const userDetails = await res.json();

    //   // Merge user and userDetails
    //   user = { ...user, ...userDetails };

    //   try {
    //     const userValidated = userSchema.parse(user);
    //     console.log("user logged in: ", userValidated)
    //     return true;
    //   } catch (error) {
    //     console.error("Error parsing user details: ", error);
    //     return false;
    //   }
    // },

    // async jwt({ token, user, account }) {
    //   console.log("-----JWT------")
    //   // console.log("token: ", token)
    //   // console.log("user: ", user)
    //   // console.log("account: ", account)
    //   return token
    // },

    async session({ session, token }) {
      return session
    },

  },
}