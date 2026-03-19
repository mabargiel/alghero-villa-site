## ADDED Requirements

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
The `/api/contact` route SHALL send both an owner notification email and a visitor confirmation email upon successful validation. Both emails are sent via Resend.

#### Scenario: Successful submission
- **WHEN** all fields are valid and pass honeypot/rate-limit checks
- **THEN** the system sends one notification email to the owner and one confirmation email to the visitor

#### Scenario: Success state rendering
- **WHEN** the form state transitions to `success`
- **THEN** the component renders the success screen instead of the form fields and inline message
