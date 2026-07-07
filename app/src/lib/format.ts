/**
 * Formats a price as a whole-number decimal in the given locale (no currency
 * symbol — callers append "€" themselves). Shared by BookingBar and
 * PriceSummary so the rounding/grouping stays consistent.
 */
export function formatPrice(locale: string, amount: number): string {
  return new Intl.NumberFormat(locale, {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
