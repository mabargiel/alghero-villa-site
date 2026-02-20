# Villa Monte Calvia — Alghero

[![Build](https://github.com/mabargiel/alghero-villa-site/actions/workflows/app-ci.yml/badge.svg)](https://github.com/mabargiel/alghero-villa-site/actions/workflows/app-ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mabargiel_alghero-villa-site&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mabargiel_alghero-villa-site)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)](https://montecalvia.com)

A premium villa rental website for a property in Alghero, Sardinia. Built as a real-world project showcasing modern frontend engineering, headless CMS integration, and automated quality workflows.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16, React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| CMS | Sanity (headless, separate repo) |
| Email | Resend |
| Hosting | Vercel |
| Quality | SonarCloud, CodeQL, Dependabot, ESLint, Prettier, Stylelint |
| Icons | Lucide React, Simple Icons |
| Workflow | OpenSpec (spec-driven development) |
| AI | Claude Code (co-authored commits) |

## Architecture

```
┌──────────────────┐       ┌──────────────────┐
│   Sanity Studio   │       │   GitHub Actions  │
│   (CMS repo)      │       │   CI Pipeline     │
└────────┬─────────┘       └────────┬─────────┘
         │ GROQ API                  │ lint, build,
         │                           │ SonarCloud,
         ▼                           │ deploy
┌──────────────────┐                 │
│   Next.js App     │◄───────────────┘
│   (this repo)     │
└────────┬─────────┘
         │ SSR / ISR
         ▼
┌──────────────────┐
│     Vercel        │
│   montecalvia.com │
└──────────────────┘
```

The project uses a **two-repo architecture**: content is managed in a dedicated [Sanity CMS repo](https://github.com/mabargiel/alghero-villa-cms), while this repository contains the Next.js frontend. Vercel handles both preview deployments on PRs and production deploys on merge to `main`. SonarCloud runs static analysis on every pull request.

## Development Workflow

Changes are planned and tracked using [OpenSpec](openspec/) — a spec-driven development workflow. Each feature starts as a proposal, gets refined into specs and a design document, then broken into implementation tasks. Archived changes in [`openspec/changes/archive/`](openspec/changes/archive/) document the project's evolution.

## Links

- [montecalvia.com](https://montecalvia.com) — live site
- [alghero-villa-cms](https://github.com/mabargiel/alghero-villa-cms) — Sanity CMS companion repo
- [openspec/](openspec/) — development specs and change history
