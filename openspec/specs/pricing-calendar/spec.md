## MODIFIED Requirements

### Requirement: Date range selection calendar
The system SHALL provide a shared `DateRangePicker` component that wraps `react-day-picker` in range mode with locale-aware month/weekday names. The `AvailabilityCalendar` component SHALL compose this shared component, layering pricing-specific logic (promotion modifiers, disabled date matchers) on top. The shared component MUST support: configurable `numberOfMonths`, locale mapping, custom navigation buttons, range selection with the existing click logic, and an `onRangeChange` callback.

#### Scenario: Contact form uses shared date picker
- **WHEN** the contact form renders the date fields
- **THEN** it uses the shared `DateRangePicker` component with no pricing modifiers and past dates disabled

#### Scenario: Pricing calendar renders with single color
- **WHEN** a visitor opens the pricing modal on the homepage
- **THEN** the `AvailabilityCalendar` renders the shared `DateRangePicker` with a single color for all available dates, promotion highlights, and pricing-range-based disabled dates

### Requirement: Calendar legend shows availability and promotion
The calendar legend SHALL display a "Booked" entry for unavailable dates and a "Promotion" entry. Season-type labels (Low/Mid/High season) and per-tier price dots SHALL NOT appear.

#### Scenario: Legend shows booked indicator
- **WHEN** the pricing calendar is rendered
- **THEN** a legend entry labeled with the locale-appropriate word for "Booked" / "Zajęte" is shown with a visually distinct (grayed) dot

#### Scenario: Promotion entry remains
- **WHEN** the pricing calendar is rendered
- **THEN** the legend includes the promotion entry with its existing styling

### Requirement: Calendar constraints info row
The calendar SHALL display a subtle info row below the legend showing the starting nightly rate, minimum stay, and maximum guest count. All text SHALL come from the translation system.

#### Scenario: Constraints row is visible
- **WHEN** the pricing calendar is rendered
- **THEN** a line reading "od {minPrice}€/noc · min. 7 nocy · max. 12 osób" (locale-appropriate) is visible below the legend in muted text

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
