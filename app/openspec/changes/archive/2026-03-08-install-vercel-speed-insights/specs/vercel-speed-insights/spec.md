## ADDED Requirements

### Requirement: Speed Insights component is rendered on every page

The application SHALL render the `<SpeedInsights />` component from `@vercel/speed-insights/next` in the root layout so that Web Vitals are collected on every page.

#### Scenario: Component present in root layout

- **WHEN** any page is loaded
- **THEN** the `<SpeedInsights />` component is mounted and begins collecting performance metrics

### Requirement: Speed Insights package is installed

The project SHALL include `@vercel/speed-insights` as a production dependency.

#### Scenario: Package listed in dependencies

- **WHEN** `package.json` is inspected
- **THEN** `@vercel/speed-insights` is listed under `dependencies`
