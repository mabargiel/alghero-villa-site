## 1. Translation keys (foundation)

- [x] 1.1 Add Polish keys to `app/messages/pl.json` under `pricing`: stage titles (`stageChoose`, `stageReview`, `stageInquiry`), progress aria-label (`stepLabel`), collapsed-date placeholder (`selectDatesPlaceholder`), expanded-calendar exit (`confirmDates`), back-arrow aria (`back`), guest-input label and helper (`guestsLabel`, `guestsHelper`, `guestsErrorRange`), Stage 1 advance CTA (`seePrice`), Stage 2 stay header format (`stayHeader`), Stage 2 "Razem za pobyt" (`stayTotal`), cleaning checkmark (`cleaningIncluded`), on-site refundable section heading (`onSiteRefundable`), deposit line label (`depositLabel`), footnote (`paymentFootnote`), Stage 2 advance CTA (`iWantToReserve`), Stage 3 field labels (`nameLabel`, `emailLabel`, `phoneLabelOptional`, `messageLabelOptional`), Stage 3 submit CTA (`sendInquiry`), submit-pending state (`sending`), API error inline message (`submitError`), confirmation thank-you (`thankYouTitle`, `thankYouBody`, `thankYouClose`), close-confirmation prompt (`closeDirtyPrompt`, `closeDirtyDiscard`, `closeDirtyKeep`).
- [x] 1.2 Add English translations of all 1.1 keys to `app/messages/en.json`.
- [x] 1.3 Add placeholder translations (English fallback acceptable) for all 1.1 keys to `app/messages/it.json`, `app/messages/es.json`, `app/messages/fr.json`, `app/messages/de.json`. (Note: I translated rather than fallback — strings are short and the patterns from existing keys carried over.)
- [x] 1.4 Removed obsolete keys (`nightlyRate`, `minNights`, `maxGuests`, `tooltipLabel`, `tooltipCleaningFee`, `tooltipDepositNote`, `askAbout`, `booked`, `tierLow/Mid/High`, `cleaning`, `included`, `summary`, `total`, `checkPrice`, `deposit`) in all 6 locales. Updated `contact.phone` to "(optional)" suffix in all 6 locales. Code references will be removed in groups 2/5 (currently localized to `AvailabilityCalendar.tsx` and `PriceSummary.tsx` which are being rewritten).

## 2. Calendar collapse pattern

- [x] 2.1 Extract a `CollapsedDateInput` component (`app/src/components/CollapsedDateInput.tsx`) that takes `range: DateRange | undefined`, an `onExpand` callback, and renders a single-row button with placeholder or selected-range summary (`"12 Mar – 26 Mar · 14 nocy"`). Locale and pluralization use `useFormatter`/`useTranslations`. Keyboard activation (Enter, Space) and click both fire `onExpand`.
- [x] 2.2 Refactor `AvailabilityCalendar.tsx` so it exposes only the expanded calendar surface (2-month grid + legend + an explicit "Potwierdź daty" / `confirmDates` exit button passed by prop or composed via children). Remove the constraints info row paragraph. Update the legend to two entries: `dostępne` swatch + `promocja` swatch — drop the booked swatch and CSS for it.
- [x] 2.3 Wire auto-collapse on range completion: after `range.to` is set, call `onConfirm` (provided by the modal) after ~300 ms with a brief highlight on the collapsed input on the next render. Cancel the timer if the user changes selection again before it fires.

## 3. Modal shell and stage routing

