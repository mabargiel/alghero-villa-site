## 1. OG Image

- [x] 1.1 Process the villa exterior photo to 1200x630 PNG and replace `app/public/og-image.png`

## 2. Pricing Modal — Price Summary Redesign

- [x] 2.1 Modify `PriceSummary.tsx` to add the cleaning fee (€150) into the displayed total price
- [x] 2.2 Remove the cleaning fee from the separate extras list (keep only the refundable deposit)
- [x] 2.3 Add a `?` icon button next to the total with a hover/focus tooltip showing the breakdown (base price, cleaning fee, refundable deposit note)
- [x] 2.4 Add new translation keys for tooltip labels (`tooltipBasePrice`, `tooltipCleaningFee`, `tooltipDepositNote`) across all 6 locale files

## 3. Email Pricing — Server-Side Calculation

- [x] 3.1 In `app/src/app/api/contact/route.ts`, import `calculatePriceBreakdown` and `getPricingConfig`, compute estimated price from submitted dates, and add cleaning fee to the total
- [x] 3.2 Pass optional `estimatedPrice` data (`{ totalPrice, totalNights, arriveDate, leaveDate }`) to both email template components

## 4. Email Templates — Estimated Price Section

- [x] 4.1 Add `estimatedPrice` prop to `OwnerNotificationEmail.tsx` and render a new "Estimated price" section with total, nights, and dates (skip section if prop is absent)
- [x] 4.2 Add `estimatedPrice` prop to `ConfirmationEmail.tsx` and render a new "Estimated price" section with total, nights, dates, and localized disclaimer (skip section if prop is absent)
- [x] 4.3 Add translation keys for estimated price section (`estimatedPriceLabel`, `estimatedNights`, `estimatedDisclaimer`) across all 6 locale files and for the owner email in Polish

## 5. Verification

- [x] 5.1 Build the project and verify no type errors or build failures
- [ ] 5.2 Manually test the pricing modal tooltip on desktop hover and keyboard focus
- [ ] 5.3 Test link preview by checking OG meta tags render the new image
