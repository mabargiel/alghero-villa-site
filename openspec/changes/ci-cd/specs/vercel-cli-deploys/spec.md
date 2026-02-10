## ADDED Requirements

### Requirement: Explicit Vercel project targeting
The system MUST deploy using Vercel CLI with explicit project IDs for production and dev deployments.

#### Scenario: Production deploy uses prod project ID
- **WHEN** a production tag deploy is triggered
- **THEN** the deployment uses the configured production Vercel project ID

#### Scenario: Dev deploy uses dev project ID
- **WHEN** a dev tag deploy is triggered
- **THEN** the deployment uses the configured dev Vercel project ID

### Requirement: Centralized deploy source
The system MUST use GitHub Actions as the sole deployment mechanism for app releases.

#### Scenario: Deploys originate from GitHub Actions
- **WHEN** a production or dev tag triggers an app deploy
- **THEN** the deployment is executed by GitHub Actions and not by Vercel Git integration
