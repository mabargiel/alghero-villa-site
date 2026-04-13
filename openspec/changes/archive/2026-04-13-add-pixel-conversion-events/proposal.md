## Why

The FastTony (Facebook) pixel is already loaded on the site, but it only fires the default `PageView` event. Without conversion events, we cannot measure how many visitors reach the contact page or submit an inquiry — making it impossible to optimize ad spend or build retargeting audiences.

## What Changes

- Fire `fbq('track', 'ViewContent', { content_name: 'Contact Page' })` when the contact page mounts — tracks intent to reach out.
- Fire `fbq('track', 'Contact')` when the contact form is successfully submitted — tracks completed conversions.
- Both events are naturally consent-gated: the pixel (and `fbq` global) only exists when cookie consent is granted.

## Capabilities

### New Capabilities

- `pixel-conversion-events`: Facebook Pixel conversion event tracking for contact page view and form submission.

### Modified Capabilities

_None — no existing spec-level requirements change. The cookie-consent and contact-form specs remain as-is._

## Impact

- **Code**: `app/src/components/ContactForm.tsx` — add two `fbq()` calls (one in a `useEffect`, one in the submit-success path).
- **TypeScript**: A global type declaration for `fbq` to satisfy the compiler.
- **Dependencies**: None — `fbq` is injected by the already-loaded FastTony pixel script.
- **APIs / systems**: No backend changes. Events flow through the existing Facebook Pixel pipeline.
