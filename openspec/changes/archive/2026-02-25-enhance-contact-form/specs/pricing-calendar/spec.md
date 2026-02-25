## MODIFIED Requirements

### Requirement: Date range selection calendar
The system SHALL provide a shared `DateRangePicker` component that wraps `react-day-picker` in range mode with locale-aware month/weekday names. The `PricingCalendar` component SHALL compose this shared component, layering pricing-specific logic (tier modifiers, promotion modifiers, disabled date matchers) on top. The shared component MUST support: configurable `numberOfMonths`, locale mapping, custom navigation buttons, range selection with the existing click logic, and an `onRangeChange` callback.

#### Scenario: Contact form uses shared date picker
- **WHEN** the contact form renders the date fields
- **THEN** it uses the shared `DateRangePicker` component with no pricing modifiers and past dates disabled

#### Scenario: Pricing calendar still works unchanged
- **WHEN** a visitor opens the pricing modal on the homepage
- **THEN** the `PricingCalendar` renders the shared `DateRangePicker` with pricing tier colors, promotion highlights, and pricing-range-based disabled dates, behaving identically to the current implementation
