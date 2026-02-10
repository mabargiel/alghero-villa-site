## 1. Prerequisites and access

- [ ] 1.1 Create/verify Vercel prod and dev projects with mapped domains
- [ ] 1.2 Disable Vercel Git auto-deploys or restrict to previews only
- [ ] 1.3 Create Vercel tokens and collect org/project IDs for CI
- [ ] 1.4 Create Sanity deploy token and confirm Studio hostname set
- [ ] 1.5 Add required GitHub secrets for app and CMS repos
- [ ] 1.6 Identify and remove/disable any Azure Pipelines checks

## 2. App repo CI workflows

- [ ] 2.1 Add GitHub Actions workflow for lint and build on PRs
- [ ] 2.2 Validate workflow names for branch protection checks

## 3. CMS repo CI workflows

- [ ] 3.1 Add GitHub Actions workflow for sanity build on PRs
- [ ] 3.2 Validate workflow names for branch protection checks

## 4. Tag-based deployments

- [ ] 4.1 Add app deploy workflow for `vX.Y.Z-dev` tag to dev Vercel project
- [ ] 4.2 Add app deploy workflow for `vX.Y.Z` tag to prod Vercel project
- [ ] 4.3 Add CMS deploy workflow for `vX.Y.Z` tags only
- [ ] 4.4 Verify tag pattern matching behavior in both repos

## 5. Branch protection rules

- [ ] 5.1 Configure `main` branch protection in app repo (PR-only + required checks)
- [ ] 5.2 Configure `main` branch protection in CMS repo (PR-only + required checks)

## 6. Validation

- [ ] 6.1 Create a `vX.Y.Z-dev` tag and confirm dev app deploy
- [ ] 6.2 Create a `vX.Y.Z` tag and confirm prod app + CMS deploy
