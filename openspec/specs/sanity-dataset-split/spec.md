## ADDED Requirements

### Requirement: Separate dev and production datasets
The system MUST maintain separate Sanity datasets named `dev` and `production`.

#### Scenario: Both datasets exist
- **WHEN** the Sanity project is configured
- **THEN** both `dev` and `production` datasets are available

### Requirement: App uses dev dataset for previews
The system MUST use the `dev` dataset for preview deployments.

#### Scenario: Preview build uses dev dataset
- **WHEN** the app build runs for a preview deployment
- **THEN** the Sanity client uses the `dev` dataset

### Requirement: App uses production dataset for production
The system MUST use the `production` dataset for production deployments.

#### Scenario: Production build uses production dataset
- **WHEN** the app build runs for a production deployment
- **THEN** the Sanity client uses the `production` dataset

### Requirement: CMS deploys target dataset by environment
The system MUST deploy the CMS Studio to `dev` for PR previews and to `production` for `main`.

#### Scenario: CMS deploy targets dev
- **WHEN** a PR preview deploy runs for the CMS
- **THEN** the Studio deploy uses the `dev` dataset

#### Scenario: CMS deploy targets production
- **WHEN** a deployment runs on `main`
- **THEN** the Studio deploy uses the `production` dataset
