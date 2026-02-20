"use client";

import { DayPicker, type DateRange, type Modifiers } from "react-day-picker";
import { useTranslations, useLocale } from "next-intl";
import { pl } from "react-day-picker/locale";
import { it } from "react-day-picker/locale";
import { es } from "react-day-picker/locale";
import { enUS } from "react-day-picker/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PricingConfig } from "@/lib/sanity/queries";
import {
  isDateInPricingRange,
  isDateInPromotion,
  getPriceTier,
} from "@/lib/pricing";

export const MIN_NIGHTS = 5;

export function checkMinNightsWarning(range: DateRange | undefined): boolean {
  if (!range?.from || !range?.to) return false;
  const nights = Math.round(
    (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24),
  );
  return nights < MIN_NIGHTS;
}

const dayPickerLocales: Record<string, typeof pl> = {
  pl,
  it,
  es,
  en: enUS,
};

type PricingCalendarProps = Readonly<{
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
}>;

const NAV_BTN =
  "group border-surface-strong hover:border-brand/30 hover:bg-surface flex h-9 w-9 items-center justify-center rounded-full border bg-white transition-all hover:shadow-sm";
const NAV_ICON = "text-muted group-hover:text-brand h-4 w-4 transition-colors";

function PreviousMonthButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <button {...props} className={NAV_BTN}>
      <ChevronLeft className={NAV_ICON} />
    </button>
  );
}

function NextMonthButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={NAV_BTN}>
      <ChevronRight className={NAV_ICON} />
    </button>
  );
}

export default function PricingCalendar({
  config,
  range,
  onRangeChange,
}: PricingCalendarProps) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const dpLocale = dayPickerLocales[locale] ?? enUS;

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

  function handleDayClick(day: Date, modifiers: Modifiers) {
    if (modifiers.disabled) return;

    if (!range?.from || (range.from && range.to)) {
      onRangeChange({ from: day, to: undefined });
    } else if (day < range.from) {
      onRangeChange({ from: day, to: range.from });
    } else {
      onRangeChange({ from: range.from, to: day });
    }
  }

  const legendItems = priceTiers.map((price, index) => ({
    key: `tier-${price}`,
    label: tierLabels[index % tierLabels.length],
    className: `pricing-legend-${index}`,
  }));

  return (
    <div>
      <div className="border-surface-strong rounded-2xl border bg-white/60 p-5 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)] sm:p-8">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={() => {}}
          onDayClick={handleDayClick}
          locale={dpLocale}
          formatters={{
            formatWeekdayName: (date) =>
              date.toLocaleDateString(locale, { weekday: "narrow" }),
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
            PreviousMonthButton,
            NextMonthButton,
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
