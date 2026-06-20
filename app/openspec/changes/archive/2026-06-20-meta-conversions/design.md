## Context

The site already had a Pixel-style integration via Fasttony, but that's been cancelled. Calls to `window.fbq(...)` remain in `ContactForm.tsx` and `PricingModal.tsx` but go nowhere — the global is undefined. We need to replace the Fasttony bootstrap with a direct Meta Pixel and add Conversions API server-side for reliable conversion attribution.

Meta's tracking has two halves: the browser Pixel (`fbevents.js`) for behavioral signals and audience building, and the Conversions API (`graph.facebook.com/v25.0/{pixel_id}/events`) for server-side conversion events that survive ad-blockers and iOS ITP. Best practice is to fire both for the Lead event with a matching `event_id` so Meta dedupes them — otherwise the same submission gets counted twice and ad attribution skews.

Schema and normalization rules were verified against the live Meta Node SDK source (`facebook/facebook-nodejs-business-sdk`, version 25.0.2 — referenced as the authoritative implementation rather than the SPA-rendered docs which proved hard to extract). The interactive payload helper at https://developers.facebook.com/docs/marketing-api/facebook-pixel/server-side-api/payload-helper/ is a useful sanity-check tool when debugging match quality issues in Events Manager.

## Goals / Non-Goals

**Goals:**

- Replace Fasttony with a Meta Pixel that initializes on every page under cookie consent.
- Fire the correct Meta standard events (`PageView`, `ViewContent`, `InitiateCheckout`, `Lead`) at the right user interactions.
- Mirror the `Lead` event server-side via the Conversions API with `event_id` deduplication.
- Hash PII per Meta's normalization rules so Event Match Quality is high.
- Keep tracking failures invisible — a misconfigured pixel or down CAPI endpoint must never block a form submission.

**Non-Goals:**

