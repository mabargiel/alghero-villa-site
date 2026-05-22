"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { useTranslations, useLocale, useFormatter } from "next-intl";
import type { PriceBreakdown, PriceSegment } from "@/lib/pricing";

type PriceSummaryProps = Readonly<{
  breakdown: PriceBreakdown;
  guests: number;
}>;

type DisplayLine = {
  key: string;
  startDate: Date;
  endDate: Date;
  nights: number;
  total: number;
  promotion?: PriceSegment["promotion"];
};

const DEPOSIT_AMOUNT = 800;

/** Merge non-promotional segments into one line, keep promotional ones separate. */
function buildDisplayLines(segments: PriceSegment[]): DisplayLine[] {
  const lines: DisplayLine[] = [];
  let regularAccum: DisplayLine | null = null;

  for (const seg of segments) {
    if (seg.promotion) {
      if (regularAccum) {
        lines.push(regularAccum);
        regularAccum = null;
      }
      lines.push({
        key: `promo-${seg.startDate.getTime()}`,
        startDate: seg.startDate,
        endDate: seg.endDate,
        nights: seg.nights,
        total: seg.total,
        promotion: seg.promotion,
      });
    } else if (regularAccum) {
      regularAccum.endDate = seg.endDate;
      regularAccum.nights += seg.nights;
      regularAccum.total += seg.total;
    } else {
      regularAccum = {
        key: `regular-${seg.startDate.getTime()}`,
        startDate: seg.startDate,
        endDate: seg.endDate,
        nights: seg.nights,
        total: seg.total,
      };
    }
  }

  if (regularAccum) {
    lines.push(regularAccum);
  }

  return lines;
}

export default function PriceSummary({
  breakdown,
  guests,
}: PriceSummaryProps) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const format = useFormatter();

  const displayLines = useMemo(
    () => buildDisplayLines(breakdown.segments),
    [breakdown.segments],
  );

  function formatDate(date: Date): string {
    return format.dateTime(date, { day: "numeric", month: "short" });
  }

  function formatPrice(amount: number): string {
    return new Intl.NumberFormat(locale, {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  }

  const rangeFrom = breakdown.segments[0].startDate;
  const rangeTo = breakdown.segments[breakdown.segments.length - 1].endDate;

  // Show a per-segment breakdown only when it adds information beyond the header.
  // A single line covering the full range is redundant — its info goes inline with the total.
  const showSegments = displayLines.length > 1;
  const singlePromo =
    displayLines.length === 1 ? displayLines[0].promotion : undefined;
  const originalTotal = singlePromo?.originalTotal;

  return (
    <div className="flex flex-col gap-5">
      <div className="border-surface-strong rounded-xl border bg-white p-5">
        <p className="text-sm text-[var(--muted)]">
          <span className="text-[var(--foreground)] font-medium">
            {formatDate(rangeFrom)} – {formatDate(rangeTo)}
          </span>
          <span> · {breakdown.totalNights} </span>
          <span>{t("nights", { count: breakdown.totalNights })}</span>
          <span> · {guests} </span>
          <span>{t("guestsCount", { count: guests })}</span>
        </p>

        {showSegments && (
          <div className="border-surface-strong/60 mt-4 space-y-3 border-t pt-4">
            {displayLines.map((line) => (
              <div
                key={line.key}
                className="flex items-start justify-between gap-4 text-sm"
              >
                <div className="flex-1">
                  <span className="text-[var(--foreground)]">
                    {formatDate(line.startDate)} – {formatDate(line.endDate)}
                  </span>
                  <span className="text-[var(--muted)] ml-2">
                    {line.nights} {t("nights", { count: line.nights })}
                  </span>
                  {line.promotion && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                      {line.promotion.type === "percentage"
                        ? `−${line.promotion.value}%`
                        : t("promotion")}
                    </span>
                  )}
                </div>
                <div className="text-right whitespace-nowrap">
                  {line.promotion && (
                    <span className="text-[var(--muted)] mr-2 line-through">
                      {formatPrice(line.promotion.originalTotal)} €
                    </span>
                  )}
                  <span className="text-[var(--foreground)] font-semibold">
                    {formatPrice(line.total)} €
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-surface-strong/60 mt-4 flex items-baseline justify-between gap-3 border-t pt-4">
          <span className="flex items-baseline gap-2 text-base font-bold text-[var(--foreground)]">
            {t("stayTotal")}
            {singlePromo && (
              <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-700">
                {singlePromo.type === "percentage"
                  ? `−${singlePromo.value}%`
                  : t("promotion")}
              </span>
            )}
          </span>
          <span className="flex items-baseline gap-2 whitespace-nowrap">
            {originalTotal !== undefined && (
              <span className="text-sm text-[var(--muted)] line-through">
                {formatPrice(originalTotal)} €
              </span>
            )}
            <span className="text-xl font-bold text-[var(--foreground)]">
              {formatPrice(breakdown.totalPrice)} €
            </span>
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-700">
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t("cleaningIncluded")}</span>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200/70 bg-amber-50/50 p-5">
        <p className="text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
          {t("onSiteRefundable")}
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-sm text-[var(--foreground)]">
            {t("depositLabel")}
          </span>
          <span className="text-base font-semibold text-[var(--foreground)]">
            {formatPrice(DEPOSIT_AMOUNT)} €
          </span>
        </div>
        <p className="mt-3 text-xs text-[var(--muted)]">
          {t("paymentFootnote")}
        </p>
      </div>
    </div>
  );
}
