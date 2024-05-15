import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Negotiator from "negotiator";
import cookie from "cookie";

const locales = ["en", "de"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  // Try to get the locale from a cookie
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  if (cookies.lang && locales.includes(cookies.lang)) {
    return cookies.lang;
  }

  // Fallback to language negotiation
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") ?? "",
    },
  });
  const languages = negotiator.languages();
  const bestMatch = languages.find((lang: string) => locales.includes(lang.split("-")[0]));
  return bestMatch ? bestMatch.split("-")[0] : defaultLocale;
}

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Locale handling
  // Check if the request is for a static file by looking for file extensions
  if (pathname.includes(".") && !pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  if (!pathnameHasLocale) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  // Authentication handling
  if (!!session?.accessToken && !session.user?.phone && !pathname.includes("/phone")) {
    return NextResponse.redirect(new URL("/auth/phone", req.url));
  }

  if (!session?.accessToken && (pathname.includes("dashboard") || pathname.includes("/phone"))) {
    return NextResponse.redirect(new URL("/auth/register", req.url));
  }

  if (!!session?.accessToken && !!session.user?.phone && pathname.includes("auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/((?!_next).*)"],
};
