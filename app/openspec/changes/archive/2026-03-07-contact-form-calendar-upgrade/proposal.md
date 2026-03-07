## Why

The contact form's date picker is visually inconsistent with the hero pricing calendar — it shows a plain single-month calendar with no availability/tier information. Additionally, dates selected on the hero booking bar are lost when the user navigates to the contact page, forcing them to re-enter dates.

## What Changes

- Rename `PricingCalendar` to `AvailabilityCalendar` to better reflect its purpose (used beyond pricing context)
- Replace the inline plain `DateRangePicker` in `ContactForm` with a modal-based `AvailabilityCalendar` (2-month view with tier colors, promotions, legend)
- Keep the existing date field button look — clicking it opens the calendar modal instead of an inline dropdown
- Auto-close the modal when both from/to dates are selected
- Expand `PricingModalProvider` context to expose `range`, `setRange`, and `config`
- Sync `BookingBar` date selection into shared context so dates propagate to the contact form

## Capabilities

### New Capabilities
- `contact-calendar-modal`: Modal-based availability calendar in the contact form, with date propagation from hero booking bar

### Modified Capabilities

## Impact

- `PricingCalendar.tsx` → renamed to `AvailabilityCalendar.tsx` (all imports updated)
- `PricingModalProvider.tsx` — context type expanded to include `range`, `setRange`, `config`
- `BookingBar.tsx` — uses shared context range instead of local state
- `ContactForm.tsx` — reads initial dates from context, opens modal with `AvailabilityCalendar`
- `PricingModal.tsx` — imports updated from `PricingCalendar` to `AvailabilityCalendar`
- New component: `DatePickerModal.tsx` (lightweight modal wrapping `AvailabilityCalendar` for contact form)
