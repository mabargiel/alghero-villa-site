## ADDED Requirements

### Requirement: ViewContent event on contact page
The system SHALL fire `fbq('track', 'ViewContent', { content_name: 'Contact Page' })` when the contact page mounts and the Facebook Pixel is available.

#### Scenario: User visits contact page with consent granted
- **WHEN** a user navigates to the contact page and cookie consent has been granted (pixel is loaded)
- **THEN** the system fires a `ViewContent` event with `content_name: 'Contact Page'`

#### Scenario: User visits contact page without consent
- **WHEN** a user navigates to the contact page and cookie consent has not been granted (pixel is not loaded)
- **THEN** no `ViewContent` event is fired

### Requirement: Contact event on form submission
The system SHALL fire `fbq('track', 'Contact')` when the contact form is submitted successfully and the Facebook Pixel is available.

#### Scenario: Successful form submission with consent granted
- **WHEN** a user submits the contact form and the server responds with success, and the pixel is loaded
- **THEN** the system fires a `Contact` event

#### Scenario: Failed form submission
- **WHEN** a user submits the contact form and the server responds with an error
- **THEN** no `Contact` event is fired

#### Scenario: Successful form submission without consent
- **WHEN** a user submits the contact form successfully but cookie consent has not been granted
- **THEN** no `Contact` event is fired

### Requirement: TypeScript type declaration for fbq
The system SHALL provide a global TypeScript type declaration for the `fbq` function so that event calls compile without errors or suppressions.

#### Scenario: fbq calls compile cleanly
- **WHEN** the project is compiled with `tsc`
- **THEN** all `fbq()` calls in `ContactForm.tsx` compile without type errors
