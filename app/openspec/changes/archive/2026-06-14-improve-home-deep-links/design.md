## Context

Home page CTAs route to `/villa` and `/location` to give visitors deeper detail on the villa rooms / exterior areas and on the surrounding region. Today some of those links lack anchors entirely (`AreaHighlights` tiles, beaches CTA, location section), and the ones that *do* have anchors (`/villa#salon`, `/villa#ext-garden`) land the heading flush at `y=0` where the fixed `TopNav` (~80–96px tall) covers it. From a visitor's perspective this reads as "the link didn't go to the right section."

The destination pages already have the right section IDs in place (`#salon`, `#ext-garden`, `#ext-veranda`, `#ext-summer-kitchen`, `#ext-sports-court`, `#section-beaches`, …). The work is wiring home-page hrefs to those targets and adding a single global scroll offset so any anchor jump in the app lands cleanly below the nav.

One existing section uses a Polish slug — `#sypialnie` (bedrooms) in `VillaPageClient.tsx`. The project convention is English in code/URLs and Polish in user-facing copy. No links currently point at this anchor, so a rename is contained to two lines.

## Goals / Non-Goals

**Goals:**
- Every home-page CTA that routes to `/villa` or `/location` points at the most specific section a reasonable visitor would expect.
- Anchor jumps anywhere in the app land the heading visibly below the fixed `TopNav`.
- Section IDs in code follow the English-in-code convention.

**Non-Goals:**
- Re-styling or restructuring the destination pages.
- Changing nav-menu items in `TopNav` (those legitimately point at page roots).
- Changing post-submit links on `/contact` (a generic "back to villa" link with no specific section makes sense).
- Localizing anchor slugs per language.

## Decisions

### Decision 1: `scroll-padding-top` on `<html>` (not per-section `scroll-margin`)

Use a single `html { scroll-padding-top: 96px }` rule in `globals.css`.

**Why:**
- Applies to every anchor jump in the app — current ones, and any future ones — without per-element edits.
- Pairs naturally with the existing `scroll-behavior: smooth` already on `html`.
- Doesn't pollute every `<section>` element with utility classes or override `scroll-margin` per id.

**Alternatives considered:**
- `section[id] { scroll-margin-top: 96px }` — only affects sections with ids; misses anchored elements that aren't `<section>` (none today, but unnecessarily narrow).
- Per-section Tailwind class (e.g. `scroll-mt-24`) — most explicit but invasive; easy to forget on new sections.

**Value:** 96px clears the `h-20` (80px) logo in `TopNav` plus a small breathing margin. Tunable in one place if the nav height changes.

### Decision 2: Per-tile `href` in `AreaHighlights.areas` array

Move `href` from a hard-coded `"/villa"` in the JSX into a per-tile field on the `Area` type. Each tile picks its own deep link.

| Tile | Label (PL) | href |
| --- | --- | --- |
| 1 | Wnętrza | `/villa#salon` |
| 2 | Werandy | `/villa#ext-veranda` |
| 3 | Kuchnia letnia | `/villa#ext-summer-kitchen` |
| 4 | Boisko | `/villa#ext-sports-court` |

**Why these targets:** each tile's *label* maps to a specific destination section. "Wnętrza" (interiors) points at `#salon` rather than `#bedrooms` because salon is the welcoming first interior and matches the parallel "Poznaj wnętrza →" section CTA which also targets `#salon` — both interior-themed CTAs land in the same place. The other three are exact label-to-section matches.

**Note on icon mismatch:** the "Kuchnia letnia" tile uses the `garden` icon. That label/icon decoupling is pre-existing and out of scope here — the link follows the label, not the icon.

### Decision 3: Beaches CTA deep-links, Location CTA does not

- `:327` beaches CTA → `/location#section-beaches`.
- Home Location block gains a new CTA → `/location` (root, no anchor).

**Why the asymmetry:** the beaches block is single-topic (label "Poznaj plaże →") and the destination has a dedicated `#section-beaches`. The Location block is a teaser listing port + beach + heritage + cafes — those map to four different `/location` sections. Deep-linking to any one would mislead. Root + the page's own sticky nav is the comprehensive entry point.

### Decision 4: Rename `#sypialnie` → `#bedrooms`

Two-line change in `VillaPageClient.tsx`: the id string in the `interiorItems` array and the `<section id="…">`.

**Why now:** the project rule (English in code/URLs) was made explicit during this change's planning; `#sypialnie` is the only violation; no inbound links target it, so the rename is risk-free. Doing it later — once a deep-link points at it — would require coordinating the rename with link updates.

### Decision 5: New `home.locationLink` translation key

Add the new Location CTA via a new key in `messages/<locale>.json`, mirroring the existing `villaLink` / `gardenLink` / `beachesLink` pattern. PL value: `"Poznaj okolicę →"`.

## Risks / Trade-offs

- **96px offset is a constant, not derived from nav height** → if the `TopNav` height changes, the offset is wrong. Mitigation: it's one line in `globals.css`; tune when nav redesigns. A CSS custom property would be over-engineering for one consumer.
- **`scroll-padding-top` also applies on the destination pages' *internal* nav clicks** (e.g. `VillaSubNav` or `LocationHorizontalNav`) — but those already need the same offset for the same reason, so this is a feature, not a bug.
- **`AreaHighlights` tile-1 → `#salon` is a judgement call**; some visitors might expect "Wnętrza" to land on `#bedrooms`. Accepted because the parallel section CTA also points at `#salon` and visual flow is salon-first.
- **Sticky `VillaSubNav` is a *side* nav on `xl` screens** (positioned `right-6`, vertically centered), not a top bar — so it doesn't stack on top of `TopNav` and doesn't need extra offset. Verified by reading the component.

## Migration Plan

Single commit, no migrations:
1. Add `scroll-padding-top: 96px` to the `html` rule in `globals.css`.
2. Refactor `AreaHighlights.areas` to carry `href` per tile; update JSX to consume it.
3. Update `page.tsx`:
   - `:327` beaches CTA href.
   - Add new Location section CTA referencing `home.locationLink`.
4. Add `locationLink` key to every `messages/<locale>.json`.
5. Rename `#sypialnie` → `#bedrooms` in `VillaPageClient.tsx` (id literal + `<section>` id).

Rollback: revert the commit. No data, no API, no state to migrate.

## Open Questions

None — all judgement calls were resolved during planning (tile-1 target, location CTA target, scroll-offset strategy, slug rename inclusion).
