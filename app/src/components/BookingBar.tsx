"use client";

import { useState, useMemo } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import { calculatePriceBreakdown, type PriceBreakdown } from "@/lib/pricing";
import { checkMinNightsWarning } from "./PricingCalendar";
import PricingModal from "./PricingModal";

type BookingBarProps = Readonly<{
  config: PricingConfig;
}>;

function formatDate(date: Date): string {
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("pl-PL", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function BookingBar({ config }: BookingBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const breakdown: PriceBreakdown | null = useMemo(() => {
    if (!range?.from || !range?.to) return null;
    return calculatePriceBreakdown(config, range.from, range.to);
  }, [config, range]);

  const minNightsWarning = useMemo(() => checkMinNightsWarning(range), [range]);

  const hasValidPrice = breakdown && !minNightsWarning;

  return (
    <>
      <button
        type="button"
        className="mx-auto flex w-full max-w-2xl cursor-pointer flex-col items-stretch gap-3 rounded-2xl bg-white/85 p-3 text-left shadow-[0_12px_48px_-6px_rgba(0,0,0,0.3),_0_4px_14px_-4px_rgba(0,0,0,0.15)] backdrop-blur-md sm:flex-row sm:items-center sm:rounded-full sm:p-2 sm:pl-6"
        onClick={() => setIsModalOpen(true)}
      >
        <span className="flex flex-1 items-center gap-3 px-3 sm:px-0">
          <Calendar className="h-5 w-5 shrink-0 text-[var(--muted)]" />
          <span className="text-sm text-[var(--foreground)]">
            {range?.from ? formatDate(range.from) : "Zameldowanie"}
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)]" />
          <span className="text-sm text-[var(--foreground)]">
            {range?.to ? formatDate(range.to) : "Wymeldowanie"}
          </span>
        </span>

        {hasValidPrice && (
          <span className="hidden items-center border-l border-[var(--surface-strong)] px-4 sm:flex">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {formatPrice(breakdown.totalPrice)} &euro;
            </span>
          </span>
        )}

        <span
          className="rounded-xl bg-[var(--brand)] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(72,104,90,0.4)] transition hover:-translate-y-0.5 hover:bg-[#567a6a] hover:shadow-[0_12px_32px_-8px_rgba(72,104,90,0.5)] sm:rounded-full"
          aria-hidden="true"
        >
          Sprawdź cenę
        </span>
      </button>

      {isModalOpen && (
        <PricingModal
          config={config}
          range={range}
          onRangeChange={setRange}
          breakdown={breakdown}
          minNightsWarning={minNightsWarning}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
