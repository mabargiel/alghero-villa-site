## Context

The Reserve booking flow today is a single-pane modal opened from the hero's `BookingBar`. It composes `AvailabilityCalendar` (2-month `react-day-picker`) with `PriceSummary` (segments, total, deposit, info tooltip). The submit CTA hard-links to the locale-aware `/contact` page, which presents a separate form that re-collects dates, guests, name, email, phone, and message before posting to `/api/contact` (Resend-backed dual email send; no DB, no payment).

Constraints we inherit:
- Stack: Next.js 16 App Router, React 19, Tailwind 4, `react-day-picker` 9, `next-intl` 4 (6 locales: pl, en, it, es, fr, de). No state library; component-local React state only.
- Modal mechanism: native `<dialog>` wrapped by `ModalShell`. Backdrop, dismissal, and focus trap are owned there.
- `/api/contact` is the only path to a submission. It performs server-side validation, rate-limiting (5 req / 10 min / IP), a honeypot check (`website` field), and price calculation via `calculatePriceBreakdown` before sending two emails.
- Calendar dimensions: 2 months side-by-side render at roughly 660×330 CSS px on tablets+. On phones (≤640 px wide) two-month layout already collapses to one month at ~300 px tall.
- Owner: solo product/dev. No A/B-test framework. Validation is qualitative (look at incoming inquiries before vs after).

Stakeholders:
- Property owner — wants more / cleaner inquiries.
- Returning visitors — must find the flow at least as fast as today.
- Search traffic landing on `/contact` directly — `/contact` must keep working as a complete fallback.

## Goals / Non-Goals

**Goals**
- One in-modal flow from "open" to "sent": no page transitions, no re-typing.
- Modal content always fits the viewport — never scrolls. The collapsed-date pattern is the primary lever.
- Pricing details are immediately legible at Stage 2: what's included, what's refundable, where promotions apply.
- Reduce visual weight of Stage 1 to a near-zero-cost preview step that doesn't ask for any PII.
- Preserve `/contact` as a robust fallback for SEO, direct visits, and users who explicitly prefer a full page.

**Non-Goals**
- Online payment, holds, or booking confirmation. The product remains an inquiry funnel.
- Database persistence of inquiries.
- A `/contact` page rewrite beyond mirroring the phone-optional treatment.
- Changes to `BookingBar` (hero trigger) visuals or to `react-day-picker` configuration.
- Real-time availability checks against a calendar source other than the existing Sanity-driven `PricingConfig`.

## Decisions

### D1. Three stages, not two, with the qualification gate at price reveal
*Decision*: Split the flow into `choose-stay → review-pricing → send-inquiry`.

*Why*: A two-stage flow ("dates+guests" → "price+contact form") couples the price reveal with a multi-field commitment. Users who flinch at the price walk away from a half-filled contact form, which is both a lost lead and friction we paid for nothing. Splitting price-reveal into its own beat turns it into a self-qualification gate: users who advance to Stage 3 have already seen and accepted the number. This is the funnel shape used by the major OTAs and is well-trodden for inquiry products.

*Alternatives considered*:
- **Two stages with price on Stage 2 alongside the contact form** — rejected: price-surprise after form commitment causes drop-off.
- **Two stages with live price on Stage 1** — rejected: guest count does not affect price; users WILL try changing guests and see a static number, which reads as a bug.
- **Single panel with all content** — the status quo; the thing we are fixing.

### D2. Collapsed date input that swaps the modal body, not a popover
*Decision*: The Stage 1 date field is a single row reading "Wybierz terminy ▾" (or the selected range). Tapping it replaces the entire modal body with the full 2-month calendar plus a "Potwierdź daty" exit button. Tapping the exit, Esc, the back-arrow, or clicking outside the calendar surface returns to Stage 1 with selection preserved. The range auto-collapses to Stage 1 ~300 ms after `range.to` is set, with a brief highlight on the date input.

*Why*: A popover inside a `<dialog>` is awkward — z-index stacking, focus-trap collisions, and stacking-context bugs across browsers. Swapping the modal body keeps the focus trap intact, gives the calendar the full vertical budget, and preserves the no-scroll guarantee. It also reads as a clean micro-step rather than a floating layer.

