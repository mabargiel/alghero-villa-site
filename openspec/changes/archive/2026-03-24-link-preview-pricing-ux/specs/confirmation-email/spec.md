## ADDED Requirements

### Requirement: Estimated price section in confirmation email
The confirmation email SHALL include an "Estimated price" section when price data is available. The section SHALL display the total estimated price (including cleaning fee), the number of nights, and the arrival/departure dates. A disclaimer SHALL state that the price is an estimate subject to confirmation.

#### Scenario: Price included in confirmation email
- **WHEN** a visitor submits a form for dates with configured pricing (e.g., 7 nights at €1150 total)
- **THEN** the confirmation email includes a section showing "Estimated price: €1150" with "7 nights" and the date range, plus a disclaimer

#### Scenario: Price unavailable for selected dates
- **WHEN** a visitor submits a form for dates outside configured pricing ranges
- **THEN** the confirmation email omits the estimated price section entirely (no error shown)

#### Scenario: Disclaimer text is localized
- **WHEN** the confirmation email is sent in Italian locale
- **THEN** the estimated price disclaimer text appears in Italian
