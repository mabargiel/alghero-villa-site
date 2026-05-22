## Purpose

The pricing calendar is the date-range selection surface shared by the home-page pricing modal and the contact-page form. It wraps `react-day-picker` with locale support, pricing-driven day modifiers, and a legend showing available and promotional dates.
## Requirements
### Requirement: Date range selection calendar
The system SHALL provide a shared `DateRangePicker` component that wraps `react-day-picker` in range mode with locale-aware month/weekday names. The `AvailabilityCalendar` component SHALL compose this shared component, layering pricing-specific logic (promotion modifiers, disabled date matchers) on top. The shared component MUST support: configurable `numberOfMonths`, locale mapping, custom navigation buttons, range selection with the existing click logic, and an `onRangeChange` callback.

#### Scenario: Contact form uses shared date picker
- **WHEN** the contact form renders the date fields
- **THEN** it uses the shared `DateRangePicker` component with no pricing modifiers and past dates disabled

#### Scenario: Pricing calendar renders with single color
- **WHEN** a visitor opens the pricing modal on the homepage
- **THEN** the `AvailabilityCalendar` renders the shared `DateRangePicker` with a single color for all available dates, promotion highlights, and pricing-range-based disabled dates

### Requirement: Calendar legend shows availability and promotion
The calendar legend SHALL display two entries: an "Available" entry and a "Promotion" entry. No "Booked" entry SHALL be shown. Season-type labels (Low/Mid/High season) and per-tier price dots SHALL NOT appear.

#### Scenario: Legend shows available indicator
- **WHEN** the pricing calendar is rendered
- **THEN** a legend entry labeled with the locale-appropriate word for "Available" / "Dostępne" is shown with a non-promo tile-color swatch

#### Scenario: Legend shows promotion indicator
- **WHEN** the pricing calendar is rendered
- **THEN** a legend entry labeled with the locale-appropriate word for "Promotion" / "Promocja" is shown with its existing styling

#### Scenario: Legend omits booked indicator
- **WHEN** the pricing calendar is rendered
- **THEN** no "Booked" / "Zajęte" entry appears in the legend

### Requirement: Minimum stay enforcement
The calendar SHALL enforce a minimum stay of 7 nights. Selecting a range shorter than 7 nights SHALL trigger a warning.

#### Scenario: Fewer than 7 nights selected
- **WHEN** the user selects a date range shorter than 7 nights
- **THEN** a minimum nights warning is displayed

### Requirement: Price summary shows per-night rate
The price summary SHALL display the effective per-night rate below the total price when a date range is selected.

#### Scenario: Per-night rate visible after date selection
- **WHEN** the user selects a valid date range
- **THEN** the price summary shows the total price and, below it, the per-night rate formatted as "{price} €/noc" (locale-appropriate)

### Requirement: Calendar supports collapsed-then-expanded presentation
The `AvailabilityCalendar` component SHALL support a presentation in which it is hidden behind a single-row date input until the user activates it, at which point the calendar replaces its host's body. This presentation is used inside the pricing modal's Stage 1.

#### Scenario: Calendar exposes a collapsed and expanded presentation
- **WHEN** the calendar is mounted inside the pricing modal Stage 1
- **THEN** it renders only the collapsed date input until the user activates expansion, after which it renders the full 2-month calendar plus an exit affordance

#### Scenario: Selection state persists across collapse and expand
- **WHEN** the user selects a date range and then collapses the calendar back to the input
- **THEN** the selected range is summarized on the collapsed input and re-displayed on the calendar when expanded again

