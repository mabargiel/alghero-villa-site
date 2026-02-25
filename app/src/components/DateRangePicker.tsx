"use client";

import { DayPicker, type DateRange, type Modifiers } from "react-day-picker";
import { useLocale } from "next-intl";
import { pl, it, es, fr, de, enUS } from "react-day-picker/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

const dayPickerLocales: Record<string, typeof pl> = {
  pl,
  it,
  es,
  fr,
  de,
  en: enUS,
};

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

type DateRangePickerProps = Readonly<{
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  disabled?: (date: Date) => boolean;
  modifiers?: Record<string, (date: Date) => boolean>;
  modifiersClassNames?: Record<string, string>;
  numberOfMonths?: number;
  defaultMonth?: Date;
}>;

const BASE_CLASS_NAMES = {
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
};

export default function DateRangePicker({
  range,
  onRangeChange,
  disabled,
  modifiers,
  modifiersClassNames,
  numberOfMonths = 2,
  defaultMonth,
}: DateRangePickerProps) {
  const locale = useLocale();
  const dpLocale = dayPickerLocales[locale] ?? enUS;

  function handleDayClick(day: Date, dayModifiers: Modifiers) {
    if (dayModifiers.disabled) return;

    if (!range?.from || (range.from && range.to)) {
      onRangeChange({ from: day, to: undefined });
    } else if (day < range.from) {
      onRangeChange({ from: day, to: range.from });
    } else {
      onRangeChange({ from: range.from, to: day });
    }
  }

  return (
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
      numberOfMonths={numberOfMonths}
      defaultMonth={defaultMonth}
      disabled={disabled}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      components={{
        PreviousMonthButton,
        NextMonthButton,
      }}
      classNames={BASE_CLASS_NAMES}
    />
  );
}
