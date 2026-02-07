## Context

The current villa site UI uses a mix of serif/sans typography, white navigation styling across all pages, and minimal olive accents. Users report low contrast in key areas, a visible right-side scrollbar, and a lack of separation between the hero and the following sections. The change targets UI polish without altering content structure or backend behavior.

## Goals / Non-Goals

**Goals:**
- Switch typography to Lato across the site to match the nature-forward tone.
- Improve navigation contrast for subpages while keeping white navigation on the hero.
- Increase and rebalance olive color usage with readable accents and captions.
- Remove visible right-side scrollbar and any horizontal overflow.
- Add spacing between hero and the next section, and ensure smooth scrolling.
- Add social icons above the contact form without new dependencies.
- Ensure the navbar is responsive and usable on mobile devices.

**Non-Goals:**
- Redesign section layouts or change overall content hierarchy.
- Introduce new CMS fields or modify Sanity schemas.
- Add new animation systems or routing changes.

## Decisions

- **Typography update via `next/font/google`**: Replace Playfair + Inter with Lato to unify tone and improve readability, leveraging built-in font optimization.
- **Route-aware navigation styling**: Use `usePathname()` to apply light (hero) vs dark (subpage) variants for nav text, keeping a single component.
- **Mobile navbar behavior**: Introduce a compact mobile layout (e.g., toggleable menu) to keep navigation accessible on small screens without layout overflow.
- **Olive accents via CSS variables and supporting text**: Add or adjust olive color tokens and apply to captions and dividers for consistent contrast on light backgrounds.
- **Scrollbar and overflow handling in global styles**: Hide the visible right scrollbar with cross-browser CSS while preserving scroll functionality; enforce `overflow-x: hidden` to avoid horizontal scroll.
- **Hero spacing via section padding**: Add top padding or margin to the first section after the hero to create a clear visual break without changing the hero layout.
- **Social icons as inline SVG**: Use small inline SVG icons with accessible labels and placeholder links to avoid adding dependencies.

## Risks / Trade-offs

- **Hidden scrollbar reduces affordance** → Provide a clear scroll indicator and keep smooth scroll behavior.
- **Olive contrast issues on light backgrounds** → Tune olive token and apply only on secondary text/captions, not primary body text.
- **Route-based styling drift** → Keep nav variant logic centralized in `TopNav` to prevent inconsistencies.

## Migration Plan

- Update typography and CSS tokens, then adjust component styling and captions.
- Verify no layout shift in hero/section boundary and no horizontal scroll.
- No data or deployment migration needed; changes are CSS/markup only.

## Open Questions

- Final destination URLs for Facebook and Instagram links.
