"use client";

import { useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import type { PriceBreakdown } from "@/lib/pricing";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ModalShell from "./ModalShell";
import PriceSummary from "./PriceSummary";

type PricingModalProps = Readonly<{
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  breakdown: PriceBreakdown | null;
  minNightsWarning: boolean;
  onClose: () => void;
}>;

export default function PricingModal({
  config,
  range,
  onRangeChange,
  breakdown,
  minNightsWarning,
  onClose,
}: PricingModalProps) {
  const t = useTranslations("pricing");

  return (
    <ModalShell
      onClose={onClose}
      closeLabel={t("close")}
      title={t("checkAvailability")}
    >
      <AvailabilityCalendar
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
    </ModalShell>
  );
}
