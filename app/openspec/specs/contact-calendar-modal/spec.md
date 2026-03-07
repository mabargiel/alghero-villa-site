### Requirement: Contact form date field opens availability calendar modal

The contact form date field SHALL open a modal containing the `AvailabilityCalendar` component (2-month view with tier colors, promotion indicators, and legend) when clicked. The field button appearance SHALL remain unchanged.

#### Scenario: User clicks the date field

- **WHEN** user clicks the "Arrive / Leave" date field button on the contact form
- **THEN** a modal opens displaying the `AvailabilityCalendar` with 2-month view, tier coloring, promotion dots, and legend

#### Scenario: User selects a complete date range

- **WHEN** user selects both a from-date and a to-date in the calendar modal
- **THEN** the modal auto-closes and the date field displays the selected range in locale-formatted text

#### Scenario: User closes modal without completing selection

- **WHEN** user closes the modal (X button, backdrop click, or Escape) before selecting both dates
- **THEN** the date field retains its previous value (either empty or previously selected range)

### Requirement: Date propagation from hero to contact form

The contact form SHALL initialize its date range from the shared context populated by the hero BookingBar. This allows users who already selected dates on the hero to see them pre-filled on the contact form.

#### Scenario: User selects dates on hero then navigates to contact

- **WHEN** user selects dates on the hero BookingBar and then navigates to the contact page
- **THEN** the contact form date field displays the previously selected dates

#### Scenario: User navigates directly to contact page

- **WHEN** user navigates directly to the contact page without selecting dates on the hero
- **THEN** the contact form date field shows the default "Select dates" placeholder

### Requirement: Shared date range context

The `PricingModalProvider` context SHALL expose `range`, `setRange`, and `config` to all descendants. The `BookingBar` SHALL sync its selected date range into this shared context.

#### Scenario: BookingBar syncs range to context

- **WHEN** user selects a date range in the BookingBar's pricing modal
- **THEN** the shared context `range` is updated with the selected dates

#### Scenario: Context provides config to descendants

- **WHEN** any descendant component accesses the pricing modal context
- **THEN** it SHALL receive the `PricingConfig` object alongside `range` and `setRange`

### Requirement: Rename PricingCalendar to AvailabilityCalendar

The `PricingCalendar` component SHALL be renamed to `AvailabilityCalendar`. All imports and references SHALL be updated. Behavior and props SHALL remain identical.

#### Scenario: Existing pricing modal continues to work

- **WHEN** the pricing modal renders the calendar
- **THEN** it uses `AvailabilityCalendar` (formerly `PricingCalendar`) with identical behavior
