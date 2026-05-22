## ADDED Requirements

### Requirement: Modal presents a three-stage flow
The pricing modal SHALL render exactly one of three stages at a time: `choose-stay` (Stage 1), `review-pricing` (Stage 2), or `send-inquiry` (Stage 3). The modal SHALL start at Stage 1 on every fresh open.

#### Scenario: Fresh open lands on Stage 1
- **WHEN** the user opens the modal from the booking bar
- **THEN** the modal renders Stage 1 (choose-stay) regardless of any previously selected dates

#### Scenario: Stage 2 follows Stage 1 advancement
- **WHEN** the user has selected a valid date range (≥ 7 nights, within configured pricing) and a valid guest count (1–12) on Stage 1 and clicks the advance CTA
- **THEN** the modal transitions to Stage 2 (review-pricing)

#### Scenario: Stage 3 follows Stage 2 advancement
- **WHEN** the user clicks the "Chcę zarezerwować" CTA on Stage 2
- **THEN** the modal transitions to Stage 3 (send-inquiry)

#### Scenario: Only one stage is in the DOM at a time
- **WHEN** the modal is at Stage 2
- **THEN** the markup for Stages 1 and 3 is absent (not merely hidden) so as not to occupy layout

### Requirement: Modal never scrolls vertically
The modal body SHALL fit within the viewport at every supported size. Vertical scrollbars MUST NOT appear on the modal body in normal operation.

#### Scenario: Modal fits a short viewport
- **WHEN** the modal opens on a viewport of 1366×768 with a typical browser chrome
- **THEN** all content of the current stage is fully visible without inner scrollbars

#### Scenario: Modal fits a small phone
- **WHEN** the modal opens on a viewport of 360×740
- **THEN** all content of the current stage is fully visible without inner scrollbars

### Requirement: Stage 1 collects stay parameters
Stage 1 SHALL contain a collapsed date-range input, a guest-count input (integer 1–12, required), the calendar legend, the advance CTA, and the stage-progress indicator. Stage 1 SHALL NOT display a price.

#### Scenario: Date input is collapsed by default
- **WHEN** Stage 1 first renders
- **THEN** the date input is a single-row field showing the placeholder (e.g., "Wybierz terminy ▾"), and the 2-month calendar is not displayed

#### Scenario: Selected range is summarized in the collapsed input
- **WHEN** the user has selected a 14-night range (e.g., 12 Mar – 26 Mar)
- **THEN** the collapsed input renders text equivalent to "12 Mar – 26 Mar · 14 nocy" in the active locale

#### Scenario: Advance CTA is disabled until inputs are valid
- **WHEN** the date range is missing, shorter than 7 nights, falls on disabled dates, or the guest count is outside 1–12
- **THEN** the Stage 1 advance CTA is disabled with appropriate validation messaging

### Requirement: Calendar swap pattern on Stage 1
Tapping the collapsed date input on Stage 1 SHALL replace the entire modal body with the full 2-month calendar plus a "Potwierdź daty" exit button and the legend. Exiting SHALL return to Stage 1 with selection preserved.

#### Scenario: Tap expands the calendar
- **WHEN** the user taps or focuses the collapsed date input
- **THEN** the modal body content is replaced by the 2-month calendar and the "Potwierdź daty" exit button

#### Scenario: Exit returns to Stage 1
- **WHEN** the user taps "Potwierdź daty", presses Esc, taps the back-arrow, or clicks outside the calendar surface within the modal
- **THEN** the modal body returns to Stage 1 with any selected range preserved in the collapsed input

#### Scenario: Range completion auto-collapses to Stage 1
- **WHEN** the user completes a range by selecting the end date
- **THEN** within approximately 300 ms the modal automatically returns to Stage 1 with the new range applied and a brief visual highlight on the collapsed input

### Requirement: Stage 2 reviews pricing with explicit framing
Stage 2 SHALL display the price breakdown without requiring user input. The layout SHALL include: a stay header (dates · nights · guests), per-segment lines for any promotional segments showing strike-through original totals and discounted totals with a promotion badge naming the affected dates, the grand total labeled "Razem za pobyt", a "✓ Sprzątanie w cenie" confirmation mark, a separately framed "Do zapłaty na miejscu (zwrotne)" section containing the refundable deposit "Kaucja zwrotna: 800 €", and a footnote "Pełna kwota płatna dopiero po potwierdzeniu". The advance CTA SHALL read "Chcę zarezerwować →" (locale-aware).

#### Scenario: Promotion segment shows discount math
- **WHEN** a 14-night stay has a 15 % promotion applied to the second 7-night segment
- **THEN** Stage 2 renders a line for the second segment with the strike-through original total and the discounted total alongside a "−15 %" badge and the dates the segment covers

