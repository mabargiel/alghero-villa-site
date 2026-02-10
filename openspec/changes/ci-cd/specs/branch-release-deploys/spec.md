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

### Requirement: CMS deploys only on main
The system MUST deploy the CMS Studio only for `main` and MUST NOT deploy it for PR previews.

#### Scenario: CMS deploy skipped on PR preview
- **WHEN** a pull request is opened or updated for the CMS repository
- **THEN** no CMS deployment executes