- [x] 3.1 Rewrite `PricingModal.tsx` as a state machine over `'choose' | 'review' | 'inquiry' | 'inquiry-sent'` plus a sub-state `'choose-calendar-expanded'`. Lift `range`, `guests`, and form fields (`name`, `email`, `phone`, `message`) into modal-local state. Reset state on close-after-send; preserve state on back-nav and on user cancel.
- [x] 3.2 Implement `StageProgress` component (`app/src/components/StageProgress.tsx`) — three dots with active/complete/upcoming visual states, aria-label `"Krok N z 3"` (locale-aware), placed at top of every stage and in the confirmation state.
- [x] 3.3 Implement the close-confirmation prompt. Trigger only when the user has typed into a Stage 3 field (`name`, `email`, `phone`, `message`) and the modal is closing via ✕ or backdrop. Use a small inline confirmation overlay inside the modal (not `window.confirm`) with discard / keep-editing actions. Esc on the prompt = keep editing.
- [x] 3.4 Enforce the no-scroll guarantee in CSS: modal body uses `max-height: calc(100dvh - var(--modal-chrome))` and `overflow: hidden`; the calendar-expanded sub-state is allowed `overflow-y: auto` as a safety net for extreme viewports. Snapshot at 360×740, 768×1024, 1366×768, and 1920×1080 in the preview deploy review.

## 4. Stage 1 — choose stay

