"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useTranslations, useFormatter } from "next-intl";
import type { DateRange } from "react-day-picker";

type CollapsedDateInputProps = Readonly<{
  range: DateRange | undefined;
  onExpand: () => void;
  highlight?: boolean;
  invalid?: boolean;
  describedById?: string;
}>;

export default function CollapsedDateInput({
  range,
  onExpand,
  highlight,
  invalid,
  describedById,
}: CollapsedDateInputProps) {
  const t = useTranslations("pricing");
  const format = useFormatter();

  function formatDate(date: Date): string {
    return format.dateTime(date, { day: "numeric", month: "short" });
  }

  const filled = Boolean(range?.from && range?.to);
  const nights = filled
    ? Math.round(
        (range!.to!.getTime() - range!.from!.getTime()) /
          (1000 * 60 * 60 * 24),
      )
    : 0;

  return (
    <button
      type="button"
      onClick={onExpand}
      aria-describedby={describedById}
      className={`group flex w-full items-center gap-3 rounded-xl border bg-white px-4 py-3 text-left transition focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-1 focus:outline-none ${
        invalid
          ? "border-rose-300"
          : "border-[var(--surface-strong)] hover:border-[var(--brand)]/40"
      } ${highlight ? "ring-2 ring-[var(--brand)]/40" : ""}`}
    >
      <Calendar
        className="h-5 w-5 shrink-0 text-[var(--muted)] transition group-hover:text-[var(--brand)]"
        aria-hidden="true"
      />
      <span className="flex-1 text-sm">
        {filled ? (
          <span className="text-[var(--foreground)]">
            {formatDate(range!.from!)} – {formatDate(range!.to!)}
            <span className="text-[var(--muted)]"> · {nights} </span>
            <span className="text-[var(--muted)]">
              {t("nights", { count: nights })}
            </span>
          </span>
        ) : (
          <span className="text-[var(--muted)]">
            {t("selectDatesPlaceholder")}
          </span>
        )}
      </span>
      <ChevronDown
        className="h-4 w-4 shrink-0 text-[var(--muted)]"
        aria-hidden="true"
      />
    </button>
  );
}
