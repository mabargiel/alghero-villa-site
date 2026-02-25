## ADDED Requirements

### Requirement: README with CI badges
The README MUST display status badges for GitHub Actions build, SonarCloud quality gate, and Vercel deployment at the top of the file.

#### Scenario: Badges render correctly
- **WHEN** a user views the repository on GitHub
- **THEN** the README displays clickable badges for build status, SonarCloud quality gate, and Vercel deployment

### Requirement: README with tech stack overview
The README MUST list the project's technologies in a categorized table covering framework, styling, CMS, hosting, quality tooling, and development workflow.

#### Scenario: Tech stack is visible
- **WHEN** a user views the README
- **THEN** they see a table with categories (Framework, Styling, CMS, Hosting, Quality, Icons, Workflow, AI) and the corresponding technologies

### Requirement: README with architecture overview
The README MUST include a brief architecture section describing the frontend/CMS separation, Vercel hosting, and CI pipeline.

#### Scenario: Architecture section present
- **WHEN** a user reads the README
- **THEN** they find a section explaining the two-repo setup (app + CMS), Vercel deployment model, and quality gates

### Requirement: README with project links
The README MUST link to the live site, the Sanity CMS companion repo, and the OpenSpec workflow directory.

#### Scenario: Links are present and valid
- **WHEN** a user views the README
- **THEN** they find links to montecalvia.com, the alghero-villa-cms GitHub repo, and the openspec/ directory
