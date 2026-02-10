## Why

The navbar intermittently renders with a white background over the hero, causing a visual flash and breaking the intended transparent overlay experience. This needs to be fixed now to ensure consistent branding and prevent a jarring first impression.

## What Changes

- Make the navbar background consistently transparent while the hero is visible.
- Remove the intermittent white background flash during page load and refresh.
- Ensure the transparent overlay behavior is stable across refreshes and initial renders.

## Capabilities

### New Capabilities
- `navbar-transparent-overlay`: The navbar maintains a transparent background over hero media without flicker during initial render or refresh.

### Modified Capabilities
- None.

## Impact

- Frontend navbar styling and initial render behavior.
- Hero media header layout and stacking context.
