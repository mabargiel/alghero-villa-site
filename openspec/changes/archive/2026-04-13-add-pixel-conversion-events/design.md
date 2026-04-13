## Context

The FastTony pixel script (`pixel.fasttony.com/...`) is loaded via `TrackingPixels.tsx` when cookie consent is granted. It injects the standard Facebook Pixel `fbq()` global function. Currently only the automatic `PageView` event fires. The contact form lives in `ContactForm.tsx` — a client component with a clear `idle → sending → success/error` state machine.

## Goals / Non-Goals

**Goals:**
- Track when users view the contact page (`ViewContent` event)
- Track when users successfully submit the contact form (`Contact` event)
- Respect existing cookie consent — no events fire without consent

**Non-Goals:**
- Server-side event tracking (Conversions API) — out of scope for now
- Tracking other pages or interactions beyond the contact funnel
- Custom event parameters beyond `content_name`

## Decisions

### 1. Fire both events from `ContactForm.tsx`

**Decision**: Place both `fbq()` calls in `ContactForm.tsx` rather than splitting across the page and form components.

**Rationale**: `ContactForm.tsx` is already a client component, always rendered on `/contact`, and owns the form state machine. The contact page itself is a server component — adding a page-view event there would require a new client component just for one `useEffect`. Keeping everything in one file is simpler.

**Alternative considered**: Dedicated `usePixelEvent` hook or a separate `PixelTracker` component. Rejected as over-engineering for two calls.

### 2. Guard with `typeof window.fbq !== 'undefined'`

**Decision**: Check for `fbq` existence before calling, rather than importing or tracking consent state.

**Rationale**: If consent was not granted, the pixel script never loads, so `fbq` doesn't exist. This is a simple, reliable guard that doesn't couple the form to the consent system. No need to import `useConsent` or add a dependency.

### 3. Use standard Facebook events, not custom events

**Decision**: Use `fbq('track', 'ViewContent')` and `fbq('track', 'Contact')` — both are standard Meta events.

**Rationale**: Standard events are recognized by Meta's ad optimization algorithm. Custom events (`trackCustom`) require manual configuration in Events Manager and don't benefit from automatic optimization.

### 4. TypeScript global declaration

**Decision**: Declare `fbq` on the `Window` interface via a `.d.ts` file.

**Rationale**: Avoids `// @ts-ignore` comments and gives basic type safety. A minimal declaration (`(...args: unknown[]) => void`) is sufficient — no need for a full Facebook Pixel type package.

## Risks / Trade-offs

- **[Race condition]** If the pixel script hasn't finished loading when `ContactForm` mounts, the `ViewContent` event may be missed. → Acceptable: the pixel loads `afterInteractive` and the user will spend time filling the form, so the `Contact` event (the important one) will fire reliably.
- **[Duplicate ViewContent]** If the user navigates away and back to `/contact`, the event fires again. → Acceptable: Meta deduplicates and this is standard behavior for SPAs.
