## 1. CI Workflow Fixes

- [x] 1.1 Move `app/.github/workflows/sonarcloud.yml` to `.github/workflows/sonarcloud.yml`
- [x] 1.2 Fix SonarCloud workflow: add `working-directory: app` for `npm ci` step
- [x] 1.3 Add `paths-ignore` to SonarCloud workflow (`openspec/**`, `**.md`, `LICENSE`) for both push and pull_request triggers
- [x] 1.4 Add `**.md` and `LICENSE` to existing `paths-ignore` in `.github/workflows/app-ci.yml`
- [x] 1.5 Delete `app/.github/workflows/sonarcloud.yml`

## 2. README

- [x] 2.1 Create `README.md` at repo root with badge row (GitHub Actions build, SonarCloud quality gate, Vercel deploy)
- [x] 2.2 Add project description and tech stack table
- [x] 2.3 Add architecture overview section (frontend/CMS separation, Vercel, CI)
- [x] 2.4 Add development workflow section mentioning OpenSpec
- [x] 2.5 Add links section (live site, CMS repo, OpenSpec directory)
