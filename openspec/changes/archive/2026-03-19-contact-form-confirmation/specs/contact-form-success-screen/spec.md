## ADDED Requirements

### Requirement: Success screen replaces form on successful submission
When the contact form submission succeeds, the form content SHALL be replaced with a full success screen. The success screen SHALL display a large circular checkmark icon, a thank-you heading, a message that someone will be in touch shortly, a note about the confirmation email, and a CTA button linking to the villa page.

#### Scenario: Form submitted successfully
- **WHEN** the contact form API returns a successful response
- **THEN** the form fields, submit button, and inline message are replaced with the success screen

#### Scenario: Success screen content
- **WHEN** the success screen is displayed
- **THEN** it shows a checkmark icon, a heading (e.g., "Thank you!"), a body message about being contacted shortly, a note about a confirmation email sent to their inbox, and a button labelled "Explore the villa"

### Requirement: Success screen is visually prominent
The success screen SHALL be vertically centered within the form container with generous padding. The checkmark icon SHALL be large enough to be immediately noticeable. The heading SHALL use a larger font size than the form labels.

#### Scenario: Mobile visibility
- **WHEN** the success screen is displayed on a mobile viewport
- **THEN** the checkmark icon, heading, and message are all visible without scrolling within the form container area

### Requirement: Success screen CTA navigates to villa page
The success screen SHALL include a CTA button that navigates to the `/villa` page using locale-aware routing.

#### Scenario: User clicks CTA
- **WHEN** a user clicks the "Explore the villa" button on the success screen
- **THEN** they are navigated to the `/villa` page in their current locale
