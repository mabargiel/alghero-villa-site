"use client";

import type { DateRange } from "react-day-picker";
import { useTranslations } from "next-intl";

import type { PricingConfig } from "@/lib/sanity/queries";
import {
  isDateInPricingRange,
  isDateInPromotion,
  getPriceTier,
} from "@/lib/pricing";
import DateRangePicker from "./DateRangePicker";

export const MIN_NIGHTS = 5;

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

  const tierLabels = [t("tierLow"), t("tierMid"), t("tierHigh")] as const;

  const TIER_STYLES = [
    "pricing-tier-low",
    "pricing-tier-mid",
    "pricing-tier-high",
  ] as const;

  const prices = config.baseRanges.map((r) => r.pricePerDay);
  const priceTiers = [...new Set(prices)].sort((a, b) => a - b);

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

  const tierModifiers: Record<string, (date: Date) => boolean> = {};
  priceTiers.forEach((price, index) => {
    tierModifiers[`tier${index}`] = (date: Date) =>
      getPriceTier(date, config) === price;
  });

  const tierClassNames: Record<string, string> = {};
  priceTiers.forEach((_, index) => {
    tierClassNames[`tier${index}`] = TIER_STYLES[index % TIER_STYLES.length];
  });

  const legendItems = priceTiers.map((price, index) => ({
    key: `tier-${price}`,
    label: tierLabels[index % tierLabels.length],
    className: `pricing-legend-${index}`,
  }));

  return (
    <div>
      <div className="border-surface-strong rounded-2xl border bg-white/60 p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-8">
        <DateRangePicker
          range={range}
          onRangeChange={onRangeChange}
          disabled={disabledMatcher}
          modifiers={{
            promotion: promotionMatcher,
            ...tierModifiers,
          }}
          modifiersClassNames={{
            promotion: "pricing-promo",
            ...tierClassNames,
          }}
          numberOfMonths={2}
          defaultMonth={startMonth}
        />
      </div>

      {legendItems.length > 0 && (
        <div className="border-surface-strong/60 mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border bg-white/40 px-5 py-3.5">
          {legendItems.map((item) => (
            <span
              key={item.key}
              className="text-muted flex items-center gap-2 text-xs"
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full ${item.className}`}
              />
              <span className="tracking-wide">{item.label}</span>
            </span>
          ))}
          <span className="text-muted flex items-center gap-2 text-xs">
            <span className="pricing-legend-promo inline-block h-3.5 w-3.5 rounded-full" />
            <span className="tracking-wide">{t("promotion")}</span>
          </span>
        </div>
      )}
    </div>
  );
}
