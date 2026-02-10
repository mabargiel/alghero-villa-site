## Context

Two repositories (app and CMS) need centralized CI/CD, enforced quality gates, and controlled releases. App deployments should use Vercel's Git integration with branch-based environments (`main` → production, `dev` → preview). The CMS uses a single Sanity Studio and production dataset with deploys on `main` updates. Branch protection and required checks must be configured in GitHub, and some prerequisites (tokens, domains, secrets) must be completed manually by the user.

## Goals / Non-Goals

**Goals:**
- Enforce PR-only merges and required CI checks on `main` for both repos.
- Run lint/build checks on PRs for the app and build checks for the CMS.
- Use branch-based deployments: `main` → production, `dev` → preview for the app.
- Keep Vercel Git integration as the deployment mechanism for the app.
- Keep a single Sanity Studio and dataset, deployed only on production tags.

**Non-Goals:**
- Create additional branches or datasets for dev.
- Implement product analytics (tracked separately from CI/CD).
- Migrate or redesign application code.

## Decisions

- Use GitHub Actions workflows in each repo for CI and deploys to keep a single, auditable deployment path.
  - Alternative: rely on Vercel Git integration. Rejected to avoid dual sources of truth.
- Use branch-based deploys for the app (`main` production, `dev` preview) using Vercel Git integration.
  - Alternative: tag-based deploys. Rejected to simplify the release process.
- Deploy CMS Studio on `main` updates only.
  - Alternative: deploy on `dev` as well. Rejected to keep CMS deploys minimal.
- Keep a single Sanity production dataset to reduce operational complexity.
  - Alternative: separate dev dataset. Rejected due to simplicity requirements.

## Risks / Trade-offs

- Branch-based deploys require care when merging to `main` → Mitigation: enforce PR checks and reviews.
- Single dataset means dev site reads production data → Mitigation: limit dev site exposure; avoid publishing unreviewed content.
- Manual prerequisite steps (domains, tokens for CMS deploy, GitHub secrets) can block CI → Mitigation: include a checklist and verify secrets before enabling required checks.

## Migration Plan

1. User completes prerequisites (domains, Sanity deploy readiness, GitHub secrets).
2. Configure Vercel Git integration: `main` → production, `dev` → preview.
3. Add GitHub Actions workflows for CI and CMS deploy on `main`.
4. Configure required status checks and branch protection on `main` for both repos.
5. Validate dev preview deploy from `dev` branch (app only).
6. Validate production deploy from `main` (app + CMS).
7. Remove or disable any Azure Pipelines checks and pipelines.

Rollback: remove/disable workflows and revert branch protection; re-enable Vercel Git integration if needed.

## Open Questions

- Should CMS deploys run on `dev` as well, or remain `main` only (current decision: `main` only)?
- Do we want optional PR previews for the app beyond the `dev` branch?
