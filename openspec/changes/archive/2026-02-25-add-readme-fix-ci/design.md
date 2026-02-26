## Context

The repo is public at `github.com/mabargiel/alghero-villa-site`. The current README is two lines. The project uses Next.js 16 + Sanity CMS (separate repo at `github.com/mabargiel/alghero-villa-cms`), deployed via Vercel, with SonarCloud for code quality.

Two CI workflows exist:
- `.github/workflows/app-ci.yml` — lint, build, Vercel deploy. Already ignores `openspec/**` but not docs.
- `app/.github/workflows/sonarcloud.yml` — SonarCloud scan. Has no path filtering and lives in the wrong directory (GitHub Actions only reads `.github/workflows/` at repo root). SonarCloud analysis currently runs via the SonarCloud GitHub App's Automatic Analysis feature, not this workflow file.

## Goals / Non-Goals

**Goals:**
- Professional README that showcases tech stack, architecture, and engineering practices
- CI pipelines skip on docs-only changes (markdown, LICENSE)
- Consolidate all workflows into `.github/workflows/` at repo root
- Fix SonarCloud workflow so it can actually run as a GitHub Action

**Non-Goals:**
- Changing pipeline logic (jobs, steps, deploy targets)
- Adding new CI checks
- Disabling SonarCloud Automatic Analysis (can coexist or be toggled separately by the user)

## Decisions

### README structure
A clean portfolio-style README with:
1. **Badge row** at top — Vercel (custom shield), SonarCloud Quality Gate, GitHub Actions build status
2. **One-liner** project description
3. **Tech Stack** section as a categorized table
4. **Architecture** brief — frontend/CMS separation, Vercel hosting, CI pipeline
5. **Development Workflow** — mention OpenSpec with link to `openspec/` directory
6. **Links** — live site, CMS repo

**Rationale**: Employers scan READMEs quickly. Badges + table + brief architecture gives a professional impression without overloading. No "Getting Started" section — this is a showcase, not a template.

### Badge sources
- **Build**: `https://github.com/mabargiel/alghero-villa-site/actions/workflows/app-ci.yml/badge.svg` (GitHub Actions native badge)
- **SonarCloud**: `https://sonarcloud.io/api/project_badges/measure?project=alghero-villa-site&metric=alert_status` (quality gate badge)
- **Vercel**: Custom shields.io badge linking to live site (Vercel has no official badge API)

### SonarCloud workflow relocation
Move `app/.github/workflows/sonarcloud.yml` → `.github/workflows/sonarcloud.yml`. Fix `npm ci` to use `working-directory: app`. Add the same `paths-ignore` pattern as `app-ci.yml` plus `**.md` and `LICENSE`.

**Rationale**: GitHub Actions only reads workflows from repo-root `.github/workflows/`. The current file in `app/.github/` is dead code.

### paths-ignore pattern
Both workflows get:
```yaml
paths-ignore:
  - "openspec/**"
  - "**.md"
  - "LICENSE"
```

**Rationale**: `**.md` covers README at root and any markdown anywhere. `openspec/**` was already on app-ci but missing from sonarcloud. `LICENSE` is a non-code file that shouldn't trigger builds.

## Risks / Trade-offs

- [SonarCloud duplicate scans] If both Automatic Analysis and the new workflow run, PRs get scanned twice → User can disable Automatic Analysis in SonarCloud dashboard after verifying the workflow runs correctly
- [Badge caching] shields.io and SonarCloud badges cache for a few minutes → Acceptable for a portfolio project
