import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const USERNAME = process.env.SITE_USERNAME || "";
const PASSWORD = process.env.SITE_PASSWORD || "";

const PUBLIC_PATHS = new Set([
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
]);

function isPublicPath(pathname: string) {
  if (pathname.startsWith("/_next")) return true;
  return PUBLIC_PATHS.has(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!USERNAME || !PASSWORD) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const [type, encoded] = authHeader.split(" ");
    if (type === "Basic" && encoded) {
      try {
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(":");
        if (user === USERNAME && pass === PASSWORD) {
          return NextResponse.next();
        }
      } catch {
        // ignore malformed auth header
      }
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected"',
    },
  });
}

export const config = {
  matcher: ["/((?!api/contact).*)"],
};
