## Why

The current color palette doesn't reflect the actual villa property or its Mediterranean surroundings. Three CSS variables (brand, accent, accent-strong) share the same value (#48685a), creating a flat visual hierarchy where different UI elements are indistinguishable. The CTA gold (#f2a733) and promo magenta (#e84393) are disconnected from the rest of the palette. Additionally, hardcoded color values throughout components and email templates will drift from any variable-level changes.

## What Changes

- Replace all 10 primary CSS color variables with a new palette derived from split-complementary color theory (hues 20°/155°/210°), grounded in proven luxury web palettes ("Emerald Sophistication", "Midcentury Touch", Tailwind emerald/sky scales)
- Differentiate `--brand`, `--accent`, and `--accent-strong` into three distinct green tones with clear hierarchy
- Replace generic gold CTA (`--accent-gold`) with terracotta (`--accent-warm`) drawn from the villa's actual terracotta tiles
- Introduce `--accent-sky` (Mediterranean blue) as a secondary accent for links and subtle highlights
- Replace the alien promo magenta with an in-family warm coral
- Update all hardcoded hex/rgba values in components (CTA backgrounds, hover states, brand-colored shadows in BookingBar, PriceSummary, page.tsx, VillaPageClient.tsx)
- Update pricing calendar tier colors and legend swatches to align with the new palette
- Update hero animation gradient and overlay colors
- Align email template color palettes (ConfirmationEmail, OwnerNotificationEmail) with the new brand
- Update navigation mobile background to match new deep overlay tone

## Capabilities

### New Capabilities

- `color-system`: Defines the complete color token system — variable names, values, hierarchy rules, and the split-complementary harmony foundation. Covers primary palette, pricing tier colors, hero/overlay colors, and email palette alignment.

### Modified Capabilities

- `brand-palette-refresh`: Requirements change to specify the new terracotta CTA color, Mediterranean blue accent, and three-tier green hierarchy (replacing the single repeated brand value)

## Impact

- **CSS**: `globals.css` — root variables, pricing calendar classes, hero animation/overlay colors
- **Components**: BookingBar, PriceSummary, ContactForm, ContactInfoPanel, page.tsx, VillaPageClient.tsx, RoomTilesGrid — hardcoded hex/rgba values
- **Email templates**: ConfirmationEmail.tsx, OwnerNotificationEmail.tsx — all inline color styles
- **Navigation**: TopNav mobile background color
- **No API or dependency changes** — purely presentational
