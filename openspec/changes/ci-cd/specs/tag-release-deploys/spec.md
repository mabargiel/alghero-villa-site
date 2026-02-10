## ADDED Requirements

### Requirement: Production deploys on main
The system MUST deploy production releases when changes land on the `main` branch.

#### Scenario: Main branch triggers production deploy
- **WHEN** changes are pushed to `main`
- **THEN** the production deployment runs for the target service

### Requirement: Dev app deploys on dev branch
The system MUST deploy the app to the dev environment when changes land on the `dev` branch.

#### Scenario: Dev branch triggers app deploy
- **WHEN** changes are pushed to the `dev` branch of the app repository
- **THEN** the dev deployment runs for the app

### Requirement: CMS deploys only on main
The system MUST deploy the CMS Studio only for `main` and MUST NOT deploy it for `dev`.

#### Scenario: CMS deploy skipped on dev branch
- **WHEN** changes are pushed to the `dev` branch of the CMS repository
- **THEN** no CMS deployment executes