*Alternatives considered*:
- **Popover anchored to the input** — rejected for the reasons above.
- **Always-expanded calendar at the top of Stage 1** — rejected: in short viewports (e.g., laptop landscape ~600 px tall), Stage 1 + calendar would overflow, breaking the no-scroll rule.
- **Single-month-only calendar to save space** — rejected: navigating month-by-month is slower than scanning two months at once; the 2-month view is a real product advantage for a 7-night minimum stay.

### D3. No live price on Stage 1
*Decision*: Stage 1 displays only validation state (min-nights warning when applicable). No price preview.

*Why*: Live price + guest input where guests don't affect price = perceived bug. Users will A/B their own input ("Why didn't it change?") and lose trust. Moving price to Stage 2 also lets us preserve the qualification-gate framing of D1.

*Alternatives considered*:
- **Live price with a "Cena niezależnie od liczby gości" hint** — rejected: the hint adds cognitive load and the contradiction still registers.
- **Live price, guests excluded from Stage 1** — rejected: guests is "stay info", not "contact info"; pushing it to Stage 3 misclassifies it.

### D4. Phone becomes optional, both UI and API
*Decision*: The `/api/contact` route stops requiring `phone`. The Stage 3 form and the existing `/contact` page mirror this with a "Telefon (opcjonalnie)" label and no validation error on empty submission. Email becomes the single required contact channel.

*Why*: Phone is a friction field — many users will drop rather than provide one. The owner can still reach inquirers via email; making phone optional widens the funnel. We mirror the change on the `/contact` page to avoid two diverging UX surfaces for the same endpoint.

*Trade-off*: Loses a potentially faster contact path for some leads. Acceptable because email response is the established norm in this product.

*Alternatives considered*:
- **Keep phone required, mark UI as "optional" only visually** — rejected: misleading.
- **Make phone required on `/contact` and optional in the modal** — rejected: two surfaces, one endpoint — splits validation logic and confuses maintenance.

### D5. Message field is included on Stage 3 as optional
*Decision*: Add an optional `<textarea>` to Stage 3 for free-text messages.

*Why*: One optional textarea adds negligible perceived load (users skip what they want to skip). For leads who do type a sentence ("we have a small dog OK?"), the owner gets crucial triage signal in the first email. Net positive on both axes.

*Trade-off*: Slightly more vertical space on Stage 3. Manageable inside the no-scroll budget because Stage 3 has only four fields total.

### D6. Stage 2 CTA wording: "Chcę zarezerwować →"
*Decision*: The Stage 2 advance button reads "Chcę zarezerwować →" (Polish; mirrored across locales).

*Why*: It captures user intent at the moment they've seen and accepted the price. "Wyślij zapytanie" would be misleading because clicking does not yet send anything — it advances to a form. "Dalej" / "Continue" is too neutral; it doesn't reinforce commitment, which is the whole point of this beat.

*Note*: The actual send happens with the Stage 3 button (`Wyślij zapytanie`). This is consistent with how booking flows phrase "Reserve" / "Confirm and pay" — the verb expresses intent, not action.

### D7. State is preserved across back-navigation; close prompts when dirty
*Decision*: Navigating back from any stage preserves all entered values. Closing the modal (✕ or backdrop) without sending prompts a confirmation IF the user has typed into any Stage 3 field; otherwise closes immediately.

