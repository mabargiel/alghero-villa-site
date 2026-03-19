## ADDED Requirements

### Requirement: Success screen translation keys
All 6 locale files SHALL include translation keys in the `contact` namespace for the success screen: `successTitle` (thank-you heading), `successMessage` (we will contact you shortly), `successEmailNote` (confirmation email sent to inbox), and `successCta` (explore the villa button label).

#### Scenario: English locale has success screen keys
- **WHEN** the success screen renders with locale `en`
- **THEN** it displays "Thank you!" as heading, "We will get back to you shortly." as message, "A confirmation email has been sent to your inbox." as email note, and "Explore the villa" as the CTA button

#### Scenario: Italian locale has success screen keys
- **WHEN** the success screen renders with locale `it`
- **THEN** all success screen texts display in Italian

#### Scenario: All 6 locales have success screen keys
- **WHEN** any of the 6 supported locales (en, it, pl, es, fr, de) is active
- **THEN** the success screen renders fully translated content with no missing keys