#### Scenario: Deposit is framed as on-site refundable
- **WHEN** Stage 2 renders with a valid breakdown
- **THEN** the deposit appears under a "Do zapłaty na miejscu (zwrotne)" section heading with value "800 €" and is visually distinct from the stay total

#### Scenario: Cleaning checkmark is positive
- **WHEN** Stage 2 renders with a valid breakdown
- **THEN** the "✓ Sprzątanie w cenie" mark appears immediately under the stay total, replacing the prior `?`-icon tooltip

### Requirement: Stage 3 collects contact info and submits inline
Stage 3 SHALL render an inquiry form with fields for name (required), email (required), phone (optional), and message (optional). Stage 3 SHALL include a honeypot field for spam protection. The submit CTA SHALL read "Wyślij zapytanie" (locale-aware). On submit, the modal SHALL POST to `/api/contact` with the payload shape `{ arriveDate, leaveDate, guests, name, email, phone, message, locale, website }`.

#### Scenario: Required fields enforce validation
- **WHEN** the user submits with name or email empty
- **THEN** the submission is blocked client-side with inline error messages on the missing fields

#### Scenario: Phone is optional
- **WHEN** the user submits with phone empty but name and email present
- **THEN** the submission proceeds and the API accepts it

#### Scenario: Successful submit renders confirmation state
- **WHEN** `/api/contact` returns `{ ok: true }`
- **THEN** the modal renders a confirmation state thanking the user and offering a close action

#### Scenario: API error surfaces inline
- **WHEN** `/api/contact` returns a non-OK response or the network fails
- **THEN** Stage 3 surfaces an inline error message and remains in editable state with all field values preserved

### Requirement: Stage progress indicator
The modal SHALL display a progress indicator at the top of every stage showing the user's position in the three-stage flow.

#### Scenario: Progress indicator reflects current stage
- **WHEN** the modal is on Stage 2
- **THEN** the progress indicator shows the second of three stages as active, the first as complete, and the third as upcoming, with an accessible label reflecting "Krok 2 z 3" (locale-aware)

### Requirement: Back navigation preserves state
Stages 2 and 3 SHALL provide a back-arrow control. Navigating back SHALL preserve every value the user has entered.

#### Scenario: Back from Stage 3 keeps form values
- **WHEN** the user has typed a name and an email on Stage 3, taps the back-arrow, then advances to Stage 3 again
- **THEN** the name and email values are still present

#### Scenario: Back from Stage 2 keeps dates and guests
- **WHEN** the user navigates back from Stage 2 to Stage 1
- **THEN** the previously selected date range and guest count remain in the Stage 1 inputs

### Requirement: Dirty-form close confirmation
The modal close affordance (✕ button and backdrop click) SHALL prompt for confirmation only when the user has typed into at least one Stage 3 field. Otherwise it SHALL close immediately.

#### Scenario: Casual close requires no confirmation
- **WHEN** the user opens the modal, picks dates, and clicks ✕ without reaching or typing on Stage 3
- **THEN** the modal closes immediately without prompt

#### Scenario: Dirty Stage 3 prompts before close
- **WHEN** the user has typed any character into a Stage 3 input and then clicks ✕ or the backdrop
- **THEN** a confirmation prompt asks the user to confirm losing their input before closing

## MODIFIED Requirements

### Requirement: Modal overlay with pricing calendar
The system SHALL display a centered modal overlay containing the three-stage booking flow when triggered from the booking bar. All text labels SHALL come from the translation system. The legacy single-pane composition of `AvailabilityCalendar` + `PriceSummary` is replaced by the three-stage flow described in the ADDED Requirements above.

#### Scenario: Modal opens with translated header
- **WHEN** the user opens the pricing modal in Italian locale
- **THEN** the modal header displays the translated title for the current stage (e.g., "Prenota" on Stage 1) instead of hardcoded Polish

#### Scenario: Close button aria-label is translated
- **WHEN** the modal renders in any locale
- **THEN** the close button has a translated aria-label (e.g., "Close" in English, "Chiudi" in Italian)

### Requirement: Contact CTA in modal
The modal SHALL collect contact information inline on Stage 3 and submit directly to `/api/contact`. The modal CTA on Stages 1 and 2 SHALL advance to the next stage; the Stage 3 CTA SHALL trigger submission. The CTA labels SHALL come from the translation system. The modal SHALL NOT link out to the `/contact` page from any stage CTA.

#### Scenario: Stage 1 CTA advances
- **WHEN** the user clicks the Stage 1 CTA with valid inputs in English locale
- **THEN** the button displays "See price →" (or locale equivalent) and the modal transitions to Stage 2 without navigation

#### Scenario: Stage 3 CTA submits inline
- **WHEN** the user clicks the Stage 3 CTA with a valid form
- **THEN** the button displays "Send inquiry" (or locale equivalent) and the modal POSTs to `/api/contact` without navigation

