// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {

    // if (request.nextUrl.pathname.startsWith("/")
    //     && !request.nextauth.token?.key) {
    //     return NextResponse.rewrite(
    //         new URL("/error", request.url)
    //     )
    // }

    // Example of how to protect a route based on role
    // if (request.nextUrl.pathname.startsWith("/profile")
    //     && request.nextauth.token?.role !== "admin") {
    //     return NextResponse.rewrite(
    //         new URL("/denied", request.url)
    //     )
    // }

  },
  {
    callbacks: {
      // The `authorized` callback determines if a request is authorized.
      authorized: ({ token }) => {
        // The request is authorized if both `token` and `token.key` exist.
        return !!token && !!token.key && !token.error;
      },
    },


    // The pages configuration should match the same configuration in [...nextauth].ts. This is so that the next-auth Middleware is aware of your custom pages, so it won't end up redirecting to itself when an unauthenticated condition is met.
    pages: {
      signIn: "/signin",
      error: "/error",
    },
  },
)

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  // matcher: ["/profile", "/mails/:path*", "/client"], Protects specific pages. 
  matcher: ["/((?!signup|password-reset|account-confirm-email|confirm-email|error).*)"], // Protects all the pages.

  // matcher: ["/"],
}