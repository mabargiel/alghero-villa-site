import type { useFormatter } from "next-intl";

/**
 * react-day-picker and the pricing config build `Date` objects at *local*
 * midnight (e.g. Aug 20 00:00 in the browser's zone). next-intl's formatter is
 * pinned to the app/server time zone (UTC in production) when none is
 * configured, so formatting those dates shifts the displayed day back by one
 * for any user east of UTC (Aug 20 00:00 CEST → Aug 19 22:00 UTC → "19 sie").
 *
 * Formatting in the browser's own time zone keeps the displayed day identical
 * to the one the user picked, regardless of where they are.
 */
export function formatCalendarDate(
  format: ReturnType<typeof useFormatter>,
  date: Date,
): string {
  return format.dateTime(date, {
    day: "numeric",
    month: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
}
