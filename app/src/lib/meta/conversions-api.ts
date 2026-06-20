import { createHash } from "node:crypto";

const GRAPH_API_VERSION = "v25.0";
const GRAPH_ENDPOINT = "https://graph.facebook.com";

function sha256Hex(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

const SHA256_HEX_RE = /^[a-f0-9]{64}$/;

function isAlreadyHashed(value: string): boolean {
  return SHA256_HEX_RE.test(value);
}

export function normalizeAndHashEmail(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return null;
  if (isAlreadyHashed(normalized)) return normalized;
  return sha256Hex(normalized);
}

export function normalizeAndHashPhone(phone: string): string | null {
  let digits = phone.replace(/\D/g, "");
  // International numbers (anything not starting with single zero / two-digit
  // country code logic varies, but Meta's SDK drops leading zeros once the
  // number is in international form). We treat any 10+ digit number as
  // international here and drop leading zeros.
  if (digits.length >= 10) {
    digits = digits.replace(/^0+/, "");
  }
  if (digits.length < 7 || digits.length > 16) return null;
  if (isAlreadyHashed(digits)) return digits;
  return sha256Hex(digits);
}

export function normalizeAndHashFirstName(name: string): string | null {
  const normalized = name.trim().toLowerCase();
  if (!normalized) return null;
  if (isAlreadyHashed(normalized)) return normalized;
  return sha256Hex(normalized);
}

type SendLeadEventOpts = {
  eventId: string;
  email: string;
  phone?: string;
  firstName?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
  sourceUrl: string;
  customData?: Record<string, string | number | boolean>;
};

type CapiResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

export async function sendLeadEvent(
  opts: SendLeadEventOpts,
): Promise<CapiResult> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    console.warn(
      "[meta-capi] Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN; skipping CAPI send",
    );
    return { ok: false, status: 0, body: null };
  }

  const userData: Record<string, string | undefined> = {};
  const emailHash = normalizeAndHashEmail(opts.email);
  if (emailHash) userData.em = emailHash;
  if (opts.phone) {
    const phoneHash = normalizeAndHashPhone(opts.phone);
    if (phoneHash) userData.ph = phoneHash;
  }
  if (opts.firstName) {
    const fnHash = normalizeAndHashFirstName(opts.firstName);
    if (fnHash) userData.fn = fnHash;
  }
  if (opts.fbp) userData.fbp = opts.fbp;
  if (opts.fbc) userData.fbc = opts.fbc;
  if (opts.clientIp) userData.client_ip_address = opts.clientIp;
  if (opts.userAgent) userData.client_user_agent = opts.userAgent;

  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: opts.eventId,
    action_source: "website",
    event_source_url: opts.sourceUrl,
    user_data: userData,
    ...(opts.customData ? { custom_data: opts.customData } : {}),
  };

  const body: Record<string, unknown> = {
    data: [event],
    access_token: accessToken,
  };
  if (testEventCode) {
    body.test_event_code = testEventCode;
  }

  const url = `${GRAPH_ENDPOINT}/${GRAPH_API_VERSION}/${pixelId}/events`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const responseBody = await response.json().catch(() => null);
    if (!response.ok) {
      console.error(
        `[meta-capi] Lead event failed: ${response.status}`,
        responseBody,
      );
    }
    return { ok: response.ok, status: response.status, body: responseBody };
  } catch (error) {
    console.error("[meta-capi] Lead event network error", error);
    return { ok: false, status: 0, body: error };
  }
}
