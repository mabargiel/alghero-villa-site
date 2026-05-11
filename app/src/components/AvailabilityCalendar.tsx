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
}>;

export default function AvailabilityCalendar({
  config,
  range,
  onRangeChange,
}: AvailabilityCalendarProps) {
  const t = useTranslations("pricing");

  const startMonth = (() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

  return (
    <div>
      <div className="border-surface-strong rounded-2xl border bg-white/60 p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-8">
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

      <div className="border-surface-strong/60 mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border bg-white/40 px-5 py-3.5">
        <span className="text-muted flex items-center gap-2 text-xs">
          <span className="inline-block h-3.5 w-3.5 rounded-full bg-gray-300 opacity-60" />
          <span className="tracking-wide">{t("booked")}</span>
        </span>
        <span className="text-muted flex items-center gap-2 text-xs">
          <span className="pricing-legend-promo inline-block h-3.5 w-3.5 rounded-full" />
          <span className="tracking-wide">{t("promotion")}</span>
        </span>
      </div>
      <p className="text-muted mt-3 text-center text-xs tracking-wide">
        {t("minNights")} · {t("maxGuests")}
      </p>
    </div>
  );
}
