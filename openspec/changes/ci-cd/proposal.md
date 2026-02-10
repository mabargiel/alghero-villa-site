## Why

The project needs consistent, centralized CI/CD and governance across both repos, with reliable, tag-based releases and required quality gates. Doing this now prevents ad-hoc deployments and enforces repeatable releases as the site goes live.

## What Changes

- Introduce GitHub Actions CI for app and CMS repos with required checks.
- Add tag-based deployment flow: `vX.Y.Z` triggers production deploys; `vX.Y.Z-dev` triggers dev app deploys only.
- Centralize app deployments in GitHub Actions (Vercel CLI) instead of Vercel Git integration.
- Deploy Sanity Studio only on production tags.
- Remove/disable Azure Pipelines (if configured remotely).
- Add branch protection rules to block direct pushes to `main` and require checks.

## Capabilities

### New Capabilities
- `ci-quality-gates`: CI workflows with lint/build checks and required status checks for PRs in both repos.
- `tag-release-deploys`: Tag-driven deployment workflows for app (dev/prod) and CMS (prod only).
- `branch-protection-governance`: Enforced PR-only merges and required checks on `main` for both repos.
- `vercel-cli-deploys`: GitHub Actions-driven deploys to Vercel dev/prod projects with explicit environment mapping.

### Modified Capabilities
- None.

## Impact

- GitHub Actions workflows in both repos.
- GitHub repository settings for branch protection.
- Vercel configuration (projects, domains, tokens).
- Sanity Studio deploy credentials and host configuration.
- Removal/disablement of any Azure Pipelines configuration or required status checks.
