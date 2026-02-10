## Context

The navbar is intended to overlay the hero media with a transparent background. On initial load or refresh, it sometimes renders with a white background before switching to transparent, creating a visible flash. The fix should remove any initial white background styling and ensure the transparent state is applied immediately and consistently.

## Goals / Non-Goals

**Goals:**
- Keep the navbar fully transparent while the hero is visible.
- Eliminate background-color flashes during initial render and refresh.
- Preserve existing scroll or interaction behavior for the navbar.

**Non-Goals:**
- Redesign of the navbar or hero layout.
- Changes to navigation structure or content.

## Decisions

- **Apply a deterministic initial transparent state**: Ensure the navbar renders with a transparent background before any client-side logic runs, avoiding hydration flicker. This favors CSS-first styling over JS state for the initial paint.
- **Explicit layering and stacking context**: Confirm the navbar is above the hero media and not inheriting background styles from parent containers, preventing accidental white backgrounds.
- **Scope transparency to hero context**: If the navbar changes on scroll, maintain transparent styling until the hero is passed, then transition to the existing non-transparent state.

## Risks / Trade-offs

- **Risk:** Transparent navbar could reduce contrast on light hero imagery → **Mitigation:** Maintain existing text/icon contrast rules and optional shadows or gradient overlays if already in use.
- **Risk:** Scroll-state logic may briefly apply non-transparent styles during transitions → **Mitigation:** Ensure transitions are purely CSS and initial state matches the desired transparent baseline.
