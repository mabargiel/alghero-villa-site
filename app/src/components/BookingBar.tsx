"use client";

import { useState, useMemo, useEffect } from "react";
import { Calendar, ArrowRight, Search } from "lucide-react";
import { useTranslations, useLocale, useFormatter } from "next-intl";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import { calculatePriceBreakdown, type PriceBreakdown } from "@/lib/pricing";
import { formatCalendarDate } from "@/lib/date";
import { formatPrice } from "@/lib/format";
import { checkMinNightsWarning } from "./AvailabilityCalendar";
import PricingModal from "./PricingModal";
import { usePricingModal } from "./PricingModalProvider";

type BookingBarProps = Readonly<{
  config: PricingConfig;
}>;

export default function BookingBar({ config }: BookingBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();
  const { setRange: setSharedRange } = usePricingModal();
  const t = useTranslations("pricing");
  const locale = useLocale();
  const format = useFormatter();

  useEffect(() => {
    setSharedRange(range);
  }, [range, setSharedRange]);

  const breakdown: PriceBreakdown | null = useMemo(() => {
    if (!range?.from || !range?.to) return null;
    return calculatePriceBreakdown(config, range.from, range.to);
  }, [config, range]);

  const minNightsWarning = checkMinNightsWarning(range);

  const hasValidPrice = breakdown && !minNightsWarning;

  function formatDate(date: Date): string {
    return formatCalendarDate(format, date);
  }

  return (
    <>
      <button
        type="button"
        className="mx-auto flex w-full max-w-lg cursor-pointer flex-col items-stretch gap-2 rounded-2xl bg-white/85 p-2 text-left shadow-[0_12px_48px_-6px_rgba(0,0,0,0.3),_0_4px_14px_-4px_rgba(0,0,0,0.15)] backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full sm:pl-5"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="flex flex-1 items-center gap-3 px-3 sm:px-0">
          <Calendar className="h-5 w-5 shrink-0 text-[var(--muted)]" />
          <span className="text-sm text-[var(--foreground)]">
            {range?.from ? formatDate(range.from) : t("checkIn")}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)]" />
          <span className="text-sm text-[var(--foreground)]">
            {range?.to ? formatDate(range.to) : t("checkOut")}
          </span>
        </span>

        {hasValidPrice && (
          <span className="hidden items-center border-l border-[var(--surface-strong)] px-4 sm:flex">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {formatPrice(locale, breakdown.totalPrice)} &euro;
            </span>
          </span>
        )}

        <span
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)] sm:rounded-full"
          aria-hidden="true"
        >
          <Search className="h-4 w-4" />
          {t("checkAvailability")}
        </span>
      </button>

      {isModalOpen && (
        <PricingModal
          config={config}
          range={range}
          onRangeChange={setRange}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
