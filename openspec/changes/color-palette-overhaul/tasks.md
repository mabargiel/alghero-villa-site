## 1. CSS Variables — Core Palette

- [x] 1.1 Update `:root` primary color variables in `globals.css`: `--background` (#F4F1EB), `--foreground` (#2C2825), `--muted` (#8A8478), `--surface` (#E8E2D6), `--surface-strong` (#D5CCBE)
- [x] 1.2 Update `:root` brand/accent variables: `--brand` (#2D5A4A), `--accent` (#1A4535), `--accent-strong` (#0D3326)
- [x] 1.3 Rename `--accent-gold` to `--accent-warm` and set to #B5623A (terracotta)
- [x] 1.4 Add new `--accent-sky` variable (#1B7FA3)
- [x] 1.5 Update `--deep-olive` to #1A2420
- [x] 1.6 Update Tailwind `@theme inline` block to register new/renamed variables (`--accent-warm`, `--accent-sky`)

## 2. CSS Variables — Navigation

- [x] 2.1 Update `--nav-mobile-bg` to align with new `--deep-olive` tone
- [x] 2.2 Verify all other nav variables (white-based) still work against new deep overlay — adjust if needed

## 3. Hero & Animation Colors

- [x] 3.1 Update `.hero-motion` gradient from olive-toned `rgb(107 122 75 / 18%)` to brand-green-derived tones
- [x] 3.2 Update `.hero-shell::before` overlay color (#050805) to align with `--deep-olive`
- [x] 3.3 Verify `.hero-text-shadow` contrast on new overlay colors

## 4. Pricing Calendar Colors

- [x] 4.1 Update `.pricing-tier-low` background to a brand-green tint
- [x] 4.2 Update `.pricing-tier-mid` background to a warm amber tint
- [x] 4.3 Update `.pricing-tier-high` background to a terracotta tint
- [x] 4.4 Update `.pricing-legend-0` swatch to brand-green-derived (#6AAE88)
- [x] 4.5 Update `.pricing-legend-1` swatch to warm gold (#C49A4A)
- [x] 4.6 Update `.pricing-legend-2` swatch to terracotta-derived (#B86E48)
- [x] 4.7 Replace `.pricing-legend-promo` and `.pricing-promo` magenta (#e84393) with warm coral (#D4654A)
- [x] 4.8 Update `rgb(72 104 90 / 45%)` in pricing selected-range shadow to new brand RGB (45,90,74)

## 5. Hardcoded Colors in Components

- [x] 5.1 Replace `bg-[#e3d8c8]` in `page.tsx` (CTA section ~line 407) with `bg-surface-strong` or new variable reference
- [x] 5.2 Replace `bg-[#e3d8c8]` in `VillaPageClient.tsx` (~line 204) with same approach
- [x] 5.3 Replace `hover:bg-[#567a6a]` in `BookingBar.tsx` (~line 72) with new brand-hover tone
- [x] 5.4 Replace `hover:bg-[#567a6a]` in `PriceSummary.tsx` (~line 176) with new brand-hover tone
- [x] 5.5 Replace `hover:bg-[#567a6a]` in `VillaPageClient.tsx` (~line 212) with new brand-hover tone

## 6. Hardcoded RGBA Brand Shadows

- [x] 6.1 Update `rgba(72,104,90,...)` shadows in `BookingBar.tsx` to new brand RGB (45,90,74)
- [x] 6.2 Update `rgba(72,104,90,...)` shadows in `PriceSummary.tsx` to new brand RGB (45,90,74)
- [x] 6.3 Update `rgba(72,104,90,...)` shadows in `page.tsx` (amenity icons ~line 390) to new brand RGB
- [x] 6.4 Update `color-mix(in srgb, var(--brand) 35%, transparent)` in pricing — verify it auto-updates (uses variable, should be OK)

## 7. CTA Button Color Migration

- [x] 7.1 Identify all primary CTA buttons currently using `--brand` / `--accent-gold` and update to use `--accent-warm` (terracotta) for primary CTAs
- [x] 7.2 Ensure secondary action buttons (e.g., "Explore Villa") remain on brand green (`--brand`)
- [x] 7.3 Update any `--accent-gold` references across all component files to `--accent-warm`

## 8. Link Color Migration

- [x] 8.1 Identify all text links and update to use `--accent-sky` where appropriate
- [x] 8.2 Verify WCAG AA contrast of `--accent-sky` (#1B7FA3) on `--background` (#F4F1EB)

## 9. Email Template Alignment

- [x] 9.1 Update `ConfirmationEmail.tsx` background (#f6f6f0) to warm cream aligned with new `--background`
- [x] 9.2 Update `ConfirmationEmail.tsx` text colors (#2d3b2d, #4a5a4a, #7a8a7a) to align with new foreground/muted tones
- [x] 9.3 Update `ConfirmationEmail.tsx` link color (#5a7a5a) to align with new brand green
- [x] 9.4 Update `ConfirmationEmail.tsx` divider (#d9d4c7) and footer (#9a9a8a) colors
- [x] 9.5 Update `OwnerNotificationEmail.tsx` with same palette adjustments as above
- [x] 9.6 Update `OwnerNotificationEmail.tsx` message box border (#e8e4da) to align with new surface tone

## 10. Visual Verification

- [x] 10.1 Run the dev server and verify homepage hero, CTA sections, and card surfaces
- [ ] 10.2 Verify villa subpage CTA and room gallery styling
- [ ] 10.3 Verify pricing calendar tier colors, legend swatches, and promo indicator
- [ ] 10.4 Verify booking bar and price summary button styling
- [ ] 10.5 Verify contact form and contact info panel
- [ ] 10.6 Verify mobile navigation overlay appearance
- [ ] 10.7 Preview email templates for visual alignment
