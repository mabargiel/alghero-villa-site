// Meta Pixel global. The base snippet in src/components/TrackingPixels.tsx
// installs `window.fbq`. These overloads cover the calls we actually make.

type FbqStandardEvent =
  | "PageView"
  | "ViewContent"
  | "Lead"
  | "Contact"
  | "InitiateCheckout"
  | "Search"
  | "AddToCart"
  | "Purchase"
  | "CompleteRegistration"
  | "Subscribe";

type FbqEventOptions = {
  eventID?: string;
};

interface Fbq {
  (cmd: "init", pixelId: string): void;
  (
    cmd: "track",
    event: FbqStandardEvent,
    params?: Record<string, unknown>,
    options?: FbqEventOptions,
  ): void;
  (
    cmd: "trackCustom",
    event: string,
    params?: Record<string, unknown>,
    options?: FbqEventOptions,
  ): void;
  (cmd: "consent", action: "grant" | "revoke"): void;
}

declare const fbq: Fbq;

interface Window {
  fbq?: Fbq;
}
