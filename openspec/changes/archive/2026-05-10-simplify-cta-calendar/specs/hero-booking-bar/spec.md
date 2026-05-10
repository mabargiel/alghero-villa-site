## MODIFIED Requirements

### Requirement: Booking bar on hero section
The system SHALL display a booking bar near the bottom of the hero section containing date fields and a CTA to open the pricing modal. All labels SHALL come from the translation system.

#### Scenario: Hero loads with no dates selected
- **WHEN** the home page loads
- **THEN** the booking bar is visible at the bottom of the hero with translated placeholder text for check-in and check-out fields, and a translated "Book" / "Rezerwuj" CTA button (locale-appropriate direct booking verb)

#### Scenario: User clicks any element in the booking bar
- **WHEN** the user clicks on the check-in field, check-out field, or CTA button
- **THEN** the pricing modal opens

#### Scenario: CTA label in Polish locale
- **WHEN** the page is rendered in Polish
- **THEN** the CTA button reads "Rezerwuj"

#### Scenario: CTA label in English locale
- **WHEN** the page is rendered in English
- **THEN** the CTA button reads "Book"

#### Scenario: CTA label in Italian locale
- **WHEN** the page is rendered in Italian
- **THEN** the CTA button reads "Prenota"
