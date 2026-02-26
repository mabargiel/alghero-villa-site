## Context

The villa website uses CSS custom properties in `globals.css` `:root` as the primary theming mechanism, consumed via Tailwind's `var()` arbitrary values (e.g., `bg-[var(--brand)]`). However, color usage has grown beyond the variable system:

- **Hardcoded hex values** in 3 component files (CTA backgrounds `#e3d8c8`, hover states `#567a6a`)
- **Hardcoded RGBA shadows** embedding the literal RGB breakdown of `#48685a` (72,104,90) across 4+ files
- **Standalone pricing calendar colors** in globals.css CSS classes, unconnected to variables
- **Email templates** with fully independent inline color palettes (required by email clients)
- **Hero animation gradient** with olive-toned RGB values

The palette itself lacks harmony: brand/accent/accent-strong are identical (`#48685a`), the gold CTA (`#f2a733`) and promo magenta (`#e84393`) have no color-theory relationship to anything else.

## Goals / Non-Goals

**Goals:**
- Establish a split-complementary palette (20°/155°/210°) grounded in proven luxury web palettes
- Every color variable gets a distinct, purposeful value with clear hierarchy
- All hardcoded color values across components, CSS classes, and email templates align with the new palette
- CTAs use terracotta (property-derived) instead of generic gold — two CTA levels (green secondary, terracotta primary)
- Pricing calendar and promo colors brought into the palette family
- WCAG AA contrast compliance on all text/background combinations

**Non-Goals:**
- Redesigning component layouts or structure
- Adding dark mode or theme switching
- Changing typography, spacing, or other design tokens
- Refactoring the CSS variable system architecture (keep the current `var()` pattern)
- Changing Tailwind configuration structure

## Decisions

### Decision 1: New color values — split-complementary from proven palettes

The new palette uses three hues in split-complementary harmony, each anchored to a proven reference:

| Role | Variable | New Value | Source |
|------|----------|-----------|--------|
| Background | `--background` | `#F4F1EB` | "Emerald Sophistication" palette |
| Surface | `--surface` | `#E8E2D6` | Derived warm linen |
| Surface strong | `--surface-strong` | `#D5CCBE` | "Nude Palette" ~#D5C7B0 |
| Foreground | `--foreground` | `#2C2825` | "Nude Palette" ~#3A2E2B |
| Muted | `--muted` | `#8A8478` | Warm stone mid-tone |
| Brand | `--brand` | `#2D5A4A` | "Emerald Sophistication" exact |
| Accent | `--accent` | `#1A4535` | Emerald + Tailwind emerald-900 |
| Accent strong | `--accent-strong` | `#0D3326` | Deepest forest tone |
| Deep overlay | `--deep-olive` | `#1A2420` | Warm night (green-tinted) |
| CTA warm | `--accent-warm` (renamed from `--accent-gold`) | `#B5623A` | "Midcentury Touch" derived |
| Sky accent | `--accent-sky` (new) | `#1B7FA3` | Tailwind sky-700 adjusted |

**Why split-complementary over analogous/monochromatic:** The property photos show a natural warm-cool tension (terracotta tiles + blue sky + green vegetation). Split-complementary captures this mathematically while guaranteeing visual harmony.

**Why these specific references:** "Emerald Sophistication" and "Midcentury Touch" are documented as proven luxury web palettes. Tailwind's emerald and sky scales are the most battle-tested green/blue values in modern web development.

### Decision 2: Replace hardcoded values inline, don't refactor to new variables

Hardcoded hex/rgba values in components will be replaced with new palette-aligned values directly. No new CSS variables will be introduced for shadows or hover states.

**Why not add shadow variables:** The shadow patterns use brand color at various opacities for specific contexts (button glow, card lift). Creating variables like `--brand-shadow-40` adds complexity without clear reuse benefit. Keeping them inline is simpler and matches the current pattern.

**Specific replacements:**
- `#e3d8c8` (CTA section bg) → use `--surface-strong` variable instead of hardcoded hex
- `#567a6a` (hover states) → computed from new `--brand` value, slightly lighter
- `rgba(72,104,90,...)` → update to new brand RGB `(45,90,74,...)` at same opacities
- Hero gradient `rgb(107 122 75)` → align to new brand green family

### Decision 3: Pricing calendar colors derived from palette

Current pricing tiers use unrelated colors. New approach:

| Tier | Background | Legend Swatch |
|------|-----------|---------------|
| Low (green) | Brand at ~15% opacity on bg | `#6AAE88` (brand-derived green) |
| Mid (amber) | Warm amber tint | `#C49A4A` (warm gold, in-family) |
| High (terra) | Terracotta at ~20% opacity on bg | `#B86E48` (accent-warm derived) |
| Promo | Warm coral highlight | `#D4654A` (terracotta's brighter cousin) |

Replaces the alien `#e84393` magenta with in-family coral.

### Decision 4: Email templates get an aligned but independent palette

Email clients require inline styles and have limited CSS support. The email palette will be aligned tonally with the website but uses its own values optimized for email rendering:

- Background: warm cream aligned with `--background`
- Text hierarchy: aligned with `--foreground` / `--muted`
- Accent/link color: aligned with brand green
- No terracotta or sky blue in emails (keep simple for compatibility)

### Decision 5: Navigation variables — minimal changes

Nav variables are mostly white-on-dark, which works with any palette. Only change:
- `--nav-mobile-bg`: update from olive-tinted dark to align with new `--deep-olive`

## Risks / Trade-offs

- **Visual regression risk** → Mitigated by the comprehensive audit identifying every hardcoded color. Implementation should be systematic file-by-file.
- **Email client rendering** → Email palette changes are conservative (same warm-neutral family). Test in major clients after change.
- **Pricing calendar readability** → New tier colors derived from the main palette may have less contrast between tiers than current arbitrary colors. Verify visually after implementation.
- **Hardcoded RGBA shadows may be missed** → The audit identified all instances, but future component additions could introduce new hardcoded values. This is an existing technical debt pattern, not introduced by this change.
