## MODIFIED Requirements

### Requirement: Owner notification email includes all enquiry details
The owner notification email SHALL be rendered as HTML using React Email components instead of plain text. The email MUST include the visitor's first name, email, phone, arrival date, departure date, number of guests, and message. The email MUST set `replyTo` to the visitor's email address. The email MUST display the villa's favicon image in the header.

#### Scenario: Owner receives HTML notification with all fields
- **WHEN** a visitor submits the contact form with all fields filled
- **THEN** the owner receives an HTML email containing the visitor's name, email, phone, arrival date, departure date, guest count, and full message text

#### Scenario: Owner replies to notification
- **WHEN** the owner clicks "Reply" on the notification email
- **THEN** the reply is addressed to the visitor's email (via `replyTo`)
