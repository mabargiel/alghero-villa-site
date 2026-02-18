"use client";

import { useMemo } from "react";
import type { PricingConfig } from "@/lib/sanity/queries";
import type { PriceBreakdown, PriceSegment } from "@/lib/pricing";

type PriceSummaryProps = {
  breakdown: PriceBreakdown | null;
  config: PricingConfig;
  minNightsWarning?: boolean;
};

const extras = [
  { label: "Sprzątanie", amount: 150, type: "included" as const },
  { label: "Depozyt zwrotny", amount: 800, type: "deposit" as const },
];

type DisplayLine = {
  startDate: Date;
  endDate: Date;
  nights: number;
  total: number;
  promotion?: PriceSegment["promotion"];
};

/** Merge non-promotional segments into one line, keep promotional ones separate. */
function buildDisplayLines(segments: PriceSegment[]): DisplayLine[] {
  const lines: DisplayLine[] = [];
  let regularAccum: DisplayLine | null = null;

  for (const seg of segments) {
    if (seg.promotion) {
      // Flush any accumulated regular nights first
      if (regularAccum) {
        lines.push(regularAccum);
        regularAccum = null;
      }
      lines.push({
        startDate: seg.startDate,
        endDate: seg.endDate,
        nights: seg.nights,
        total: seg.total,
        promotion: seg.promotion,
      });
    } else {
      // Accumulate regular (non-promo) segments into one line
      if (regularAccum) {
        regularAccum.endDate = seg.endDate;
        regularAccum.nights += seg.nights;
        regularAccum.total += seg.total;
      } else {
        regularAccum = {
          startDate: seg.startDate,
          endDate: seg.endDate,
          nights: seg.nights,
          total: seg.total,
        };
      }
    }
  }

  if (regularAccum) {
    lines.push(regularAccum);
  }

  return lines;
}

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

function nightsLabel(n: number): string {
  if (n === 1) return "noc";
  if (n < 5) return "noce";
  return "nocy";
}

export default function PriceSummary({
  breakdown,
  config,
  minNightsWarning,
}: PriceSummaryProps) {
  const hasPerks = config.perks && config.perks.length > 0;

  const displayLines = useMemo(() => {
    if (!breakdown) return [];
    return buildDisplayLines(breakdown.segments);
  }, [breakdown]);

  const hasPromoLines = displayLines.some((l) => l.promotion);

  return (
    <div className="border-surface-strong bg-surface rounded-xl border p-6">
      {minNightsWarning ? (
        <div className="text-center">
          <h3 className="text-foreground mb-3 text-lg font-bold">
            Podsumowanie
          </h3>
          <p className="text-sm text-red-700">
            Minimalny pobyt to 5 nocy. Wybierz dłuższy zakres dat.
          </p>
        </div>
      ) : breakdown ? (
        <>
          <h3 className="text-foreground mb-4 text-lg font-bold">
            Podsumowanie
          </h3>

          {hasPromoLines ? (
            <div className="space-y-3">
              {displayLines.map((line, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between gap-4 text-sm"
                >
                  <div className="flex-1">
                    <span className="text-foreground">
                      {formatDate(line.startDate)} – {formatDate(line.endDate)}
                    </span>
                    <span className="text-muted ml-2">
                      {line.nights} {nightsLabel(line.nights)}
                    </span>
                    {line.promotion && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-700">
                        {line.promotion.type === "percentage"
                          ? `−${line.promotion.value}%`
                          : "Promocja"}
                      </span>
                    )}
                  </div>
                  <div className="text-right whitespace-nowrap">
                    {line.promotion && (
                      <span className="text-muted mr-2 line-through">
                        {formatPrice(line.promotion.originalTotal)} €
                      </span>
                    )}
                    <span className="text-foreground font-semibold">
                      {formatPrice(line.total)} €
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          <div
            className={
              hasPromoLines ? "border-surface-strong mt-4 border-t pt-4" : ""
            }
          >
            <div className="text-foreground flex items-center justify-between text-base font-bold">
              <span>
                Razem ({breakdown.totalNights}{" "}
                {nightsLabel(breakdown.totalNights)})
              </span>
              <span>{formatPrice(breakdown.totalPrice)} €</span>
            </div>
          </div>

          <div className="border-surface-strong mt-4 space-y-2 border-t pt-4 text-sm">
            {extras.map((extra) => (
              <div
                key={extra.label}
                className="text-muted flex items-center justify-between"
              >
                <span>{extra.label}</span>
                <span>
                  {extra.type === "included" ? (
                    <span>
                      <span className="mr-1.5">
                        {formatPrice(extra.amount)} €
                      </span>
                      <span className="text-brand font-medium">w cenie</span>
                    </span>
                  ) : (
                    `${formatPrice(extra.amount)} €`
                  )}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/contact"
            className="mt-6 block w-full rounded-lg bg-[var(--brand)] px-6 py-3 text-center font-semibold text-white shadow-[0_8px_24px_-8px_rgba(72,104,90,0.4)] transition-all hover:-translate-y-0.5 hover:bg-[#567a6a] hover:shadow-[0_12px_32px_-8px_rgba(72,104,90,0.5)]"
          >
            Zapytaj o termin
          </a>
        </>
      ) : (
        <div className="text-muted text-center">
          <p className="text-sm">
            Wybierz daty na kalendarzu, aby zobaczyć cenę.
          </p>
        </div>
      )}

      {hasPerks && (
        <div className="border-surface-strong mt-6 space-y-2 border-t pt-4">
          {config.perks!.map((perk, index) => (
            <p key={index} className="text-muted text-sm">
              {perk}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
