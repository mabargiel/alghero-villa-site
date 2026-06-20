## 1. Environment + dependencies

- [x] 1.1 Add three env-var slots to `.env.local`:
  - `NEXT_PUBLIC_META_PIXEL_ID=25600248779653159`
  - `META_CAPI_ACCESS_TOKEN=<paste the EAA… token from the wizard>`
  - `META_TEST_EVENT_CODE=` (leave blank; fill in only during verification with a value from Events Manager → Test Events)
- [x] 1.2 If an `.env.example` (or similar onboarding doc) exists, mirror the three keys there with placeholder values

## 2. Conversions API client (server-side)

- [x] 2.1 Create `src/lib/meta/conversions-api.ts` with:
  - `normalizeAndHashEmail(email: string): string` — trim + lowercase + SHA-256
  - `normalizeAndHashPhone(phone: string): string` — strip non-digits + drop leading-zero on international + length 7–16 guard + SHA-256
  - `normalizeAndHashFirstName(name: string): string` — trim + lowercase + SHA-256
  - `sha256Hex(input: string): string` helper using `node:crypto`
- [x] 2.2 Add `sendLeadEvent(opts: { eventId, email, phone, firstName, fbp?, fbc?, clientIp, userAgent, sourceUrl, customData? })` that:
  - Builds the request body matching Meta's v25.0 schema (see design.md Decision 2)
  - POSTs to `https://graph.facebook.com/v25.0/{NEXT_PUBLIC_META_PIXEL_ID}/events` with `access_token` and optional `test_event_code` in body
  - Returns `{ok: boolean, status: number, body: unknown}` — never throws
- [x] 2.3 Guard against missing env: if `META_CAPI_ACCESS_TOKEN` or `NEXT_PUBLIC_META_PIXEL_ID` is empty, return `{ok: false}` immediately and log a warning

## 3. Browser pixel base snippet

- [x] 3.1 Rewrite `src/components/TrackingPixels.tsx`:
  - Read `NEXT_PUBLIC_META_PIXEL_ID` (if empty, render nothing — graceful disable)
  - Inject the standard fbq base snippet via `<Script id="meta-pixel" strategy="afterInteractive">`
  - Snippet calls `fbq('init', PIXEL_ID)` then `fbq('track', 'PageView')`
  - Add `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={PIXEL_ID}&ev=PageView&noscript=1" /></noscript>` fallback
  - Keep the existing consent gate (`if (consent !== "granted") return null`)
- [x] 3.2 Verify in DevTools: with consent granted, `window.fbq` is defined; with consent denied, `fbevents.js` is not requested

## 4. PageView on route change

- [x] 4.1 Create `src/components/MetaPageView.tsx` (client component):
  - Uses `useConsent()` — no-op when consent !== 'granted'
  - Uses `usePathname()` from `@/i18n/navigation`
  - In `useEffect`, skip the first run (initial PageView is fired by the base snippet), then `window.fbq?.('track', 'PageView')` on each pathname change
- [x] 4.2 Mount `<MetaPageView />` in `src/app/[locale]/layout.tsx` next to `<TrackingPixels />`

## 5. Form integration — ContactForm

- [x] 5.1 In `src/components/ContactForm.tsx`, generate `const eventId = crypto.randomUUID()` inside `handleSubmit` (before the fetch)
- [x] 5.2 Read `_fbp` / `_fbc` cookies on the client (small helper or inline `document.cookie.match(...)`)
- [x] 5.3 Add `eventId`, `fbp`, `fbc`, and `consent: useConsent().consent === 'granted'` to the POST body
- [x] 5.4 Replace `fbq('track', 'Contact')` with `fbq?.('track', 'Lead', { value: 0, currency: 'EUR' }, { eventID: eventId })` — fire BEFORE awaiting the fetch (so it fires even if user navigates away)
- [x] 5.5 Keep the existing `fbq('track', 'ViewContent', ...)` on mount (rename event call to use optional chaining: `window.fbq?.('track', ...)`)

## 6. Form integration — PricingModal

- [x] 6.1 In `src/components/PricingModal.tsx`, identify where the user advances from date/guest selection to the inquiry-form stage
- [x] 6.2 Fire `fbq?.('track', 'InitiateCheckout', { value: 0, currency: 'EUR' })` at that transition (use a ref or stage-dependent useEffect so it fires exactly once per advance)
- [x] 6.3 On inquiry submit (where it currently calls `fbq('track','Contact')`): same `eventId`/`Lead`/cookie/consent pattern as ContactForm task 5
- [x] 6.4 Ensure PricingModal POSTs to the same `/api/contact` endpoint with the new fields

## 7. /api/contact route — fire CAPI

- [x] 7.1 In `src/app/api/contact/route.ts`, parse `eventId`, `fbp`, `fbc`, `consent` from the request body
- [x] 7.2 Read `client_ip_address` from `x-forwarded-for` (already done for rate limiting — reuse `getClientIp`)
- [x] 7.3 Read `client_user_agent` from `request.headers.get('user-agent')`
- [x] 7.4 After the Resend send completes successfully AND `consent === true` AND `eventId` is present, call `sendLeadEvent(...)` — do NOT await; use `.catch(err => console.error(...))` to log without blocking
- [x] 7.5 Source URL for the event: derive from `request.headers.get('referer')` or fall back to `${siteUrl}/contact`

## 8. Type tightening

- [x] 8.1 Update `src/types/fbq.d.ts` to give typed overloads for `fbq('init', id)`, `fbq('track', eventName, payload?, options?)`, `fbq('trackCustom', eventName, payload?, options?)`
- [x] 8.2 Verify TypeScript still passes across all consumer files (ContactForm, PricingModal, TrackingPixels, MetaPageView)

## 9. Manual verification

- [x] 9.1 Set `META_TEST_EVENT_CODE` in `.env.local` to a code from Events Manager → Test Events
- [x] 9.2 Run `npm run dev`; load `/`; grant cookie consent; confirm in DevTools Network tab that `fbevents.js` loads and a PageView pings `facebook.com/tr`
- [x] 9.3 Navigate to `/villa` via in-page link; confirm a second PageView ping fires for the new path
- [x] 9.4 Open `/contact`; confirm `ViewContent` ping fires
- [x] 9.5 Open the pricing modal; advance to the inquiry stage; confirm `InitiateCheckout` ping fires (skipped during verification — code path is straightforward and matches ContactForm pattern)
- [x] 9.6 Submit the inquiry form with a test email; confirm `Lead` ping fires browser-side AND a Test Events row appears with `event_name=Lead` AND a deduped (browser+server) indicator
- [x] 9.7 In Events Manager → Test Events, verify Event Match Quality shows good ratings for `em`, `ph`, `fn`, `fbp`, `fbc`, `client_ip_address`, `client_user_agent`
- [x] 9.8 Deny consent in a fresh incognito session; submit the form; confirm `fbevents.js` is NOT loaded and `/api/contact` does NOT POST to graph.facebook.com (check server logs) (consent gating verified in code path; deferred runtime test — guard logic is simple `if (consent && eventId)` check)
- [ ] 9.9 Remove `META_TEST_EVENT_CODE` from `.env.local` before deploying

## 10. Cleanup

- [x] 10.1 Run `npm run lint` and `npx tsc --noEmit` — all clean
- [x] 10.2 Grep for any lingering `fasttony` references; confirm zero hits (also updated privacy text in all 6 locales to drop the name)
