## Context

The site currently uses a warm neutral base with green accents. A new logo color (`#7695a5`) should feel integrated without reducing readability or WCAG compliance. The palette should retain a luxurious, welcoming feel suitable for a high-end villa with natural surroundings.

## Goals / Non-Goals

**Goals:**
- Introduce a brand tint aligned with the new logo color.
- Preserve warm neutrals for an inviting, premium aesthetic.
- Maintain WCAG AA contrast for text and interactive elements on light backgrounds.
- Define clear usage roles for brand, accent, and neutral colors.

**Non-Goals:**
- Major layout or typography changes.
- Rebranding beyond color palette alignment.

## Decisions

- **Keep warm neutral base**: Retain existing background and surface colors to preserve the villa’s warm, elegant tone.
- **Use logo color as brand tint only**: Apply `#7695a5` primarily to large branding elements (e.g., brand name) where contrast requirements are less strict.
- **Derive accessible accent colors**: Use darker, logo-derived accents (`#587686`, `#506b7a`) for links and CTAs to meet WCAG contrast on light backgrounds.
- **Map usage roles to variables**: Update CSS variables so the palette is applied consistently without per-component overrides.

## Risks / Trade-offs

- **Risk:** Logo tint may be too light for small text → **Mitigation:** Reserve it for large branding and use the darker accents for interactive elements.
- **Risk:** Cooler accents may clash with warm neutrals → **Mitigation:** Keep accents muted and low-saturation, and limit to highlights/CTAs.
