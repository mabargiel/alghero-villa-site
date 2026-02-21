## MODIFIED Requirements

### Requirement: Booking bar on hero section
The system SHALL display a booking bar near the bottom of the hero section containing date fields and a CTA to open the pricing modal. All labels SHALL come from the translation system.

#### Scenario: Hero loads with no dates selected
- **WHEN** the home page loads
- **THEN** the booking bar is visible at the bottom of the hero with translated placeholder text for check-in and check-out fields, and a translated "Check price" button

#### Scenario: User clicks any element in the booking bar
- **WHEN** the user clicks on the check-in field, check-out field, or CTA button
- **THEN** the pricing modal opens

### Requirement: Booking bar shows selected dates
The system SHALL update the booking bar to display the selected check-in and check-out dates after the user selects a range in the modal. Date formatting SHALL use the active locale.

#### Scenario: Dates selected and modal closed (Italian)
- **WHEN** the user selects a valid date range in Italian locale and closes the modal
- **THEN** the booking bar displays dates formatted in Italian (e.g., "15 mar" → "28 mar")

#### Scenario: Dates selected and modal closed (English)
- **WHEN** the user selects a valid date range in English locale and closes the modal
- **THEN** the booking bar displays dates formatted in English (e.g., "Mar 15" → "Mar 28")

#### Scenario: Dates selected with price
- **WHEN** a valid date range with a computed price exists and the modal is closed
- **THEN** the booking bar displays the total price formatted according to the active locale
