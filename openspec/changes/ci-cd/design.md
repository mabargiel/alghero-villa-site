## Context

Two repositories (app and CMS) need centralized CI/CD, enforced quality gates, and controlled releases. Deployments should be driven by GitHub Actions instead of vendor-native Git integration. The app deploys to Vercel with two domains (prod and dev), while the CMS uses a single Sanity Studio and production dataset with deploys only on production tags. Branch protection and required checks must be configured in GitHub, and some prerequisites (tokens, projects, domains) must be completed manually by the user.

## Goals / Non-Goals

**Goals:**
- Enforce PR-only merges and required CI checks on `main` for both repos.
- Run lint/build checks on PRs for the app and build checks for the CMS.
- Use tag-based deployments: `vX.Y.Z` → production deploys; `vX.Y.Z-dev` → dev app deploys only.
- Centralize deployments in GitHub Actions (no Vercel auto-deploys).
- Keep a single Sanity Studio and dataset, deployed only on production tags.

**Non-Goals:**
- Create additional branches or datasets for dev.
- Implement product analytics (tracked separately from CI/CD).
- Migrate or redesign application code.

## Decisions

- Use GitHub Actions workflows in each repo for CI and deploys to keep a single, auditable deployment path.
  - Alternative: rely on Vercel Git integration. Rejected to avoid dual sources of truth.
- Use tag patterns (`vX.Y.Z` for prod, `vX.Y.Z-dev` for dev app) as the sole deployment triggers.
  - Alternative: branch-based deploys. Rejected to preserve a single-branch workflow.
- Deploy CMS Studio only on production tags because there is a single Studio and dataset.
  - Alternative: deploy on dev tags too. Rejected to avoid unnecessary deploys for a single Studio.
- Use Vercel CLI in GitHub Actions with explicit project IDs for prod/dev.
  - Alternative: single Vercel project with preview/prod. Rejected due to explicit domain split and tag mapping.
- Keep a single Sanity production dataset to reduce operational complexity.
  - Alternative: separate dev dataset. Rejected due to simplicity requirements.

## Risks / Trade-offs

- Tag-based deploys require discipline; accidental tags can trigger production releases → Mitigation: protect tag creation via permissions and release process guidance.
- Single dataset means dev site reads production data → Mitigation: limit dev site exposure; avoid publishing unreviewed content.
- Disabling Vercel Git integration removes automatic previews → Mitigation: optional PR preview workflow can be added later if needed.
- Manual prerequisite steps (tokens, domains, Vercel projects) can block CI → Mitigation: include a checklist and verify secrets before enabling required checks.

## Migration Plan

1. User completes prerequisites (tokens, Vercel projects/domains, Sanity deploy readiness, GitHub secrets).
2. Add GitHub Actions workflows for CI and tag-based deployments in both repos.
3. Configure required status checks and branch protection on `main` for both repos.
4. Disable Vercel Git auto-deploys or restrict them to avoid duplicate deployments.
5. Validate a dev deploy with a `vX.Y.Z-dev` tag (app only).
6. Validate a prod deploy with a `vX.Y.Z` tag (app + CMS).
7. Remove or disable any Azure Pipelines checks and pipelines.

Rollback: remove/disable workflows and revert branch protection; re-enable Vercel Git integration if needed.

## Open Questions

- Should dev deployments also run the CMS `sanity deploy`, or remain app-only (current decision: app-only)?
- Do we want optional PR preview deployments for the app (separate from release tags)?
- Who is allowed to create tags that trigger production deploys?
