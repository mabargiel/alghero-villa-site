## Why

The owner reports losing prospective customers because the Reserve booking modal is hard to parse: pricing detail is cramped, the meaning of the refundable deposit and the included cleaning fee is unclear, the legend frames the calendar negatively ("Booked" in grey), and the CTA bounces users to `/contact` where they re-enter every field. Each of those is friction. The current single-pane modal also relies on overflow scrolling on smaller viewports, hiding the price and CTA below the fold.

This change reshapes the modal into a clear, in-modal 3-stage flow — *choose stay → review pricing → send inquiry* — that submits directly and never scrolls. The qualification step (price reveal) sits between selection and contact-info entry, mirroring the pattern established by Booking.com and Airbnb: show value before asking for commitment.

## What Changes

- **3-stage in-modal flow** replaces the current single-pane modal:
  - **Stage 1 — Choose stay**: collapsed-date input + guest count input (1–12). Calendar is hidden behind a single-row field that, when tapped, swaps the modal body for the full 2-month calendar (with a "Potwierdź daty" exit button). No live price.
  - **Stage 2 — Review pricing**: full breakdown — segments with promotion math (strikethrough originals, badge, dates each promo covers), total, "✓ Sprzątanie w cenie" mark, refundable deposit shown in its own "Do zapłaty na miejscu" section.
  - **Stage 3 — Send inquiry**: name (required), email (required), phone (optional), message (optional). Submits inline via existing `POST /api/contact`.
- **No-scroll guarantee** — modal content fits the viewport on every supported size. The collapsed-date pattern is the primary enabler.
- **Positive legend** — show `🟩 dostępne` + `🟧 promocja`. Drop the grey "Booked" swatch entirely.
- **State preservation** across back-navigation between stages; closing the modal with a dirty Stage-3 form prompts confirmation.
- **Submit moves into the modal** — the modal CTA no longer links to `/contact`. The `/contact` page stays as a fallback (SEO, direct visits, deep-linkers).
- **Phone becomes optional** at both the UI and the `/api/contact` validation layer. **BREAKING (API contract)**: requests with empty `phone` now pass validation. `/contact` page UI is updated to match (label becomes "Telefon (opcjonalnie)").
- **Cleanup**:
  - Remove the "min. 7 nocy · max. 12 osób" info row under the legend (info migrates into Stage 1 constraints + min-nights validation message).
  - Delete dead CSS classes `.pricing-tier-low`, `.pricing-tier-mid`, `.pricing-tier-high` in `globals.css` (no TSX references).
  - Remove the `?`-icon info tooltip on the total (its content is now explicit in Stage 2's layout).
- **Out of scope**: payment, DB persistence, `/contact` page rewrite beyond the phone-optional label, BookingBar (hero trigger) visuals, calendar internals (`react-day-picker` config unchanged).

## Capabilities

### New Capabilities
*(none — the surface is already covered by existing capabilities)*

### Modified Capabilities
- `pricing-modal`: major reshape — modal becomes a 3-stage flow, gains stage progression / back-nav / state preservation requirements, replaces the `/contact` CTA with inline submission, replaces the `?`-tooltip with explicit Stage 2 layout, adds the no-scroll guarantee.
- `pricing-calendar`: legend reframes positively ("Dostępne" + "Promocja"; no "Booked" swatch); the constraints info row ("od X€/noc · min. 7 nocy · max. 12 osób") is removed in favor of in-Stage-1 input constraints and a min-nights validation message; calendar gains a "collapsed input that expands to full calendar" presentation requirement when hosted inside the pricing modal.
- `contact-form`: API route relaxes phone validation — `phone` becomes optional in the `/api/contact` request body; the on-page `/contact` form mirrors the optional treatment.

## Impact

**Code**:
- `app/src/components/PricingModal.tsx` — rewritten as a stateful 3-stage container.
- `app/src/components/AvailabilityCalendar.tsx` — refactored; legend simplified, constraints row removed, integrates with collapsed-input host.
- `app/src/components/PriceSummary.tsx` — restructured for Stage 2 layout (deposit section, cleaning checkmark, segment-level promo display); tooltip removed.
- `app/src/components/BookingBar.tsx` — visuals unchanged; trigger contract verified.
- New components: `CollapsedDateInput`, `GuestCountInput`, `InquiryForm`, `StageProgress` (names indicative).
- `app/src/app/api/contact/route.ts` — phone validation relaxed.
- `app/src/app/[locale]/contact/page.tsx` / `ContactForm.tsx` — phone label/optional treatment mirrored.
- `app/src/app/globals.css` — remove dead `.pricing-tier-{low,mid,high}` blocks.

**Translations**:
- `app/messages/pl.json` — new keys for stage titles, progress aria-labels, collapsed-date placeholder, Stage 2 section labels ("Do zapłaty na miejscu", "Pełna kwota płatna dopiero po potwierdzeniu"), Stage 3 field labels, error messages.
- Mirror new keys to `en.json`, `it.json`, `es.json`, `fr.json`, `de.json`. Non-Polish strings may ship as placeholder English if professional translation is pending — captured in tasks.

**APIs**: `POST /api/contact` request schema accepts empty/missing `phone`.

**Dependencies**: no new packages.

**Risk**: the 3-stage redesign is a high-visibility change on the home page conversion path. Recommend deploying behind preview review before merging to production.
