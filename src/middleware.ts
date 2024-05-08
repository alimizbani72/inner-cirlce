import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (!!session?.accessToken && !session.user?.phone && !pathname.includes("/phone")) {
    return NextResponse.redirect(new URL("/auth/phone", req.url));
  }

  if (!session?.accessToken && (pathname.includes("dashboard") || pathname.includes("/phone"))) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
  if (!!session?.accessToken && !!session.user?.phone && pathname.includes("auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
