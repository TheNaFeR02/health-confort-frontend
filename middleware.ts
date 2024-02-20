// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request: NextRequestWithAuth) {

        if (request.nextUrl.pathname.startsWith("/")
            && !request.nextauth.token?.accessAPIToken) {
            return NextResponse.rewrite(
                new URL("/error", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/profile")
            && request.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

        if (request.nextUrl.pathname.startsWith("/client")
            && request.nextauth.token?.role !== "user"
        ) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },

        pages: {
            signIn: "/signin",

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