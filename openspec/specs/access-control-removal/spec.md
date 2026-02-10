## ADDED Requirements

### Requirement: Remove app-level basic auth
The system MUST NOT require HTTP basic authentication to access the app.

#### Scenario: No basic auth prompt
- **WHEN** a user visits any app route
- **THEN** the app does not prompt for HTTP basic authentication
