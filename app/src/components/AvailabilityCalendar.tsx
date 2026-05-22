"use client";

import type { DateRange } from "react-day-picker";
import { useTranslations } from "next-intl";

import type { PricingConfig } from "@/lib/sanity/queries";
import { isDateInPricingRange, isDateInPromotion } from "@/lib/pricing";
import DateRangePicker from "./DateRangePicker";

export const MIN_NIGHTS = 7;

export function checkMinNightsWarning(range: DateRange | undefined): boolean {
  if (!range?.from || !range?.to) return false;
  const nights = Math.round(
    (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
  );
  return nights < MIN_NIGHTS;
}

type AvailabilityCalendarProps = Readonly<{
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  onConfirm?: () => void;
}>;

export default function AvailabilityCalendar({
  config,
  range,
  onRangeChange,
  onConfirm,
}: AvailabilityCalendarProps) {
  const t = useTranslations("pricing");

  const startMonth = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (range?.from) {
      return new Date(range.from.getFullYear(), range.from.getMonth());
    }

    const futureDates = config.baseRanges
      .map((r) => {
        const [y, m, d] = r.startDate.split("-").map(Number);
        return new Date(y, m - 1, d);
      })
      .filter((d) => d >= today)
      .sort((a, b) => a.getTime() - b.getTime());

    if (futureDates.length > 0) {
      return new Date(futureDates[0].getFullYear(), futureDates[0].getMonth());
    }
    return today;
  })();

  const disabledMatcher = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;
    return !isDateInPricingRange(date, config);
  };

  const promotionMatcher = (date: Date) => isDateInPromotion(date, config);

  const minNightsWarning = checkMinNightsWarning(range);
  const rangeComplete = Boolean(range?.from && range?.to);
  const canConfirm = rangeComplete && !minNightsWarning;

  return (
    <div className="flex h-full flex-col">
      <div className="border-surface-strong flex-1 overflow-y-auto rounded-2xl border bg-white/60 p-3 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-5">
        <DateRangePicker
          range={range}
          onRangeChange={onRangeChange}
          disabled={disabledMatcher}
          modifiers={{ promotion: promotionMatcher }}
          modifiersClassNames={{ promotion: "pricing-promo" }}
          numberOfMonths={2}
          defaultMonth={startMonth}
        />
      </div>

      <div className="border-surface-strong/60 mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border bg-white/40 px-5 py-3.5">
        <span className="text-muted flex items-center gap-2 text-xs">
          <span className="inline-block h-3.5 w-3.5 rounded-full bg-[var(--brand)]" />
          <span className="tracking-wide">{t("available")}</span>
        </span>
        <span className="text-muted flex items-center gap-2 text-xs">
          <span className="pricing-legend-promo inline-block h-3.5 w-3.5 rounded-full" />
          <span className="tracking-wide">{t("promotion")}</span>
        </span>
      </div>

      {onConfirm && (
        <div className="mt-4 flex flex-col gap-2">
          {minNightsWarning && (
            <p className="text-center text-sm text-rose-700" role="alert">
              {t("minNightsWarning")}
            </p>
          )}
          <button
            type="button"
            onClick={onConfirm}
            disabled={!canConfirm}
            className="rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {t("confirmDates")}
          </button>
        </div>
      )}
    </div>
  );
}
