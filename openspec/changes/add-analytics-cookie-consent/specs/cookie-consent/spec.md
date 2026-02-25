## ADDED Requirements

### Requirement: Cookie consent banner is displayed on first visit
The site SHALL display a cookie consent banner at the bottom of the viewport when a visitor has not yet made a consent choice.

#### Scenario: First-time visitor sees the banner
- **WHEN** a visitor loads any page and no consent value exists in localStorage
- **THEN** a fixed-position banner SHALL appear at the bottom of the screen with: explanation text, an "Accept" button, a "Reject" button, and a link to the privacy policy page

#### Scenario: Returning visitor with stored consent does not see the banner
- **WHEN** a visitor loads any page and a consent value (`"granted"` or `"denied"`) exists in localStorage under key `cookie-consent`
- **THEN** the banner SHALL NOT be displayed

### Requirement: Consent banner text is localized
The banner text, button labels, and privacy policy link text SHALL be available in all supported locales (en, it, pl, es).

#### Scenario: Italian visitor sees Italian banner
- **WHEN** a visitor with locale `it` sees the consent banner
- **THEN** all banner text SHALL be displayed in Italian

### Requirement: Accepting consent loads marketing scripts
When the visitor clicks "Accept", the site SHALL store `"granted"` in localStorage under key `cookie-consent` and immediately load marketing tracking scripts (FastTony pixel).

#### Scenario: Visitor accepts cookies
- **WHEN** a visitor clicks the "Accept" button on the consent banner
- **THEN** localStorage key `cookie-consent` SHALL be set to `"granted"`
- **AND** the consent banner SHALL be dismissed
- **AND** the FastTony pixel script SHALL be loaded

### Requirement: Rejecting consent does not load marketing scripts
When the visitor clicks "Reject", the site SHALL store `"denied"` in localStorage under key `cookie-consent` and SHALL NOT load any marketing tracking scripts.

#### Scenario: Visitor rejects cookies
- **WHEN** a visitor clicks the "Reject" button on the consent banner
- **THEN** localStorage key `cookie-consent` SHALL be set to `"denied"`
- **AND** the consent banner SHALL be dismissed
- **AND** no marketing tracking scripts SHALL be loaded

### Requirement: FastTony pixel loads only after consent is granted
The FastTony pixel script (`https://pixel.fasttony.com/ae3a14b9d5b54ee3b7fe46d18c346c55`) SHALL only be added to the DOM when the consent state is `"granted"`. It SHALL use Next.js `<Script strategy="afterInteractive">`.

#### Scenario: Granted consent on page load
- **WHEN** a visitor loads a page and localStorage `cookie-consent` is `"granted"`
- **THEN** the FastTony pixel `<script>` tag SHALL be present in the DOM

#### Scenario: Denied consent on page load
- **WHEN** a visitor loads a page and localStorage `cookie-consent` is `"denied"`
- **THEN** the FastTony pixel `<script>` tag SHALL NOT be present in the DOM

### Requirement: Visitors can change their consent preference
The site SHALL provide a mechanism for visitors to re-open the consent banner and change their choice.

#### Scenario: Footer link re-opens banner
- **WHEN** a visitor clicks the "Cookie preferences" link in the site footer
- **THEN** the consent banner SHALL be displayed again regardless of current stored preference

#### Scenario: Changing from denied to granted
- **WHEN** a visitor re-opens the banner and clicks "Accept"
- **THEN** localStorage `cookie-consent` SHALL be updated to `"granted"`
- **AND** the FastTony pixel SHALL be loaded

### Requirement: Consent state is provided via React context
A `ConsentProvider` component SHALL wrap the locale layout content and provide the current consent state and an updater function via React context.

#### Scenario: Child components can read consent state
- **WHEN** a component inside the locale layout reads from the consent context
- **THEN** it SHALL receive the current consent value (`null`, `"granted"`, or `"denied"`) and a function to update it
