## ADDED Requirements

### Requirement: PR-only merges on main
The system MUST prevent direct pushes to `main` in both repositories and require pull requests for all changes.

#### Scenario: Direct push is blocked
- **WHEN** a user attempts to push directly to `main`
- **THEN** the push is rejected by branch protection

### Requirement: Required checks for main
The system MUST require configured CI checks to pass before allowing merges into `main`.

#### Scenario: Required checks are enforced
- **WHEN** a pull request targets `main` with required checks configured
- **THEN** merge is blocked until all required checks pass
