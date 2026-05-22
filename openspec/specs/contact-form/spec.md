## Purpose

The contact form is the fallback inquiry surface on `/contact`. It collects guest information and a date range, posts to `/api/contact`, and triggers the dual email send (visitor confirmation + owner notification) via Resend.
## Requirements
### Requirement: Contact form collects arrival and departure dates
The contact form SHALL include two date fields for arrival and departure dates, implemented using a shared date range picker component based on `react-day-picker`. Both fields are required. Past dates MUST be disabled.

#### Scenario: Visitor selects date range
- **WHEN** a visitor interacts with the date picker fields
- **THEN** a calendar UI appears allowing range selection of arrival and departure dates

#### Scenario: Visitor submits without dates
- **WHEN** a visitor attempts to submit the form without selecting both arrival and departure dates
- **THEN** the form prevents submission and indicates the dates are required

### Requirement: Contact form collects guest count
The contact form SHALL include a required numeric input for the number of guests. The label MUST indicate that children are included in the count. The minimum value MUST be 1.

#### Scenario: Visitor enters guest count
- **WHEN** a visitor enters a number in the guests field
- **THEN** the value is captured as a positive integer

#### Scenario: Visitor submits with zero or empty guests
- **WHEN** a visitor attempts to submit with guests set to 0 or empty
- **THEN** the form prevents submission and indicates the field is required

### Requirement: Contact form collects a message
The contact form SHALL include a required textarea for a free-text message.

#### Scenario: Visitor writes a message
- **WHEN** a visitor types into the message textarea
- **THEN** the text is captured for inclusion in the owner notification email

#### Scenario: Visitor submits without a message
- **WHEN** a visitor attempts to submit the form without entering a message
- **THEN** the form prevents submission and indicates the message is required

### Requirement: Contact form sends locale with submission
The contact form SHALL include the current page locale in the POST body to `/api/contact`. The locale is read from `next-intl`'s `useLocale()` hook.

#### Scenario: Form submitted from French page
- **WHEN** a visitor submits the form from `/fr/contact`
- **THEN** the POST body includes `"locale": "fr"`

### Requirement: API route validates new fields
The `/api/contact` route SHALL validate that `arriveDate`, `leaveDate`, `guests`, and `message` are present and non-empty. The route SHALL validate that `locale` is one of the supported locales, falling back to `en` if invalid. The route SHALL validate that `arriveDate` is before `leaveDate`.

#### Scenario: Missing required field
- **WHEN** the API receives a request with a missing `message` field
- **THEN** it returns HTTP 400

#### Scenario: Arrive date after leave date
- **WHEN** the API receives `arriveDate` that is after `leaveDate`
- **THEN** it returns HTTP 400

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

#### Scenario: Success state rendering
- **WHEN** the form state transitions to `success`
- **THEN** the component renders the success screen instead of the form fields and inline message

### Requirement: Phone is optional for inquiry submission
The `/api/contact` route SHALL accept submissions in which the `phone` field is absent, empty, or whitespace-only. The presence of `phone` SHALL NOT be a validation prerequisite. When provided, `phone` SHALL be passed through to both outgoing emails unchanged; when absent, the emails SHALL omit the phone line (or display a clear "—" placeholder), and the route SHALL otherwise proceed normally.

#### Scenario: Submission without phone is accepted
- **WHEN** the API receives a request with all required fields present and `phone` empty
- **THEN** validation passes and the dual email send proceeds

#### Scenario: Submission with phone is unchanged
- **WHEN** the API receives a request with a non-empty `phone`
- **THEN** validation passes and the phone value is included in both outgoing emails

#### Scenario: Owner email handles missing phone gracefully
- **WHEN** the owner notification email renders for a submission without phone
- **THEN** the email omits the phone row or renders a clear placeholder, without producing the literal string "undefined" or "null"

### Requirement: Contact form mirrors phone-optional treatment
The on-page `/contact` form SHALL label the phone field with locale-aware "(optional)" wording and SHALL NOT block submission on an empty phone field.

#### Scenario: Contact-page phone field is labeled optional
- **WHEN** the `/contact` page is rendered in any supported locale
- **THEN** the phone field's label includes a locale-aware "(optional)" suffix (e.g., "Telefon (opcjonalnie)" in Polish, "Phone (optional)" in English)

#### Scenario: Contact-page form accepts empty phone
- **WHEN** the user submits the `/contact` form with name, email, dates, guests, and message valid but phone empty
- **THEN** the submission is sent to `/api/contact` and the API accepts it

