## Context

Two repositories (app and CMS) need centralized CI/CD, enforced quality gates, and controlled releases. App deployments should be triggered from GitHub Actions (Vercel CLI) for both PR previews and production on `main`, so previews only deploy after CI passes. Production should display an "under construction" experience while development proceeds via previews. The CMS uses a single Sanity Studio with two datasets (`dev` and `production`) and deploys to `dev` on PR previews and `production` on `main` updates. Branch protection and required checks must be configured in GitHub, and some prerequisites (tokens, domains, secrets) must be completed manually by the user.

## Goals / Non-Goals

**Goals:**
- Enforce PR-only merges and required CI checks on `main` for both repos.
- Run lint/build checks on PRs for the app and build checks for the CMS.
- Use branch-based deployments: `main` → production, PR previews for the app.
- Use GitHub Actions as the deployment mechanism for the app, with Vercel CLI.
- Use two Sanity datasets (`dev`, `production`) with the Studio deploying to `dev` for PR previews and `production` for `main`.
- Show an "under construction" experience on production (`main`) and serve the full app on preview deployments.
- Remove app-level basic auth and rely on Vercel preview access for non-production.

**Non-Goals:**
- Create additional branches or datasets for dev.
- Implement product analytics (tracked separately from CI/CD).
- Migrate or redesign application code.

## Decisions

- Use GitHub Actions workflows in each repo for CI and deploys to keep a single, auditable deployment path.
  - Alternative: rely on Vercel Git integration. Rejected because it deploys previews even when CI fails.
- Use branch-based deploys for the app (`main` production, PR previews) using Vercel CLI in GitHub Actions.
  - Alternative: tag-based deploys. Rejected to simplify the release process.
- Deploy CMS Studio on PR previews to `dev` and on `main` updates to `production`.
  - Alternative: deploy only on `main`. Rejected to keep dev previews aligned with the dev dataset.
- Keep separate datasets to isolate preview content from production.
  - Alternative: single dataset. Rejected due to preview/prod separation needs.
- Use environment-based gating to show the under construction experience only on production.
  - Alternative: separate under-construction branch. Rejected to avoid extra branches.
- Remove basic auth middleware and rely on Vercel preview access.
  - Alternative: keep basic auth. Rejected because preview access already controls visibility.
  - Alternative: separate dev dataset. Rejected due to simplicity requirements.

## Risks / Trade-offs

- Branch-based deploys require care when merging to `main` → Mitigation: enforce PR checks and reviews.
- GitHub Actions deploys require secrets for Vercel CLI → Mitigation: store org/project IDs and token in repo secrets.
- Dataset split introduces duplication and content drift risk → Mitigation: keep dev dataset minimal and periodically sync if needed.
- Under construction gating must cover all routes to avoid leaking content on production → Mitigation: route-level guard in middleware and an explicit under construction route.
- Manual prerequisite steps (domains, tokens for CMS deploy, GitHub secrets) can block CI → Mitigation: include a checklist and verify secrets before enabling required checks.

## Migration Plan

1. User completes prerequisites (domains, Sanity datasets, GitHub secrets).
2. Disable Vercel Git integration for the app (avoid duplicate deploys).
3. Add GitHub Actions workflows for app CI + deploy and CMS deploy on PRs (`dev`) and `main` (`production`).
4. Configure required status checks and branch protection on `main` for both repos.
5. Validate preview deploy from a PR to `main` (app only).
6. Validate production deploy from `main` (app under construction + CMS).
7. Remove or disable any Azure Pipelines checks and pipelines.

Rollback: remove/disable workflows and re-enable Vercel Git integration if needed.

## Open Questions

- Should the CMS use a separate Studio hostname for dev, or reuse the same host with dataset switching?
- Do we want any additional preview branch beyond PR previews to `main`?
- Should the under construction page allow any public paths besides assets/robots/sitemap?
