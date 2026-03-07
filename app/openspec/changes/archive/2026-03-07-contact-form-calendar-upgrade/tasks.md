## 1. Rename PricingCalendar → AvailabilityCalendar

- [x] 1.1 Rename `src/components/PricingCalendar.tsx` to `src/components/AvailabilityCalendar.tsx` and update the default export name
- [x] 1.2 Update all imports of `PricingCalendar` across the codebase (`PricingModal.tsx`, `PricingModalProvider.tsx`, `BookingBar.tsx`)

## 2. Expand shared context

- [x] 2.1 Extend `PricingModalProvider` context type to expose `range`, `setRange`, and `config` alongside `openModal`
- [x] 2.2 Update the `usePricingModal` hook return type and context default value

## 3. Sync BookingBar range to context

- [x] 3.1 In `BookingBar`, consume `setRange` from context and sync the local range to context when it changes (e.g., via `useEffect` or in the `onRangeChange` callback)

## 4. DatePickerModal component

- [x] 4.1 Create `src/components/DatePickerModal.tsx` — a `<dialog>`-based modal wrapping `AvailabilityCalendar` (reuse modal pattern from `PricingModal`: backdrop, close button, scroll lock, escape handling)
- [x] 4.2 Modal auto-closes when both from and to dates are selected

## 5. Update ContactForm

- [x] 5.1 In `ContactForm`, read `range` and `config` from the shared context to initialize the date range state
- [x] 5.2 Replace the inline `DateRangePicker` with `DatePickerModal` + `AvailabilityCalendar` — field button opens modal on click
- [x] 5.3 Verify form submission still sends correct `arriveDate` and `leaveDate` ISO strings
