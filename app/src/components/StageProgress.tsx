"use client";

import { useTranslations } from "next-intl";

type StageProgressProps = Readonly<{
  current: number;
  total: number;
}>;

export default function StageProgress({ current, total }: StageProgressProps) {
  const t = useTranslations("pricing");

  return (
    <div
      className="mb-5 flex items-center justify-center gap-2"
      role="status"
      aria-label={t("stepLabel", { step: current, total })}
    >
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const state =
          step < current
            ? "complete"
            : step === current
              ? "active"
              : "upcoming";
        return (
          <span
            key={step}
            className={
              state === "active"
                ? "h-2 w-8 rounded-full bg-[var(--brand)]"
                : state === "complete"
                  ? "h-2 w-2 rounded-full bg-[var(--brand)]"
                  : "h-2 w-2 rounded-full bg-[var(--surface-strong)]"
            }
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
