## ADDED Requirements

### Requirement: Localized HTML confirmation email sent to visitor
The system SHALL send an HTML confirmation email to the visitor's email address after a successful form submission. The email MUST be rendered using React Email components and sent via Resend. The email content MUST be localized based on the locale submitted with the form.

#### Scenario: Visitor submits enquiry in Italian
- **WHEN** a visitor submits the contact form with locale `it`
- **THEN** the system sends an HTML email to the visitor's email address with Italian content

#### Scenario: Invalid locale falls back to English
- **WHEN** the API receives a locale not in the supported list
- **THEN** the confirmation email is sent using English (`en`) translations

### Requirement: Confirmation email content
The confirmation email MUST contain a greeting with the visitor's first name, a thank-you message, and a statement that someone will contact them soon. The email MUST include the villa's contact details (phone and email). The email MUST NOT echo back any of the visitor's submitted form data (message, dates, phone, etc.).

#### Scenario: Email content structure
- **WHEN** a visitor named "Maria" submits an enquiry
- **THEN** the email contains a personalized greeting ("Thank you, Maria!"), an acknowledgment of the enquiry, a promise of follow-up, and the villa's contact phone number and email address

### Requirement: Confirmation email branding
The confirmation email MUST display the villa's favicon image (`favicon.png`) in the header, referenced via absolute URL to the production domain. The email MUST include "Villa Monte Calvia" and "Alghero, Sardinia" in the footer.

#### Scenario: Logo renders in email
- **WHEN** the confirmation email is received by the visitor
- **THEN** the email header displays the favicon image loaded from the site's public URL

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
