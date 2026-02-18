## ADDED Requirements

### Requirement: Modal overlay with pricing calendar
The system SHALL display a centered modal overlay containing the pricing calendar and price summary when triggered from the booking bar.

#### Scenario: Modal opens from booking bar
- **WHEN** the user clicks any interactive element in the booking bar
- **THEN** a modal overlay appears centered on screen with a dimmed backdrop, containing the pricing calendar and price summary

#### Scenario: Modal renders on desktop
- **WHEN** the modal is open on a desktop viewport
- **THEN** the modal is centered with max-width constraint (~max-w-3xl), showing the two-month calendar, tier legend, and price summary stacked vertically

#### Scenario: Modal renders on mobile
- **WHEN** the modal is open on a mobile viewport
- **THEN** the modal fills the viewport width with appropriate padding, showing one month at a time with the price summary below

### Requirement: Modal close behavior
The modal SHALL close when the user clicks the close button, clicks the backdrop, or presses the Escape key.

#### Scenario: User clicks close button
- **WHEN** the user clicks the X button in the modal header
- **THEN** the modal closes and the selected date range persists in the booking bar

#### Scenario: User clicks backdrop
- **WHEN** the user clicks the dimmed area outside the modal content
- **THEN** the modal closes

#### Scenario: User presses Escape
- **WHEN** the user presses the Escape key while the modal is open
- **THEN** the modal closes

### Requirement: Body scroll lock when modal is open
The system SHALL prevent body scrolling when the pricing modal is open.

#### Scenario: Modal opens
- **WHEN** the pricing modal opens
- **THEN** the body element receives `overflow: hidden` to prevent background scrolling

#### Scenario: Modal closes
- **WHEN** the pricing modal closes
- **THEN** the body `overflow` is restored to its original value

### Requirement: Date range persistence across modal open/close
The system SHALL preserve the selected date range and computed price when the modal is closed and reopened.

#### Scenario: User selects dates, closes modal, reopens
- **WHEN** the user selects a date range, closes the modal, then reopens it
- **THEN** the previously selected range is still highlighted in the calendar and the price summary shows the same breakdown

### Requirement: Price summary always visible in modal
The price summary panel SHALL always be visible below the calendar inside the modal, regardless of whether dates have been selected.

#### Scenario: No dates selected
- **WHEN** the modal is open with no date range selected
- **THEN** the price summary shows a placeholder message prompting the user to select dates

#### Scenario: Dates selected
- **WHEN** the modal is open with a valid date range selected
- **THEN** the price summary shows the full breakdown with segment details, extras, and total

### Requirement: Contact CTA in modal
The price summary inside the modal SHALL display a CTA button linking to `/contact` when a valid date range is selected.

#### Scenario: Valid range selected
- **WHEN** the user has selected a date range of 5 or more nights
- **THEN** the "Zapytaj o termin" button is visible and links to `/contact`
