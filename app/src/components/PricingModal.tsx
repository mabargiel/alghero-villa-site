"use client";

import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import type { PriceBreakdown } from "@/lib/pricing";
import PricingCalendar from "./PricingCalendar";
import PriceSummary from "./PriceSummary";

type PricingModalProps = {
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  breakdown: PriceBreakdown | null;
  minNightsWarning: boolean;
  onClose: () => void;
};

export default function PricingModal({
  config,
  range,
  onRangeChange,
  breakdown,
  minNightsWarning,
  onClose,
}: PricingModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      className="pricing-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="pricing-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[var(--background)] p-6 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-label="Sprawdź cenę"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
          aria-label="Zamknij"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
          Sprawdź cenę
        </h2>

        <PricingCalendar
          config={config}
          range={range}
          onRangeChange={onRangeChange}
        />

        <div className="mt-6">
          <PriceSummary
            breakdown={breakdown}
            config={config}
            minNightsWarning={minNightsWarning}
          />
        </div>
      </div>
    </div>
  );
}
