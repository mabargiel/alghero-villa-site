## MODIFIED Requirements

### Requirement: Production shows under construction
The system MUST display an "under construction" experience for all app routes in production, **except** for routes that have been fully implemented and explicitly excluded.

#### Scenario: Production route shows under construction
- **WHEN** a user visits any non-excluded app route in the production environment
- **THEN** the under construction experience is shown instead of the regular app

#### Scenario: Pricing route shows full page in production
- **WHEN** a user visits `/pricing` in the production environment
- **THEN** the full pricing page is shown (not the under construction page)
