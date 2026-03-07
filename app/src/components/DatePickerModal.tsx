"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import AvailabilityCalendar from "./AvailabilityCalendar";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const t = useTranslations("contact");

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleRangeChange = (newRange: DateRange | undefined) => {
    onRangeChange(newRange);
    if (newRange?.from && newRange?.to) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="pricing-modal-backdrop fixed inset-0 z-50 bg-transparent p-4 backdrop:bg-black/50"
      onCancel={handleCancel}
    >
      <div
        className="flex min-h-full items-center justify-center"
        role="presentation"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="pricing-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[var(--background)] p-6 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
            aria-label={t("selectDates")}
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
            {t("selectDates")}
          </h2>

          <AvailabilityCalendar
            config={config}
            range={range}
            onRangeChange={handleRangeChange}
          />
        </div>
      </div>
    </dialog>
  );
}
