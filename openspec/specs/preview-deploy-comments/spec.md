## ADDED Requirements

### Requirement: Preview deploy comments on PRs
The system MUST post a PR comment with the preview deployment URL after a successful preview deploy.

#### Scenario: Preview deploy posts comment
- **WHEN** a preview deployment completes successfully for a pull request
- **THEN** a comment is added to the PR with the preview URL
