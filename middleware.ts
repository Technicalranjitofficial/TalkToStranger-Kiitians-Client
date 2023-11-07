import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    const auth = req.nextauth.token;

    console.log(pathname);

    if (pathname.startsWith("/chat") && !auth) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    // if(pathname.startsWith("/api/auth/signin") && auth){
    //     console.log("here")
    //     return NextResponse.redirect(new URL("/",req.url));
    // }

    if (pathname.startsWith("/signup") && auth) {
      console.log("here");
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname.startsWith("/signin") && auth) {
      console.log("here");
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/verify") && auth) {
      console.log("here");
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (pathname.startsWith("/reset") && auth) {
      console.log("here");
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Here");

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: async ({ req, token }) => {
        console.log(req.nextUrl.pathname);

        if (req.nextUrl.pathname.startsWith("/signup") && !token) {
          return true;
        }
        if (req.nextUrl.pathname.startsWith("/verify") && !token) {
          return true;
        }
        if (req.nextUrl.pathname.startsWith("/reset") && !token) {
          return true;
        }
        if (req.nextUrl.pathname.startsWith("/signin") && !token) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/chat",
    "/signup",
    "/signin",
    "/verify:path*",
    "/reset:path*",
    //all api route
  ],
};