*Why*: Re-entry friction is one of the things this overhaul is meant to remove — wiping state on back-nav reintroduces it. The dirty-form close prompt is the smallest possible safety net against accidental data loss without being annoying for casual closers (who didn't fill anything).

*Implementation note*: Modal state lives in `PricingModal` (lifted from current `BookingBar` ownership). State is reset when the modal closes successfully (after send) or after the user confirms close-with-dirty-form.

### D8. Submit reuses `/api/contact` unchanged in shape (other than phone optionality)
*Decision*: Stage 3 POSTs the same payload shape `ContactForm` posts today: `arriveDate, leaveDate, guests, name, email, phone, message, locale, website` (honeypot).

*Why*: Zero backend churn beyond the phone validation relaxation. The existing email templates (`ConfirmationEmail`, `OwnerNotificationEmail`) keep working. Same rate-limit, same honeypot, same dual-send.

*Trade-off*: If we later want a tag distinguishing modal-originated inquiries from `/contact`-originated ones, we'll need to add a `source` field. Capture as a future tweak; not blocking.

### D9. Legend reframes positively: drop the "Booked" swatch
*Decision*: The calendar legend renders two entries: `🟩 dostępne` and `🟧 promocja`. The grey "booked" swatch is removed.

*Why*: Existing day-cell styling already communicates "unavailable" through opacity reduction and disabled affordance; the swatch was redundant and tonally negative. Available days carry a single non-promo tile color (matching the design overhaul on the brand palette).

*Trade-off*: Users new to the calendar may briefly wonder what the greyed dates mean. Acceptable because (a) the disabled-state visual is universally read as "not pickable" and (b) the price summary makes the positive case clearly.

### D10. Cleaning + deposit framing on Stage 2
*Decision*: In Stage 2, the total line is followed by a `✓ Sprzątanie w cenie` confirmation mark. Below the total, in a visually distinct section labeled "Do zapłaty na miejscu (zwrotne)", the refundable deposit is shown as "Kaucja zwrotna: 800 €" with a footnote "Pełna kwota płatna dopiero po potwierdzeniu". The `?`-icon tooltip is removed.

*Why*: The tooltip was hiding load-bearing info (deposit is refundable; cleaning is included). Surfacing it as explicit, sectioned layout makes the price story unambiguous in a single read.

*Trade-off*: A slightly taller Stage 2. Still fits within the no-scroll budget.

## Risks / Trade-offs

- **[Risk] No-scroll guarantee breaks on extreme viewports** (e.g., 320×500 phones in landscape, browser zoom > 150%). → *Mitigation*: explicit min-height check in the modal shell; clamp content to `100dvh - 32px`; in the worst case allow vertical scroll *inside* the calendar swap only, since that's already a temporary fullscreen-like state.
- **[Risk] Collapsed-date pattern is unfamiliar** to users who have used the previous always-visible calendar. → *Mitigation*: the placeholder text "Wybierz terminy" + chevron strongly signals tap-to-open. The selected range shown after selection makes the affordance obvious on subsequent opens. Monitor inquiry volume for a regression in the first week.
- **[Risk] Removing the `?`-tooltip removes a familiar reassurance.** → *Mitigation*: the explicit Stage 2 layout is strictly more informative than the tooltip; the trade is information density for explicit framing.
- **[Risk] Phone-optional reduces a contact channel for the owner.** → *Mitigation*: owner already responds primarily by email; phone is rarely used in practice. Owner-side change is purely additive (they can still call when phone is provided).
- **[Risk] Translation gaps for the new copy** (5 non-Polish locales). → *Mitigation*: Polish is authoritative; English is a careful machine-or-self translation; other locales ship with English fallback for the new keys until professional translation lands. Captured as a tasks.md follow-up.
- **[Trade-off] One extra click vs. the old "modal → /contact page" path.** The /contact page required re-typing dates and guests; the new 3-stage modal does not. Net friction is lower despite the extra click.

## Migration Plan

1. Implement behind the existing route — no flag. The home page renders the new modal once the change ships.
2. `/contact` page UI is updated in the same PR to mirror the phone-optional treatment, so the two surfaces stay consistent.
3. No data migration required (no DB).
4. Preview-deploy review on Vercel before merging to the deploy branch. Spot-check the no-scroll guarantee at: 320×568 (iPhone SE), 390×844 (iPhone 14), 768×1024 (iPad), 1280×800 (laptop), 1920×1080 (desktop), plus a 1366×768 laptop in browser-zoom 125%.
5. Rollback: revert the PR. `/contact` page remains functional regardless of modal state — even if the modal is removed entirely, the inquiry funnel still works.

## Open Questions

- Should successful submission close the modal and surface a global toast, or render a confirmation state inside the modal (mirroring `/contact`'s success screen)? *Lean: in-modal confirmation state, dismissible — keeps the celebratory beat owned by the same surface where the user committed.* Capture in tasks if changed.
- Do we want an inquiry-source tag in the email so the owner can tell "modal" vs "/contact"-originated leads apart? *Lean: not in this change; one-line follow-up if useful.*
- Translation pipeline: ship Polish + English on day one with `en` as fallback for the four other locales' new keys, or block on full translation? *Lean: ship with fallback; landing-page Polish coverage is the priority.*
