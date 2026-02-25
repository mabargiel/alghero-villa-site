## MODIFIED Requirements

### Requirement: PR checks for app repository
The system MUST run lint and build checks for pull requests in the app repository and report results as required status checks. The system MUST skip checks when only non-code files change (markdown, LICENSE, OpenSpec artifacts).

#### Scenario: App PR checks succeed
- **WHEN** a pull request is opened or updated in the app repository with code changes
- **THEN** lint and build workflows execute and report successful status checks

#### Scenario: App PR checks fail
- **WHEN** lint or build fails for a pull request in the app repository
- **THEN** the corresponding required status check reports failure

#### Scenario: App PR checks skipped for docs-only changes
- **WHEN** a pull request only modifies markdown files, LICENSE, or files under openspec/
- **THEN** the build and lint workflows do not execute

## ADDED Requirements

### Requirement: SonarCloud workflow in correct location
The SonarCloud GitHub Actions workflow MUST reside at `.github/workflows/sonarcloud.yml` (repo root) so GitHub Actions can discover and execute it.

#### Scenario: SonarCloud workflow runs on PR
- **WHEN** a pull request is opened or updated with code changes
- **THEN** the SonarCloud workflow at `.github/workflows/sonarcloud.yml` executes

#### Scenario: SonarCloud workflow skipped for docs-only changes
- **WHEN** a pull request only modifies markdown files, LICENSE, or files under openspec/
- **THEN** the SonarCloud workflow does not execute

### Requirement: SonarCloud workflow correct working directory
The SonarCloud workflow MUST run `npm ci` with `working-directory: app` since the package.json resides in the `app/` subdirectory.

#### Scenario: npm ci installs dependencies correctly
- **WHEN** the SonarCloud workflow runs
- **THEN** `npm ci` executes in the `app/` directory and installs dependencies successfully
