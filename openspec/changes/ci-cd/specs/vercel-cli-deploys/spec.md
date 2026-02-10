## ADDED Requirements

### Requirement: Vercel Git-based deployments
The system MUST deploy the app using Vercel Git integration with explicit production and preview environment mapping.

#### Scenario: Production deploy uses main branch
- **WHEN** changes are pushed to `main`
- **THEN** the deployment is created as a production deployment

#### Scenario: Dev deploy uses dev branch
- **WHEN** changes are pushed to `dev`
- **THEN** the deployment is created as a preview deployment

### Requirement: Centralized deploy source
The system MUST use Vercel Git integration as the sole deployment mechanism for app releases.

#### Scenario: Deploys originate from Vercel Git integration
- **WHEN** changes are pushed to `main` or `dev`
- **THEN** the deployment is executed by Vercel Git integration
