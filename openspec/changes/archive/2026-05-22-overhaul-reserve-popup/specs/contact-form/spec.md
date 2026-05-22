## ADDED Requirements

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
