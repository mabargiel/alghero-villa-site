## ADDED Requirements

### Requirement: Privacy and cookie policy page exists
The site SHALL have a `/privacy` route under the `[locale]` segment that displays a privacy and cookie policy.

#### Scenario: Visitor navigates to privacy page
- **WHEN** a visitor navigates to `/<locale>/privacy`
- **THEN** a page SHALL be rendered containing the privacy and cookie policy content

### Requirement: Privacy policy content covers GDPR essentials
The privacy policy page SHALL include the following sections: data controller identity and contact, what personal data is collected, purpose and legal basis for processing, cookie usage details (which cookies, what they do, duration), third-party data sharing (Meta/FastTony), data retention period, user rights (access, rectification, erasure, portability, objection), and how to contact the data controller.

#### Scenario: Policy contains required GDPR sections
- **WHEN** a visitor views the privacy policy page
- **THEN** all required GDPR sections SHALL be present on the page

### Requirement: Privacy policy is localized
The privacy policy content SHALL be available in all supported locales (en, it, pl, es) via translation JSON files.

#### Scenario: Spanish visitor sees Spanish policy
- **WHEN** a visitor with locale `es` navigates to `/es/privacy`
- **THEN** the full policy content SHALL be displayed in Spanish

### Requirement: Privacy policy is linked from the cookie consent banner
The cookie consent banner SHALL include a link to the privacy policy page.

#### Scenario: Banner links to policy
- **WHEN** the consent banner is displayed
- **THEN** it SHALL contain a clickable link navigating to the privacy policy page in the current locale

### Requirement: Privacy policy is linked from the footer
The site footer SHALL include a link to the privacy policy page.

#### Scenario: Footer contains privacy link
- **WHEN** any page is rendered
- **THEN** the footer SHALL contain a "Privacy Policy" link navigating to `/<locale>/privacy`
