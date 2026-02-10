## ADDED Requirements

### Requirement: Production deploys on main
The system MUST deploy production releases when changes land on the `main` branch.

#### Scenario: Main branch triggers production deploy
- **WHEN** changes are pushed to `main`
- **THEN** the production deployment runs for the target service

### Requirement: Preview app deploys on PRs
The system MUST deploy the app to a preview environment when a pull request targets `main`.

#### Scenario: PR triggers preview deploy
- **WHEN** a pull request is opened or updated targeting `main`
- **THEN** a preview deployment runs for the app

### Requirement: CMS deploys on PR previews and main
The system MUST deploy the CMS Studio to `dev` for PR previews and to `production` for `main` updates.

#### Scenario: CMS deploy runs on PR preview
- **WHEN** a pull request is opened or updated for the CMS repository
- **THEN** a CMS deployment executes against the `dev` dataset

#### Scenario: CMS deploy runs on main
- **WHEN** changes are pushed to `main`
- **THEN** a CMS deployment executes against the `production` dataset
