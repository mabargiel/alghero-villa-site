## MODIFIED Requirements

### Requirement: API route sends two emails on valid submission
The `/api/contact` route SHALL send both an owner notification email and a visitor confirmation email upon successful validation. Both emails are sent via Resend.

#### Scenario: Successful submission
- **WHEN** all fields are valid and pass honeypot/rate-limit checks
- **THEN** the system sends one notification email to the owner and one confirmation email to the visitor

#### Scenario: Success state rendering
- **WHEN** the form state transitions to `success`
- **THEN** the component renders the success screen instead of the form fields and inline message
