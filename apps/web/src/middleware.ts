import { NextRequest, NextResponse } from "next/server";
import { authRoutes } from "../routes.config";


export function middleware(request: NextRequest) {
    const { nextUrl } = request;

    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const accessToken = request.cookies.get("access_token");

    if (!isAuthRoute && !accessToken) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next|_vercel|api|.*\\..*).*)",
    ],
};
