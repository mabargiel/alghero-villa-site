## 1. Prerequisites and access

- [ ] 1.1 Disable Vercel Git deployments for the app (avoid double deploys)
- [x] 1.2 Add preview domain(s) in Vercel and DNS (if using custom preview domain)
- [x] 1.4 Create `dev` and `production` datasets in Sanity
- [x] 1.3 Create Sanity deploy token and confirm Studio hostname set
- [x] 1.5 Add required GitHub secrets for app and CMS repos
- [x] 1.6 Identify and remove/disable any Azure Pipelines checks
- [x] 1.7 Set app env vars for Sanity datasets in Vercel (preview/dev, production)
- [ ] 1.8 Add Vercel CLI secrets to app repo (token, org ID, project ID)

## 2. App repo CI workflows

- [x] 2.1 Add GitHub Actions workflow for lint/build + Vercel deploy on PRs and `main`
- [x] 2.2 Validate workflow names for branch protection checks
- [x] 2.3 Add PR comment with preview deployment URL

## 3. CMS repo CI workflows

- [x] 3.1 Add GitHub Actions workflow for sanity build on PRs
- [x] 3.2 Validate workflow names for branch protection checks

## 4. Tag-based deployments

## 4. Branch-based deployments

- [ ] 4.1 Verify preview deploys on PRs to `main` (via GitHub Actions)
- [ ] 4.2 Verify app deploys on `main` branch to production domain (via GitHub Actions)
- [x] 4.3 Add CMS deploy workflow for PR previews (`dev`) and `main` (`production`)

## 5. Under construction mode

- [x] 5.1 Add under construction page and production gating in middleware
- [x] 5.2 Remove app-level basic auth gating

## 6. Branch protection rules

- [x] 6.1 Configure `main` branch protection in app repo (PR-only + required checks)
- [x] 6.2 Configure `main` branch protection in CMS repo (PR-only + required checks)

## 7. Validation

- [x] 7.1 Open PR to `main` and confirm preview app deploy
- [ ] 7.2 Push to `main` and confirm prod app + CMS deploy
