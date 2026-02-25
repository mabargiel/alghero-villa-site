## ADDED Requirements

### Requirement: Contact form new field translation keys
All 6 locale files SHALL include translation keys for the new contact form fields: arrival date label, departure date label, guests label (with "including children" clarification), and message label/placeholder.

#### Scenario: Italian locale has new contact keys
- **WHEN** the contact form renders with locale `it`
- **THEN** all new field labels display in Italian

### Requirement: Confirmation email translation keys
All 6 locale files SHALL include a `confirmationEmail` namespace with keys for: greeting (with `{firstName}` interpolation), thank-you body text, follow-up promise text, and contact section header.

#### Scenario: German confirmation email uses translations
- **WHEN** a visitor submits from `/de/contact`
- **THEN** the confirmation email uses German translations from the `confirmationEmail` namespace

### Requirement: Owner notification email translation keys
All 6 locale files SHALL include an `ownerEmail` namespace with keys for the email subject line (with `{firstName}` interpolation) and section labels (contact details, stay details, message).

#### Scenario: Owner email subject includes visitor name
- **WHEN** visitor "Marco" submits an enquiry
- **THEN** the owner email subject uses the `ownerEmail.subject` key interpolated with "Marco"
