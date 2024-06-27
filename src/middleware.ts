import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Negotiator from "negotiator";
import cookie from "cookie";

const LOCALES: string[] = [
  "en",
  "de",
  "es",
  "pt",
  "sv",
  "ru",
  "fr",
  "he",
  "hi",
  "ko",
  "ja",
  "th",
  "tr",
  "bn",
  "vi",
  "mn",
];
const DEFAULT_LOCALE: string = "en";
const AUTH_SECRET: string | undefined = process.env.NEXTAUTH_SECRET;

interface ParsedCookies {
  [key: string]: string;
}

const getLocaleFromCookies = (cookies: ParsedCookies): string | null => {
  return cookies.lang && LOCALES.includes(cookies.lang) ? cookies.lang : null;
};

const getLocaleFromNegotiation = (acceptLanguageHeader: string | null): string => {
  const negotiator = new Negotiator({ headers: { "accept-language": acceptLanguageHeader || "" } });
  const languages = negotiator.languages();
  const bestMatch = languages.find((lang) => LOCALES.includes(lang.split("-")[0]));
  return bestMatch ? bestMatch.split("-")[0] : DEFAULT_LOCALE;
};

const getLocale = (request: NextRequest): string => {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  return getLocaleFromCookies(cookies) || getLocaleFromNegotiation(request.headers.get("accept-language"));
};

const isStaticFile = (pathname: string): boolean => {
  return pathname.includes(".") && !pathname.startsWith("/api");
};

const isApiRequest = (pathname: string): boolean => {
  return pathname.startsWith("/api");
};

const isPathnameLocalePrefixed = (pathname: string): boolean => {
  return LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
};

const handleLocaleRedirection = (req: NextRequest, pathname: string): NextResponse | null => {
  if (!isPathnameLocalePrefixed(pathname)) {
    const locale = getLocale(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(req.nextUrl);
  }
  return null;
};

const handleAuthRedirection = (session: any, pathname: string, reqUrl: string, locale: string): NextResponse | null => {
  // Landing path
  if ([`/${locale}/`].includes(pathname)) {
    return null;
  }

  const publicRoutes = [`/${locale}/login/`, `/${locale}/register/`, `/${locale}/forgotpass/`];

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session?.accessToken && isPublicRoute) {
    return null;
  }

  if (!session?.accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/login`, reqUrl));
  }

  if (session?.accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, reqUrl));
  }

  return null;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isStaticFile(pathname) || isApiRequest(pathname)) {
    return NextResponse.next();
  }

  const localeRedirection = handleLocaleRedirection(req, pathname);
  if (localeRedirection) {
    return localeRedirection;
  }

  const locale = getLocale(req);
  const session = await getToken({ req, secret: AUTH_SECRET });

  const authRedirection = handleAuthRedirection(session, pathname, req.url, locale);
  if (authRedirection) {
    return authRedirection;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