- Adding `Purchase` / e-commerce events. The site doesn't have a paid checkout flow; inquiry is the conversion.
- Tracking villa/location _content views_ with rich metadata (we'll fire generic `ViewContent` but not parameterize by villa room / beach / etc.).
- Server-side `PageView`. `PageView` via CAPI is noisy and not recommended for low-volume sites; the browser pixel handles it.
- Cross-device user stitching via `external_id`. We have no user accounts.
- Adding the Meta Node SDK as a dependency. Our usage is small (one POST endpoint, one event shape) — a hand-rolled client is leaner and avoids Flow types.

## Decisions

### Decision 1: Hand-rolled CAPI client, not the official Node SDK

A 100-line `src/lib/meta/conversions-api.ts` with normalize, hash, and POST. No new package.

**Why:** the Meta Node SDK (`facebook-nodejs-business-sdk`) is generated from internal protobufs, ships with Flow types, weighs ~MB unpacked, and exposes hundreds of Ads-API classes we don't need. Our surface area is one POST per form submission to one endpoint with one event shape. Reimplementing the hash + normalize + POST is shorter than configuring the SDK to do just that. We _cross-reference_ the SDK source for canonical rules but don't import it.

**Alternatives considered:**

- `facebook-nodejs-business-sdk` — heavy.
- A community wrapper — drops the cross-check value of consulting Meta's own source.

### Decision 2: Verified-from-source schema, not from docs

API version: **v25.0**. Endpoint: `POST https://graph.facebook.com/v25.0/{pixel_id}/events`. Auth: `access_token` in the **request body** (not Authorization header).

| Aspect                          | What Meta's SDK does (verified)                                                                                       |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| API version                     | `v25.0` (Node SDK 25.0.2, `src/api.js` static `VERSION`)                                                              |
| Endpoint                        | `https://graph.facebook.com/v25.0/{pixel_id}/events`                                                                  |
| Auth                            | `access_token` as a form/body parameter                                                                               |
| Hashing                         | SHA-256 of `trim().toLowerCase()`; skip re-hashing if input already matches SHA-256 hex pattern                       |
| Phone normalization             | Strip non-digits, drop leading zeros for international numbers, length must be 7–16. **No `+` prefix** before hashing |
| Email normalization             | Lowercase + trim. Optional validate format                                                                            |
| First name normalization        | Lowercase + trim (no further changes)                                                                                 |
| Raw-not-hashed user_data fields | `client_ip_address`, `client_user_agent`, `fbp`, `fbc`, `external_id` (optional), `lead_id`, `subscription_id`        |
| Hashed user_data field keys     | `em` (email), `ph` (phone), `fn` (first name), `ln`, `ge`, `db`, `ct`, `st`, `zp`, `country`                          |
| Per-event required fields       | `event_name`, `event_time` (unix seconds), `action_source` (`"website"` for our case)                                 |
| Dedup fields                    | `event_id` (must match the browser `fbq` event id) + `event_name`                                                     |
| Request body shape              | `{data: [serverEvent], access_token, partner_agent?, test_event_code?}`                                               |

**Why this matters:** my training cutoff is January 2026 and my initial guesses were wrong on three points (API version `v23` → `v25`, auth as Bearer header → body param, phone with `+` prefix → no `+`). Documenting the verified source here so the next person updating this doesn't re-introduce stale guesses.

### Decision 3: `event_id` is generated client-side and passed to both Pixel and CAPI

Client generates `crypto.randomUUID()` per Lead submission. Pixel fires `fbq('track', 'Lead', payload, {eventID: id})`. POST body to `/api/contact` includes `eventID: id`. The route hands that id to the CAPI client, which uses it as `event_id` in the server event.

**Why client-generated:** the browser must fire the Pixel event _before_ the form submit completes (otherwise the user might navigate away). If the server generated the id and returned it, we'd be waiting on the round-trip before firing the Pixel — too late.

**Match window:** Meta dedupes within 48 hours when `event_name` + `event_id` are identical. The server event can arrive seconds or minutes after the browser event — the server fires after Resend's email send completes, which is normally <1s but could be 30s on a Resend hiccup. Well within the window.

### Decision 4: Tracking is fire-and-forget — never blocks the form

The `/api/contact` route returns success as soon as the Resend email send is queued. The CAPI POST happens _after_ the response is sent (or in parallel without `await` on its rejection). A 4xx or 5xx from Meta does not turn the user-facing form into an error.

**Why:** the existing UX promises the user "we got your inquiry" on form success. If Meta's API has a hiccup or our access token rotates, the user shouldn't see "error sending message." Tracking is internal infrastructure; user-visible flow is sacred.

**Logging:** CAPI failures are logged to `console.error` (or whatever observability we plug in later) with the response body. Silent failures would let attribution rot without us noticing — observability without blocking is the balance.

### Decision 5: PageView on route change via a small client component, not in TrackingPixels itself

`TrackingPixels` is server-rendered at the layout level and injects the snippet once. The Pixel base snippet auto-fires `PageView` on initial load. But Next.js App Router does client-side navigation — `usePathname()` changes without a full reload, and the Pixel doesn't know to re-fire PageView. A separate `<MetaPageView />` client component reads `usePathname()` in a `useEffect` and calls `fbq('track','PageView')` on every change _after_ the first.

**Why split:** keeping the base-snippet injection separate from the route-change tracker means the snippet can stay server-rendered (faster first PageView), and the route hook is a small client island.

**Consent gating:** `MetaPageView` reads the same `useConsent()` and no-ops when consent isn't granted, mirroring `TrackingPixels`.

### Decision 6: Consent gating cascades to CAPI

The browser Pixel is consent-gated today (existing `TrackingPixels` no-ops without consent). We extend the same logic to CAPI: the form posts a `consent: boolean` field to `/api/contact`. The route only calls the CAPI client when consent is `true`. Without consent, the form still works (Resend still sends the email), tracking just doesn't fire on either side.

**Why:** doing CAPI without consent would defeat the cookie banner — server-side tracking is still tracking. Symmetry between client and server is the privacy-correct posture.

### Decision 7: `_fbp` and `_fbc` cookies are forwarded raw from browser to server

The Pixel writes `_fbp` (browser ID) and `_fbc` (click ID) cookies. Both are _first-party_ cookies on our domain, so the server's `Cookie` header on the `/api/contact` request includes them. The CAPI route reads them out of the request cookies and forwards them as `user_data.fbp` / `user_data.fbc`. They're not hashed (raw tokens, not PII).

**Why this matters:** `fbc` carries the `fbclid` click ID that came from an ad — it's the single strongest signal Meta has for attributing the conversion to a specific ad creative. Forwarding it via CAPI dramatically improves match quality (often +20-30% in EMQ).

## Risks / Trade-offs

- **Pixel ID is `NEXT_PUBLIC_*`, so it ships in the client bundle.** This is correct — the Pixel ID is meant to be public, it's the same ID embedded in `fbq('init', X)`. The _access token_ is the secret and stays server-only.
- **Token rotation will silently break CAPI.** If you rotate the access token in Events Manager but forget to update `META_CAPI_ACCESS_TOKEN` in your env, the user-visible form still works, but Meta starts rejecting our events. Mitigation: log all CAPI 4xx responses; periodically eyeball Events Manager → Test Events. Worth wiring a Slack alert later if it becomes a real problem.
- **`event_id` collision risk:** `crypto.randomUUID()` is RFC4122 v4. Collision probability is effectively zero for our volume. No mitigation needed.
- **Test event code is environment-scoped — never set it in production.** If `META_TEST_EVENT_CODE` is set in prod env, conversions will show in the Test Events tab but **not flow into ad campaign optimization**. Mitigation: only set the var in `.env.local` during initial setup; remove from local once verified; never add to Vercel prod env.
- **Bundle weight for the Meta Pixel snippet:** `fbevents.js` is ~50KB gzipped, loaded async from `connect.facebook.net`. Existing Fasttony script was similar. Net change: roughly even.
- **The `<noscript>` `<img>` fallback fires unconditionally** when JS is disabled — including when consent is not granted (since the consent state lives in JS). For a site with cookie consent obligation under GDPR, this is technically a minor leak. Mitigation: accept it — the consent population using `<noscript>` browsers on a JS-heavy Next.js site is essentially nil, and the `<noscript>` image is a single GET request with no user data attached. If we ever do a deeper privacy audit, we can drop the `<noscript>` fallback entirely.
- **Phone normalization differs from libphonenumber.** Meta wants digits-only with leading-zero stripped; libphonenumber produces E.164 with `+`. If the form ever validates phones via libphonenumber and stores E.164, we'll need to strip the `+` before hashing. Current form doesn't validate phone format at all, so this is moot — but worth noting if we add validation.

## Migration Plan

Single commit, no data migration:

1. Add env vars: `NEXT_PUBLIC_META_PIXEL_ID=25600248779653159`, `META_CAPI_ACCESS_TOKEN=<token>`, optional `META_TEST_EVENT_CODE=<code>` for verification.
2. Replace `TrackingPixels.tsx` with the Meta Pixel snippet (init + initial PageView + `<noscript>` fallback). Keep consent gating.
3. Add `MetaPageView.tsx` and wire it into the root layout (sibling of `TrackingPixels`).
4. Add `src/lib/meta/conversions-api.ts` with the hand-rolled client (hash + normalize + POST).
5. Update `ContactForm.tsx`:
   - Generate `eventID = crypto.randomUUID()` at submit time.
   - Replace `fbq('track', 'Contact')` with `fbq('track', 'Lead', { value: 0, currency: 'EUR' }, { eventID })`.
   - POST `eventID`, `consent` (from `useConsent`), and other form data to `/api/contact`.
6. Update `PricingModal.tsx`:
   - Add `fbq('track', 'InitiateCheckout', { value: 0, currency: 'EUR' })` when the inquiry stage opens.
   - Same `eventID` + `Lead` swap on submit.
7. Update `/api/contact/route.ts` to call the CAPI client after Resend send; never block on its result; log failures.
8. Tighten `src/types/fbq.d.ts` to give `fbq` typed overloads (optional polish).

Verification: drop `META_TEST_EVENT_CODE` into `.env.local`, submit a test inquiry, watch the event arrive in Events Manager → Test Events with both `browser` and `server` rows for the same `event_id` (dedupe ✓). Then unset the test code.

Rollback: revert the commit. No state migration. Note: an `_fbp` cookie written during testing persists in the user's browser; this is harmless — Pixel cookies are domain-scoped and not user-identifying on their own.

## Open Questions

- **Should we attempt to estimate a `value` for the `Lead` event?** Currently I'll pass `value: 0, currency: 'EUR'`. We could pass an estimated booking value derived from `guests * nights * average_nightly_rate` to drive value-based campaign optimization. This is a meaningful uplift for ad bidding _if_ we trust the estimate. Deferring — current goal is just to get conversion counts right.
- **Should `InitiateCheckout` fire when the pricing modal opens, or when the user advances to the inquiry stage?** Going with "when the inquiry stage opens" since "modal opened" includes price-curious visitors who never intend to inquire. This is a judgement call and easy to revisit.
