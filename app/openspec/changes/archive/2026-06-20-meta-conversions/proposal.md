## Why

We've cancelled Fasttony (the third-party pixel proxy that previously bootstrapped `window.fbq`) and reconfigured a direct Meta Pixel + Conversions API in Ads Manager. The site is currently in a broken state: `fbq(...)` calls remain in `ContactForm.tsx` and `PricingModal.tsx`, but no script initializes `window.fbq` anymore — every tracking call is a silent no-op. Worse, even when we re-bootstrap the Pixel, browser-only events lose ~20–40% of attribution to iOS ITP and ad-blockers; without server-side events the Meta ad campaign optimizer gets noisy signal and bid efficiency suffers.

We need the proper direct setup: Meta Pixel for browser-side events (PageView, ViewContent, InitiateCheckout, Lead) plus the Conversions API server-side for the Lead conversion, with `event_id`-based deduplication so Meta counts each conversion once.

## What Changes

- **Remove Fasttony.** Replace `TrackingPixels.tsx` with a Meta Pixel component that injects the standard fbq base snippet and inits with our Pixel ID (`25600248779653159`).
- **Track route changes.** Add a small client hook that re-fires `PageView` on Next.js App Router pathname changes (the base snippet only fires on initial mount; client-side navigation otherwise goes untracked).
- **Rename the conversion event.** `fbq('track', 'Contact')` → `fbq('track', 'Lead', …, {eventID})` in `ContactForm.tsx` and `PricingModal.tsx`. Generate a UUID `eventID` per submission and pass it both to the browser `fbq` call and the `/api/contact` request body.
- **Add browser InitiateCheckout event** when `PricingModal` opens (high-intent signal for ad optimization).
- **Wire Conversions API in `/api/contact`.** After the email send succeeds, fire-and-forget a POST to `https://graph.facebook.com/v25.0/{pixel_id}/events` with the same `event_id` so Meta dedupes browser+server. Payload includes SHA-256 hashed email, phone, first name; raw `client_ip_address`, `client_user_agent`, `_fbp` / `_fbc` cookie values; and `custom_data` with guest count and stay dates.
- **Keep consent gating.** The existing `ConsentProvider` already gates `TrackingPixels`; the new component preserves that behavior. CAPI server-side events also only fire when the request indicates consent (we'll pass a `consentGranted` flag from the form).
- **New environment variables.** `NEXT_PUBLIC_META_PIXEL_ID` (browser), `META_CAPI_ACCESS_TOKEN` (server secret), optional `META_TEST_EVENT_CODE` (for Test Events tool during setup).

## Capabilities

### New Capabilities

- `meta-tracking`: Meta Pixel and Conversions API integration — browser pixel boots with the configured Pixel ID under consent, fires `PageView` on every route change and `ViewContent`/`InitiateCheckout`/`Lead` events at the right user interactions; the `/api/contact` route mirrors the `Lead` event to the Conversions API with matching `event_id` for deduplication; PII is SHA-256 hashed per Meta's normalization rules before transmission.

### Modified Capabilities

<!-- None — no existing tracking spec; Fasttony was implemented without one. -->

## Impact

- **Code:**
  - `src/components/TrackingPixels.tsx` — full rewrite: Meta Pixel base snippet + init + initial PageView + `<noscript>` fallback `<img>`.
  - **New:** `src/components/MetaPageView.tsx` — client hook firing `fbq('track','PageView')` on `usePathname()` change.
  - `src/components/ContactForm.tsx` — generate `eventID`, fire `fbq('track','Lead', {...}, {eventID})`, POST `eventID` + `_fbp`/`_fbc` cookies + `consent` flag to `/api/contact`.
  - `src/components/PricingModal.tsx` — fire `fbq('track','InitiateCheckout')` when the inquiry stage opens; rename submit event from `Contact` to `Lead` and follow the same `eventID` pattern.
  - **New:** `src/lib/meta/conversions-api.ts` — server-side CAPI client (normalize, hash, POST). Self-contained, no SDK dependency.
  - `src/app/api/contact/route.ts` — after Resend send succeeds, fire-and-forget call to the CAPI client. Failures logged but never break the user flow.
  - `src/types/fbq.d.ts` — tighten the `fbq` type signature (today it's `(...args: unknown[]) => void`; we can give it a discriminated overload for `init` / `track` / `trackCustom`).
- **Translations:** none.
- **Environment variables:** `.env.example` (or equivalent doc) gets three new entries.
- **Dependencies:** none added — we use native `fetch` and `crypto.subtle.digest`/`node:crypto` for SHA-256. Meta's Node SDK (`facebook-nodejs-business-sdk`) would work but adds ~MB of bundle and Flow types we don't want; the API surface we need is small.
- **User-visible behavior:** none. Tracking is invisible to users by design.
- **Privacy:** PII (email, phone, first name) is hashed with SHA-256 client-of-Meta before transmission; raw values never leave our server. Cookie consent gates both browser and server events. No new data is collected from users beyond what the form already gathers.
- **Breaking:** none.
