import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

const PUBLIC_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/under-construction",
]);

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  return PUBLIC_PATHS.has(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!IS_PRODUCTION) {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/under-construction";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
