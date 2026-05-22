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
  props: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>,
) {
  return (
    <button {...props} className={NAV_BTN}>
      <ChevronLeft className={NAV_ICON} />
    </button>
  );
}

function NextMonthButton(
  props: Readonly<React.ButtonHTMLAttributes<HTMLButtonElement>>,
) {
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
  months: "flex flex-col gap-6 sm:flex-row sm:gap-6",
  month: "flex-1 min-w-0",
  month_caption:
    "mb-4 text-center text-sm font-semibold tracking-wide capitalize text-foreground",
  nav: "flex items-center justify-between gap-4 mb-4 px-1",
  weekdays: "grid grid-cols-7 mb-2",
  weekday:
    "text-center text-[11px] font-semibold tracking-[0.12em] uppercase text-muted/60 py-1.5",
  month_grid: "w-full",
  week: "grid grid-cols-7",
  day: "relative p-0.5 text-center",
  day_button:
    "pricing-day-btn size-8 sm:size-9 mx-auto flex items-center justify-center text-sm rounded-lg transition-all duration-200 cursor-pointer disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent",
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

  function hasDisabledBetween(start: Date, end: Date): boolean {
    if (!disabled) return false;
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    cursor.setDate(cursor.getDate() + 1);
    const last = new Date(end);
    last.setHours(0, 0, 0, 0);
    while (cursor < last) {
      if (disabled(cursor)) return true;
      cursor.setDate(cursor.getDate() + 1);
    }
    return false;
  }

  function handleDayClick(day: Date, dayModifiers: Modifiers) {
    if (dayModifiers.disabled) return;

    if (!range?.from || (range.from && range.to)) {
      onRangeChange({ from: day, to: undefined });
      return;
    }

    const start = day < range.from ? day : range.from;
    const end = day < range.from ? range.from : day;

    if (hasDisabledBetween(start, end)) {
      // Gap contains booked dates — start a fresh range at the clicked day.
      onRangeChange({ from: day, to: undefined });
      return;
    }

    onRangeChange({ from: start, to: end });
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
