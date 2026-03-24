## MODIFIED Requirements

### Requirement: API route sends two emails on valid submission
The `/api/contact` route SHALL send both an owner notification email and a visitor confirmation email upon successful validation. Both emails are sent via Resend. The route SHALL calculate the estimated price using `calculatePriceBreakdown` with the submitted date range and current pricing configuration, and pass the result to both email templates. If price calculation fails or returns no result, the emails SHALL still be sent without pricing data.

#### Scenario: Successful submission with pricing
- **WHEN** all fields are valid, pass honeypot/rate-limit checks, and dates fall within configured pricing ranges
- **THEN** the system sends both emails including the estimated price breakdown (total with cleaning fee, night count, date range)

#### Scenario: Successful submission without pricing
- **WHEN** all fields are valid but the submitted dates have no configured pricing
- **THEN** the system sends both emails without the estimated price section

#### Scenario: Owner email includes estimated price
- **WHEN** the owner notification email is sent with available pricing
- **THEN** the email displays the estimated total price, number of nights, and a note that it is an estimate
