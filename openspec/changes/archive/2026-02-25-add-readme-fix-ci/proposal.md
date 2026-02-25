## Why

The repository lacks a proper README — currently just two lines. As a public portfolio project, it needs a polished README showcasing the tech stack, architecture, and development workflow for potential employers. Additionally, CI workflows need path filtering so docs-only changes (like the README itself) don't trigger expensive build/deploy/scan pipelines.

## What Changes

- **Add a comprehensive README.md** at repo root with: badges (Vercel, SonarCloud quality gate, GitHub Actions build), tech stack table, architecture overview, OpenSpec workflow mention, links to live site and CMS repo
- **Move SonarCloud workflow** from `app/.github/workflows/sonarcloud.yml` to `.github/workflows/sonarcloud.yml` (current location is ignored by GitHub Actions; analysis runs via SonarCloud's Automatic Analysis)
- **Fix SonarCloud workflow** `npm ci` working directory (currently runs at repo root but `package.json` is in `app/`)
- **Add `paths-ignore`** to both `app-ci.yml` and `sonarcloud.yml` for `**.md`, `LICENSE`, and `openspec/**` (sonarcloud.yml currently has no path filtering at all)

## Capabilities

### New Capabilities
- `portfolio-readme`: Professional README with badges, tech stack, architecture overview, and links

### Modified Capabilities
- `ci-quality-gates`: Add paths-ignore filters to SonarCloud workflow; move workflow to correct directory; fix working directory for npm ci

## Impact

- `README.md` (new file at repo root)
- `.github/workflows/app-ci.yml` (add `**.md` and `LICENSE` to paths-ignore)
- `.github/workflows/sonarcloud.yml` (new — moved from `app/.github/workflows/`)
- `app/.github/workflows/sonarcloud.yml` (deleted)
