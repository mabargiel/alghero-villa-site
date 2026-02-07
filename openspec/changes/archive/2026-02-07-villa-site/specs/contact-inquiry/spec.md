## ADDED Requirements

### Requirement: Inquiry form fields
The system SHALL provide an inquiry form with required fields for name and email, and optional fields for phone, message, dates (from/to), and number of guests.

#### Scenario: Form fields present
- **WHEN** a visitor opens the Contact page
- **THEN** the required and optional fields are visible and labeled

### Requirement: Validation and error states
The system SHALL validate required fields and email format, showing clear error messages without losing entered data.

#### Scenario: Invalid email
- **WHEN** a visitor submits the form with an invalid email
- **THEN** the form shows an error message and the submission is not sent

### Requirement: Successful submission
The system SHALL send the inquiry via a configured email provider and display a success confirmation.

#### Scenario: Valid submission
- **WHEN** a visitor submits valid inquiry data
- **THEN** the system sends the email and shows a success message

### Requirement: Spam protection
The system SHALL include a honeypot field and basic rate limiting to deter automated spam submissions.

#### Scenario: Honeypot triggered
- **WHEN** the honeypot field is filled
- **THEN** the system rejects the submission without sending email
