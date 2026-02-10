## ADDED Requirements

### Requirement: PR checks for app repository
The system MUST run lint and build checks for pull requests in the app repository and report results as required status checks.

#### Scenario: App PR checks succeed
- **WHEN** a pull request is opened or updated in the app repository
- **THEN** lint and build workflows execute and report successful status checks

#### Scenario: App PR checks fail
- **WHEN** lint or build fails for a pull request in the app repository
- **THEN** the corresponding required status check reports failure

### Requirement: PR checks for CMS repository
The system MUST run a build check for pull requests in the CMS repository and report results as required status checks.

#### Scenario: CMS PR checks succeed
- **WHEN** a pull request is opened or updated in the CMS repository
- **THEN** the build workflow executes and reports a successful status check

#### Scenario: CMS PR checks fail
- **WHEN** the build fails for a pull request in the CMS repository
- **THEN** the required status check reports failure

### Requirement: Required checks gate merges
The system MUST prevent merging pull requests into `main` unless all required status checks pass.

#### Scenario: Merge blocked with failing checks
- **WHEN** a pull request has any required check in a failing or pending state
- **THEN** merge into `main` is blocked
