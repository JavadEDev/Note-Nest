import { NextResponse } from 'next/server';
import { auth } from './src/auth';

export const middleware = auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // ▸ Routes every logged-in user may access
    if (
        pathname.startsWith("/my") ||
        pathname.startsWith("/write") ||
        pathname.startsWith("/profile")
    ) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/auth/signin", req.url));
        }
    }

    // ▸ Teacher-only routes
    if (pathname.startsWith("/teacher")) {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/auth/signin", req.url));
        }
        if (req.auth?.user?.role !== "teacher") {
            return Response.redirect(new URL("/unauthorized", req.url));
        }
    }

    return NextResponse.rewrite(new URL('/404', req.url))

});

export const config = {
    matcher: [
        "/my/:path*",
        "/write/:path*",
        "/teacher/:path*",
        "/profile/:path*",
    ],
};