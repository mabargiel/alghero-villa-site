## Context

Two repositories (app and CMS) need centralized CI/CD, enforced quality gates, and controlled releases. App deployments should use Vercel's Git integration with `main` for production and PR previews for development. Production should display an "under construction" experience while development proceeds via previews. The CMS uses a single Sanity Studio and production dataset with deploys on `main` updates. Branch protection and required checks must be configured in GitHub, and some prerequisites (tokens, domains, secrets) must be completed manually by the user.

## Goals / Non-Goals

**Goals:**
- Enforce PR-only merges and required CI checks on `main` for both repos.
- Run lint/build checks on PRs for the app and build checks for the CMS.
- Use branch-based deployments: `main` → production, PR previews for the app.
- Keep Vercel Git integration as the deployment mechanism for the app.
- Keep a single Sanity Studio and dataset, deployed only on `main` updates.
- Show an "under construction" experience on production (`main`) and serve the full app on preview deployments.
- Remove app-level basic auth and rely on Vercel preview access for non-production.

**Non-Goals:**
- Create additional branches or datasets for dev.
- Implement product analytics (tracked separately from CI/CD).
- Migrate or redesign application code.

## Decisions

- Use GitHub Actions workflows in each repo for CI and deploys to keep a single, auditable deployment path.
  - Alternative: rely on Vercel Git integration. Rejected to avoid dual sources of truth.
- Use branch-based deploys for the app (`main` production, PR previews) using Vercel Git integration.
  - Alternative: tag-based deploys. Rejected to simplify the release process.
- Deploy CMS Studio on `main` updates only.
  - Alternative: deploy on `dev` as well. Rejected to keep CMS deploys minimal.
- Keep a single Sanity production dataset to reduce operational complexity.
- Use environment-based gating to show the under construction experience only on production.
  - Alternative: separate under-construction branch. Rejected to avoid extra branches.
- Remove basic auth middleware and rely on Vercel preview access.
  - Alternative: keep basic auth. Rejected because preview access already controls visibility.
  - Alternative: separate dev dataset. Rejected due to simplicity requirements.

## Risks / Trade-offs

- Branch-based deploys require care when merging to `main` → Mitigation: enforce PR checks and reviews.
- Single dataset means dev site reads production data → Mitigation: limit dev site exposure; avoid publishing unreviewed content.
- Under construction gating must cover all routes to avoid leaking content on production → Mitigation: route-level guard in middleware and an explicit under construction route.
- Manual prerequisite steps (domains, tokens for CMS deploy, GitHub secrets) can block CI → Mitigation: include a checklist and verify secrets before enabling required checks.

## Migration Plan

1. User completes prerequisites (domains, Sanity deploy readiness, GitHub secrets).
2. Configure Vercel Git integration: `main` → production, PRs → preview.
3. Add GitHub Actions workflows for CI and CMS deploy on `main`.
4. Configure required status checks and branch protection on `main` for both repos.
5. Validate preview deploy from a PR to `main` (app only).
6. Validate production deploy from `main` (app under construction + CMS).
7. Remove or disable any Azure Pipelines checks and pipelines.

Rollback: remove/disable workflows and revert branch protection; re-enable Vercel Git integration if needed.

## Open Questions

- Should CMS deploys run on `dev` as well, or remain `main` only (current decision: `main` only)?
- Do we want any additional preview branch beyond PR previews to `main`?
- Should the under construction page allow any public paths besides assets/robots/sitemap?
