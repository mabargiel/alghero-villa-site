"use client";

import { useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ModalShell from "./ModalShell";

type DatePickerModalProps = Readonly<{
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  onClose: () => void;
}>;

export default function DatePickerModal({
  config,
  range,
  onRangeChange,
  onClose,
}: DatePickerModalProps) {
  const t = useTranslations("contact");

  const handleRangeChange = (newRange: DateRange | undefined) => {
    onRangeChange(newRange);
    if (newRange?.from && newRange?.to) {
      onClose();
    }
  };

  return (
    <ModalShell
      onClose={onClose}
      closeLabel={t("selectDates")}
      title={t("selectDates")}
    >
      <AvailabilityCalendar
        config={config}
        range={range}
        onRangeChange={handleRangeChange}
      />
    </ModalShell>
  );
}
