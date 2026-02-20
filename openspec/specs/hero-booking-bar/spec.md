## ADDED Requirements

### Requirement: Booking bar on hero section
The system SHALL display a booking bar near the bottom of the hero section containing date fields and a CTA to open the pricing modal.

#### Scenario: Hero loads with no dates selected
- **WHEN** the home page loads
- **THEN** the booking bar is visible at the bottom of the hero with placeholder text "Zameldowanie" and "Wymeldowanie" in the date fields, and a "Sprawdź cenę" button

#### Scenario: User clicks any element in the booking bar
- **WHEN** the user clicks on the check-in field, check-out field, or "Sprawdź cenę" button
- **THEN** the pricing modal opens

### Requirement: Booking bar shows selected dates
The system SHALL update the booking bar to display the selected check-in and check-out dates after the user selects a range in the modal.

#### Scenario: Dates selected and modal closed
- **WHEN** the user selects a valid date range in the pricing modal and closes it
- **THEN** the booking bar displays the selected check-in and check-out dates formatted in Polish locale (e.g., "15 mar" → "28 mar")

#### Scenario: Dates selected with price
- **WHEN** a valid date range with a computed price exists and the modal is closed
- **THEN** the booking bar displays the total price as a teaser (e.g., "1 690 €")

### Requirement: Booking bar visual design
The booking bar SHALL have a semi-transparent white background (`bg-white/90`) with subtle backdrop blur to maintain readability while letting the hero video show through.

#### Scenario: Bar renders over video background
- **WHEN** the hero video is playing behind the booking bar
- **THEN** the bar is clearly legible with white/90 opacity background and backdrop-blur

#### Scenario: Responsive layout
- **WHEN** the viewport is mobile-width (<768px)
- **THEN** the booking bar stacks vertically or adapts to fit the narrow viewport

### Requirement: Centered hero text
The hero text content (badge, heading, paragraph) SHALL be centered horizontally at all viewport sizes.

#### Scenario: Desktop viewport
- **WHEN** the viewport is desktop-width
- **THEN** the hero text is centered with the badge, heading, and paragraph all center-aligned

#### Scenario: Mobile viewport
- **WHEN** the viewport is mobile-width
- **THEN** the hero text is centered with the badge, heading, and paragraph all center-aligned

### Requirement: Improved hero text readability
The hero text SHALL use layered text-shadows for readability over the video background without obscuring containers.

#### Scenario: Text renders over dynamic video
- **WHEN** the hero video is playing with varying brightness across frames
- **THEN** the hero text remains legible using multiple layered text-shadow values and the dark overlay is reduced to ~40% opacity on desktop

### Requirement: Old CTA button removed
The hero section SHALL NOT display the old "Sprawdź dostępność" button. The booking bar replaces it as the primary call-to-action.

#### Scenario: Hero renders
- **WHEN** the home page hero section renders
- **THEN** no standalone CTA button is shown — only the booking bar serves as the action trigger
