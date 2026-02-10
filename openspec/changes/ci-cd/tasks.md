## 1. Prerequisites and access

- [x] 1.1 Configure Vercel Git integration for `main` (prod) and `dev` (preview)
- [x] 1.2 Add `dev.montecalvia.com` and `www.dev.montecalvia.com` to Vercel and DNS
- [x] 1.3 Create Sanity deploy token and confirm Studio hostname set
- [x] 1.5 Add required GitHub secrets for app and CMS repos
- [x] 1.6 Identify and remove/disable any Azure Pipelines checks

## 2. App repo CI workflows

- [x] 2.1 Add GitHub Actions workflow for lint and build on PRs
- [x] 2.2 Validate workflow names for branch protection checks

## 3. CMS repo CI workflows

- [x] 3.1 Add GitHub Actions workflow for sanity build on PRs
- [x] 3.2 Validate workflow names for branch protection checks

## 4. Tag-based deployments

## 4. Branch-based deployments

- [x] 4.1 Verify app deploys on `dev` branch to preview domain
- [x] 4.2 Verify app deploys on `main` branch to production domain
- [x] 4.3 Add CMS deploy workflow for `main` branch only

## 5. Under construction mode

- [x] 5.1 Add under construction page and production gating in middleware
- [x] 5.2 Remove app-level basic auth gating

## 6. Branch protection rules

- [x] 6.1 Configure `main` branch protection in app repo (PR-only + required checks)
- [x] 6.2 Configure `main` branch protection in CMS repo (PR-only + required checks)

## 7. Validation

- [x] 7.1 Push to `dev` and confirm preview app deploy
- [ ] 7.2 Push to `main` and confirm prod app + CMS deploy
