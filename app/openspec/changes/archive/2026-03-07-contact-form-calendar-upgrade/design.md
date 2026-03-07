## Context

The app has a `PricingCalendar` component (wrapping `react-day-picker`) used inside a pricing modal on the hero. The contact form on `/contact` uses a plain `DateRangePicker` (same underlying library, different config) shown inline with 1 month, no tiers, no promotions. Dates selected on the hero don't carry over to the contact form — they're separate React state trees.

`PricingModalProvider` wraps the entire app at layout level. It holds `range` and `config` internally but only exposes `openModal()` through context. `BookingBar` on the hero manages its own separate `range` state and renders its own `PricingModal`.

## Goals / Non-Goals

**Goals:**
- Visual consistency: contact form calendar matches the hero pricing modal calendar
- Date propagation: dates picked on hero carry to the contact form
- Rename `PricingCalendar` → `AvailabilityCalendar` for clarity
- Contact form date field opens a modal (not inline) with the full 2-month availability calendar

**Non-Goals:**
- Refactoring `BookingBar` to fully reuse the provider's modal (it keeps its own modal — we just sync the range)
- Changing the pricing modal's layout or behavior
- Adding price summary to the contact form calendar modal

## Decisions

### 1. Expand PricingModalProvider context

**Decision:** Add `range`, `setRange`, and `config` to the context value.

**Why:** The provider already wraps the full app at layout level and already holds both `range` and `config`. Exposing them is a one-line change per field. This avoids prop drilling `pricingConfig` into the contact page or creating a separate context.

**Alternative considered:** URL search params (`/contact?from=...&to=...`) — works across navigations but adds URL complexity, requires parsing, and doesn't give `config` to `ContactForm`.

### 2. BookingBar syncs range to context

**Decision:** After the user closes the BookingBar's modal, sync the selected range into the shared context via `setRange`.

**Why:** Minimal change to BookingBar. It keeps its own local state and modal — we just add a sync effect. This avoids a larger refactor of BookingBar while achieving date propagation.

### 3. New DatePickerModal component

**Decision:** Create a lightweight `DatePickerModal` component that wraps `AvailabilityCalendar` in a `<dialog>` modal, similar to `PricingModal` but without `PriceSummary`.

**Why:** The contact form needs a modal but not the full pricing modal with price breakdown. A focused component keeps concerns separate. Reuses the same `<dialog>` + backdrop pattern already established by `PricingModal`.

### 4. Rename PricingCalendar → AvailabilityCalendar

**Decision:** Rename the component file and all references.

**Why:** The component is now used in a non-pricing context (contact form). "Availability" better describes its purpose — showing available date ranges with visual tier/promotion indicators.

## Risks / Trade-offs

- **[Stale context on direct navigation]** If a user bookmarks `/contact` directly, context `range` is `undefined` — the field just shows "Select dates" as before. No degradation. → No mitigation needed.
- **[Two-way sync complexity]** BookingBar syncs TO context, ContactForm reads FROM context. We don't sync ContactForm changes back to context (unnecessary — the form is the end of the funnel). → Keep it one-directional.
- **[Calendar modal width on mobile]** 2-month `AvailabilityCalendar` may be tight on small screens. `DateRangePicker` already handles this by stacking months vertically. → No extra work needed, verify during testing.
