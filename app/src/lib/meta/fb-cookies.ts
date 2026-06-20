// Read Meta Pixel cookies on the client. Both are first-party cookies written
// by the Pixel base snippet and used by the Conversions API for match quality.

export type FbCookies = {
  fbp?: string;
  fbc?: string;
};

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "=([^;]*)",
    ),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function readFbCookies(): FbCookies {
  return {
    fbp: readCookie("_fbp"),
    fbc: readCookie("_fbc"),
  };
}
