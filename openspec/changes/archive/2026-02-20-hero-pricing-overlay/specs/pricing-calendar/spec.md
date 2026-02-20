## MODIFIED Requirements

### Requirement: Responsive layout
The system SHALL display the calendar and price summary in a responsive layout suitable for a modal context rather than a full-page layout.

#### Scenario: Desktop viewport
- **WHEN** the viewport is desktop-width (>=768px)
- **THEN** two months are shown side by side inside the modal, with the price summary below the calendar (vertically stacked)

#### Scenario: Mobile viewport
- **WHEN** the viewport is mobile-width (<768px)
- **THEN** one month is shown at a time with the price summary below the calendar

### Requirement: Date range selection calendar
The system SHALL display an interactive two-month calendar in the pricing modal that allows visitors to select a check-in and check-out date by clicking. The calendar component SHALL accept the selected range and a change handler as props (controlled component) rather than managing its own state.

#### Scenario: User selects a date range
- **WHEN** the user clicks a start date and then an end date on the calendar
- **THEN** the selected range is visually highlighted and the parent component is notified via the change handler

#### Scenario: User selects a single date
- **WHEN** the user clicks only one date without selecting a second
- **THEN** that date is highlighted as the start date and the calendar awaits a second click for the end date

#### Scenario: User clears selection
- **WHEN** the user clicks the already-selected start date or uses a reset action
- **THEN** the selection is cleared and the parent component is notified

## REMOVED Requirements

### Requirement: Contact CTA
**Reason**: The contact CTA is now part of the PriceSummary component rendered inside the pricing modal, not the calendar component itself.
**Migration**: CTA rendering is handled by PriceSummary inside PricingModal.
