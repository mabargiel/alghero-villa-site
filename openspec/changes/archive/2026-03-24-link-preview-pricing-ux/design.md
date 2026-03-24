## Context

The site is a Next.js 16 app with `next-intl` for i18n, Resend for email delivery, and Sanity CMS for pricing configuration. OG meta tags are set in `app/src/app/[locale]/layout.tsx` referencing `/og-image.png`. Emails are sent from `app/src/app/api/contact/route.ts` using React Email templates. The pricing modal's `PriceSummary.tsx` displays cleaning (€150) and deposit (€800) as separate line items below the total.

## Goals / Non-Goals

**Goals:**
- Replace OG image so link previews show the villa photo instead of the logo
- Add estimated price to both email templates so owner and visitor have pricing context
- Simplify price summary by rolling cleaning fee into the displayed total with an info tooltip

**Non-Goals:**
- Changing the actual pricing calculation logic or CMS schema
- Adding price to the contact form UI itself
- Making the deposit part of the total (it remains a separate refundable line)

## Decisions

### OG image replacement
Replace `app/public/og-image.png` with a processed version of the villa exterior photo (resized/cropped to 1200x630). The existing metadata code in layout.tsx references `/og-image.png` and needs no code changes — just the asset swap.

**Why not use Next.js dynamic OG image generation?** The image is static and site-wide. A static asset is simpler, faster, and doesn't require an API route.

### Price calculation in email flow
The API route (`/api/contact/route.ts`) already receives `arriveDate` and `leaveDate`. It will import `calculatePriceBreakdown` and `getPricingConfig` to compute the estimated price server-side. The calculated total (including cleaning fee) and night count are passed to both email templates.

**Why calculate server-side instead of passing from the client?** The contact form doesn't necessarily go through the pricing modal. Server-side calculation ensures the price is always accurate and can't be tampered with.

### Email price display
Both email templates get a new optional `estimatedPrice` prop containing `{ totalPrice, totalNights, arriveDate, leaveDate }`. A new "Estimated price" section is rendered with a disclaimer that the price is approximate and subject to confirmation. The section is skipped if price calculation fails (e.g., dates outside configured ranges).

### Price summary tooltip
The cleaning fee (€150) is added to the displayed total. The separate cleaning line item is removed. A `?` icon is placed next to the total. On hover (desktop) or tap (mobile), a tooltip shows the breakdown: base price, cleaning fee, and notes that the deposit is refundable. This uses a simple CSS `group-hover` pattern — no tooltip library needed.

The deposit line remains visible below the total as a separate "refundable deposit" entry since it's not part of the stay cost.

## Risks / Trade-offs

- **OG image caching**: Social platforms cache OG images aggressively. After deploying, previews won't update immediately for previously-shared URLs. → Mitigation: Can use query param (`/og-image.png?v=2`) if needed, but typically new shares will pick up the new image.
- **Price estimate accuracy**: The server-side calculation uses the same logic as the modal, but if CMS pricing changes between the user checking and submitting, the estimate may differ slightly. → Mitigation: The "estimated" disclaimer makes this acceptable.
- **Tooltip accessibility**: Hover-only tooltips are inaccessible to keyboard/mobile users. → Mitigation: Use `focus` alongside `hover`, and ensure the icon is a focusable button with `aria-label`.
