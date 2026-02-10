## ADDED Requirements

### Requirement: Production deploys on version tags
The system MUST deploy production releases when a Git tag matching `vX.Y.Z` is pushed.

#### Scenario: Production tag triggers deploy
- **WHEN** a Git tag matching `v1.0.0` is pushed to the repository
- **THEN** the production deployment workflow runs for the target service

### Requirement: Dev app deploys on dev tags
The system MUST deploy the app to the dev environment when a Git tag matching `vX.Y.Z-dev` is pushed.

#### Scenario: Dev tag triggers app deploy
- **WHEN** a Git tag matching `v1.0.0-dev` is pushed to the app repository
- **THEN** the dev deployment workflow runs for the app

### Requirement: CMS deploys only on production tags
The system MUST deploy the CMS Studio only for production tags and MUST NOT deploy it for dev tags.

#### Scenario: CMS deploy skipped on dev tag
- **WHEN** a Git tag matching `v1.0.0-dev` is pushed to the CMS repository
- **THEN** no CMS deployment workflow executes
