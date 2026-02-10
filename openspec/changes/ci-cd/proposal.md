## Why

The project needs consistent, centralized CI/CD and governance across both repos, with reliable, tag-based releases and required quality gates. Doing this now prevents ad-hoc deployments and enforces repeatable releases as the site goes live.

## What Changes

- Introduce GitHub Actions CI for app and CMS repos with required checks.
- Use branch-based deployments: `main` for production, PRs to `main` for preview.
- Deploy the app from GitHub Actions (Vercel CLI) so previews only happen after CI passes.
- Deploy Sanity Studio to `production` on `main` updates and to `dev` on PR previews.
- Show an "under construction" experience on production while development continues via PR previews.
- Remove basic auth gating from the app (preview access is handled by Vercel).
- Remove/disable Azure Pipelines (if configured remotely).
- Add branch protection rules to block direct pushes to `main` and require checks.

## Capabilities

### New Capabilities
- `ci-quality-gates`: CI workflows with lint/build checks and required status checks for PRs in both repos.
- `branch-release-deploys`: Branch-driven deployments for app (prod on `main`, preview on PRs) and CMS (prod on `main`, dev on PRs).
- `branch-protection-governance`: Enforced PR-only merges and required checks on `main` for both repos.
- `vercel-branch-deploys`: GitHub Actions-driven Vercel deploys keyed off `main` and PR previews.
- `sanity-dataset-split`: Separate `dev` and `production` datasets with environment-based configuration.
- `under-construction-mode`: Production-only under construction experience for the app.
- `access-control-removal`: Remove app-level basic auth in favor of Vercel preview access.

### Modified Capabilities
- None.

## Impact

- GitHub Actions workflows in both repos.
- GitHub repository settings for branch protection.
- Vercel configuration (projects, domains, tokens).
- Sanity Studio deploy credentials and host configuration.
- Removal/disablement of any Azure Pipelines configuration or required status checks.