- [x] 4.1 Implement `GuestCountInput` (`app/src/components/GuestCountInput.tsx`) — `<input type="number" min={1} max={12} step={1} inputMode="numeric" />` with label, helper text "1–12 gości" (locale-aware), and an error message when out of range or empty. Integer validation rejects decimals.
- [x] 4.2 Compose Stage 1 inside `PricingModal`: `StageProgress` (step 1) + `CollapsedDateInput` + `GuestCountInput` + legend (rendered from `AvailabilityCalendar`'s legend slot or a small helper) + advance CTA "Zobacz cenę →".
- [x] 4.3 Wire advance-CTA enablement: enabled IFF `range.from && range.to && nights >= MIN_NIGHTS && guests >= 1 && guests <= 12 && all range days in pricing config`. Show inline validation messages under the offending input when disabled and the user attempts to advance (or on blur).
- [x] 4.4 Wire the calendar-expanded sub-state: tapping `CollapsedDateInput` swaps the modal body to render the `AvailabilityCalendar` expanded form. Exit paths: "Potwierdź daty" button, Esc, back-arrow, click-outside the calendar surface, range completion auto-collapse. All paths preserve selection.

## 5. Stage 2 — review pricing

- [x] 5.1 Rewrite `PriceSummary.tsx` to a stage-2 layout: stay header line (`{dateRange} · {nights} · {guests}`), per-segment lines (only render lines when promotions apply — otherwise the breakdown is a single total), grand total "Razem za pobyt", `✓ Sprzątanie w cenie` mark, "Do zapłaty na miejscu (zwrotne)" section, deposit line, footnote. Remove the `?`-icon tooltip and all its supporting markup. Remove the `Link href="/contact"` CTA from this file.
- [x] 5.2 Replace the contact CTA in Stage 2 with a `<button>` "Chcę zarezerwować →" that advances the modal to Stage 3. Add a back-arrow in the modal header area that returns to Stage 1.
- [x] 5.3 For promotions partially covering the range, render the affected segment's strike-through original total and discounted total side-by-side, plus the dates the segment covers (e.g., "19 – 26 Mar"). Verify against `buildDisplayLines` in the current `PriceSummary` — the same data is sufficient; only the visual presentation changes.

## 6. Stage 3 — send inquiry

- [x] 6.1 Implement `InquiryForm` (`app/src/components/InquiryForm.tsx`) — fields: `name` (required), `email` (required, format validated), `phone` (optional, free format), `message` (optional textarea). Include a hidden honeypot `website` field. Labels and helper text use the keys from §1.
- [x] 6.2 Compose Stage 3 inside `PricingModal`: `StageProgress` (step 3), back-arrow to Stage 2, the form, submit CTA "Wyślij zapytanie". Pending and error states show inline; submit button disabled while pending.
- [x] 6.3 Implement the submit handler: POST to `/api/contact` with `{ arriveDate: range.from.toISOString().slice(0,10), leaveDate: range.to.toISOString().slice(0,10), guests, name, email, phone, message, locale, website }`. On `{ ok: true }` transition to the confirmation state; on error show `t('submitError')` and keep form values.
- [x] 6.4 Implement the confirmation state — title "Dziękujemy", body explaining next steps, single close button. Close from this state resets all modal state. The `StageProgress` shows all three steps complete.

## 7. API and `/contact` page mirror

- [x] 7.1 In `app/src/app/api/contact/route.ts`, relax the validator so `phone` is accepted as missing / empty / whitespace-only. When phone is absent, do not include it in the rendered emails (or render a clear placeholder rather than `undefined`).
- [x] 7.2 In `app/src/components/ContactForm.tsx`, remove the `required` attribute on the phone field and append the locale-aware "(opcjonalnie)" suffix to its label. Update its client-side validation accordingly.
- [x] 7.3 In `app/src/emails/OwnerNotificationEmail.tsx` and `ConfirmationEmail.tsx`, branch the phone row: render only when `phone` is a non-empty string; otherwise omit the row entirely.

## 8. Cleanup

- [x] 8.1 Delete the `.pricing-tier-low`, `.pricing-tier-mid`, `.pricing-tier-high` CSS blocks from `app/src/app/globals.css` (no TSX references — confirmed via `rg "pricing-tier"`). Keep the day-cell base styles and range-middle / range-end styles intact.
- [x] 8.2 Remove the constraints info row (`<p>{t("minNights")} · {t("maxGuests")}</p>`) from `AvailabilityCalendar.tsx` if not already removed by §2.2.
- [x] 8.3 Run `rg "from price|nightlyRate|tooltipLabel|tooltipCleaningFee|tooltipDepositNote|askAbout"` and confirm only `pricing.ts` / archive files remain — purge any straggling references.

## 9. Accessibility and i18n verification

- [ ] 9.1 Verify the `<dialog>` focus trap survives stage swaps: on stage change, focus moves to the new stage's first interactive element; back navigation focuses the back-arrow source.
- [x] 9.2 Add `aria-live="polite"` to the stage container so screen readers announce stage transitions and the confirmation state.
- [x] 9.3 Confirm every visible string in the new modal resolves via `useTranslations`. Run with `NEXT_INTL_DEBUG=true` (or visually scan in each of the 6 locales) and confirm no missing-key warnings.
- [ ] 9.4 Keyboard pass: Tab through Stage 1 → expand calendar → pick range → Tab to advance → Stage 2 → back → Tab to advance → Stage 3 → fill form → submit. All controls reachable, all focus rings visible, Esc exits the calendar-expanded sub-state and the modal as expected.

## 10. Manual QA in preview deploy

- [ ] 10.1 At viewports 360×740, 768×1024, 1280×800, 1366×768 (default browser zoom and 125%), 1920×1080 — confirm no scrollbars appear on the modal body across all three stages and during the calendar-expanded sub-state.
- [ ] 10.2 Run the happy path end-to-end in PL locale: open modal → pick dates → set guests → see price → continue → fill form (with and without phone, with and without message) → submit → see confirmation → close.
- [ ] 10.3 Run back-nav state preservation: advance to Stage 3, fill all four fields, back twice to Stage 1, change dates, advance forward twice — confirm Stage 3 field values are intact.
- [ ] 10.4 Run close-confirmation: close from Stage 1 (no prompt expected), open again and advance to Stage 3, type a character into name, close (prompt expected), discard, reopen — modal state is fresh.
- [ ] 10.5 Run the partial-promotion case: select a range that overlaps a promotion only on part of the dates — confirm Stage 2 renders the discounted segment correctly with strike-through and badge naming the affected dates.
- [ ] 10.6 Run the API failure case: temporarily induce a 500 from `/api/contact` (or block the network) and confirm Stage 3 surfaces the inline error with field values preserved.
- [ ] 10.7 Verify the `/contact` page still accepts a phone-empty submission end-to-end and the resulting owner email renders cleanly without `undefined`.
