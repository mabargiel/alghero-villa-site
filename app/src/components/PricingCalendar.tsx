"use client";

import { useCallback, useMemo, useState } from "react";
import { DayPicker, type DateRange, type Modifiers } from "react-day-picker";
import { pl } from "react-day-picker/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PricingConfig } from "@/lib/sanity/queries";
import {
  calculatePriceBreakdown,
  isDateInPricingRange,
  isDateInPromotion,
  getPriceTier,
  type PriceBreakdown,
} from "@/lib/pricing";
import PriceSummary from "./PriceSummary";

const MIN_NIGHTS = 5;

type PricingCalendarProps = {
  config: PricingConfig;
};

export default function PricingCalendar({ config }: PricingCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>();

  const priceTiers = useMemo(() => {
    const prices = config.baseRanges.map((r) => r.pricePerDay);
    return [...new Set(prices)].sort((a, b) => a - b);
  }, [config]);

  const startMonth = useMemo(() => {
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
  }, [config]);

  const disabledMatcher = useMemo(
    () => (date: Date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (date < today) return true;
      return !isDateInPricingRange(date, config);
    },
    [config],
  );

  const promotionMatcher = useMemo(
    () => (date: Date) => isDateInPromotion(date, config),
    [config],
  );

  const tierModifiers = useMemo(() => {
    const modifiers: Record<string, (date: Date) => boolean> = {};
    priceTiers.forEach((price, index) => {
      modifiers[`tier${index}`] = (date: Date) =>
        getPriceTier(date, config) === price;
    });
    return modifiers;
  }, [config, priceTiers]);

  const tierClassNames = useMemo(() => {
    const tierStyles = [
      "pricing-tier-low",
      "pricing-tier-mid",
      "pricing-tier-high",
    ];
    const classNames: Record<string, string> = {};
    priceTiers.forEach((_, index) => {
      classNames[`tier${index}`] = tierStyles[index % tierStyles.length];
    });
    return classNames;
  }, [priceTiers]);

  const handleDayClick = useCallback((day: Date, modifiers: Modifiers) => {
    if (modifiers.disabled) return;

    setRange((prev) => {
      // No selection or complete range → start fresh
      if (!prev?.from || (prev.from && prev.to)) {
        return { from: day, to: undefined };
      }
      // Have from, no to → complete the range (ensure from < to)
      if (day < prev.from) {
        return { from: day, to: prev.from };
      }
      return { from: prev.from, to: day };
    });
  }, []);

  const minNightsWarning = useMemo(() => {
    if (!range?.from || !range?.to) return false;
    const nights = Math.round(
      (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
    );
    return nights < MIN_NIGHTS;
  }, [range]);

  const breakdown: PriceBreakdown | null = useMemo(() => {
    if (!range?.from || !range?.to) return null;
    return calculatePriceBreakdown(config, range.from, range.to);
  }, [config, range]);

  const tierLabels = ["Niski sezon", "Średni sezon", "Wysoki sezon"];

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
      <div className="min-w-0 flex-1">
        <div className="border-surface-strong rounded-2xl border bg-white/60 p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-8">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={() => {}}
            onDayClick={handleDayClick}
            locale={pl}
            formatters={{
              formatWeekdayName: (date) =>
                date.toLocaleDateString("pl-PL", { weekday: "narrow" }),
            }}
            numberOfMonths={2}
            defaultMonth={startMonth}
            disabled={disabledMatcher}
            modifiers={{
              promotion: promotionMatcher,
              ...tierModifiers,
            }}
            modifiersClassNames={{
              promotion: "pricing-promo",
              ...tierClassNames,
            }}
            components={{
              PreviousMonthButton: (props) => (
                <button
                  {...props}
                  className="group border-surface-strong hover:border-brand/30 hover:bg-surface flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all hover:shadow-sm"
                >
                  <ChevronLeft className="text-muted group-hover:text-brand h-4 w-4 transition-colors" />
                </button>
              ),
              NextMonthButton: (props) => (
                <button
                  {...props}
                  className="group border-surface-strong hover:border-brand/30 hover:bg-surface flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all hover:shadow-sm"
                >
                  <ChevronRight className="text-muted group-hover:text-brand h-4 w-4 transition-colors" />
                </button>
              ),
            }}
            classNames={{
              root: "pricing-calendar w-full",
              months: "flex flex-col gap-8 md:flex-row md:gap-16",
              month: "flex-1 min-w-0",
              month_caption:
                "mb-5 text-center text-base font-semibold tracking-wide capitalize text-foreground",
              nav: "flex items-center justify-between gap-4 mb-6",
              weekdays: "grid grid-cols-7 mb-2",
              weekday:
                "text-center text-[11px] font-semibold tracking-[0.12em] uppercase text-muted/60 py-2",
              month_grid: "",
              week: "grid grid-cols-7",
              day: "relative p-1 text-center",
              day_button:
                "pricing-day-btn size-6 mx-auto flex items-center justify-center text-xs rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-20 disabled:hover:bg-transparent",
              selected: "pricing-day-selected",
              range_start: "pricing-day-range-start",
              range_end: "pricing-day-range-end",
              range_middle: "pricing-day-range-middle",
              today: "pricing-day-today",
              disabled: "",
            }}
          />
        </div>

        {priceTiers.length > 0 && (
          <div className="border-surface-strong/60 mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-xl border bg-white/40 px-5 py-3.5">
            {priceTiers.map((_, index) => (
              <span
                key={index}
                className="text-muted flex items-center gap-2 text-xs"
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full pricing-legend-${index}`}
                />
                <span className="tracking-wide">
                  {tierLabels[index % tierLabels.length]}
                </span>
              </span>
            ))}
            <span className="text-muted flex items-center gap-2 text-xs">
              <span className="pricing-legend-promo inline-block h-3.5 w-3.5 rounded-full" />
              <span className="tracking-wide">Promocja</span>
            </span>
          </div>
        )}
      </div>

      <div className="lg:w-[380px] lg:flex-shrink-0">
        <PriceSummary
          breakdown={breakdown}
          config={config}
          minNightsWarning={minNightsWarning}
        />
      </div>
    </div>
  );
}
