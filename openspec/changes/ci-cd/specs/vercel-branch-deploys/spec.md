## ADDED Requirements

### Requirement: GitHub Actions-driven Vercel deploys
The system MUST deploy the app using GitHub Actions with Vercel CLI for both preview and production.

#### Scenario: Production deploy uses main branch
- **WHEN** changes are pushed to `main`
- **THEN** GitHub Actions deploys a production build via Vercel CLI

#### Scenario: Preview deploy uses PRs
- **WHEN** a pull request targeting `main` is opened or updated
- **THEN** GitHub Actions deploys a preview build via Vercel CLI

### Requirement: Centralized deploy source
The system MUST use GitHub Actions as the sole deployment mechanism for app releases.

#### Scenario: Deploys originate from GitHub Actions
- **WHEN** changes are pushed to `main` or PRs are opened/updated
- **THEN** the deployment is executed by GitHub Actions
