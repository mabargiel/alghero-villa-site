## ADDED Requirements

### Requirement: Production shows under construction
The system MUST display an "under construction" experience for all app routes in production.

#### Scenario: Production route shows under construction
- **WHEN** a user visits any app route in the production environment
- **THEN** the under construction experience is shown instead of the regular app

### Requirement: Dev shows full app
The system MUST display the full app experience in the `dev` environment.

#### Scenario: Dev route shows full app
- **WHEN** a user visits any app route in the `dev` environment
- **THEN** the regular app is shown

### Requirement: Under construction page is accessible
The system MUST expose a dedicated under construction page route.

#### Scenario: Under construction route resolves
- **WHEN** a user visits the under construction route
- **THEN** the under construction page renders successfully
