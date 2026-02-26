"use client";

import { useMemo } from "react";
import { useTranslations, useLocale, useFormatter } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PricingConfig } from "@/lib/sanity/queries";
import type { PriceBreakdown, PriceSegment } from "@/lib/pricing";

type PriceSummaryProps = Readonly<{
  breakdown: PriceBreakdown | null;
  config: PricingConfig;
  minNightsWarning?: boolean;
}>;

type DisplayLine = {
  key: string;
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

function SummaryContent({
  breakdown,
  displayLines,
  hasPromoLines,
}: Readonly<{
  breakdown: PriceBreakdown;
  displayLines: DisplayLine[];
  hasPromoLines: boolean;
}>) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const format = useFormatter();

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

  const extras = [
    { label: t("cleaning"), amount: 150, type: "included" as const },
    { label: t("deposit"), amount: 800, type: "deposit" as const },
  ];

  const nightsLabel = t("nights", { count: breakdown.totalNights });

  return (
    <>
      <h3 className="text-foreground mb-4 text-lg font-bold">{t("summary")}</h3>

      {hasPromoLines ? (
        <div className="space-y-3">
          {displayLines.map((line) => (
            <div
              key={line.key}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <div className="flex-1">
                <span className="text-foreground">
                  {formatDate(line.startDate)} – {formatDate(line.endDate)}
                </span>
                <span className="text-muted ml-2">
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
            {t("total", { nights: `${breakdown.totalNights} ${nightsLabel}` })}
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
                  <span className="mr-1.5">{formatPrice(extra.amount)} €</span>
                  <span className="text-brand font-medium">
                    {t("included")}
                  </span>
                </span>
              ) : (
                `${formatPrice(extra.amount)} €`
              )}
            </span>
          </div>
        ))}
      </div>

      <Link
        href="/contact"
        className="mt-6 block w-full rounded-lg bg-[var(--brand)] px-6 py-3 text-center font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition-all hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)]"
      >
        {t("askAbout")}
      </Link>
    </>
  );
}

export default function PriceSummary({
  breakdown,
  config,
  minNightsWarning,
}: PriceSummaryProps) {
  const t = useTranslations("pricing");
  const hasPerks = config.perks && config.perks.length > 0;

  const displayLines = useMemo(() => {
    if (!breakdown) return [];
    return buildDisplayLines(breakdown.segments);
  }, [breakdown]);

  const hasPromoLines = displayLines.some((l) => l.promotion);

  let content: React.ReactNode;
  if (minNightsWarning) {
    content = (
      <div className="text-center">
        <h3 className="text-foreground mb-3 text-lg font-bold">
          {t("summary")}
        </h3>
        <p className="text-sm text-red-700">{t("minNightsWarning")}</p>
      </div>
    );
  } else if (breakdown) {
    content = (
      <SummaryContent
        breakdown={breakdown}
        displayLines={displayLines}
        hasPromoLines={hasPromoLines}
      />
    );
  } else {
    content = (
      <div className="text-muted text-center">
        <p className="text-sm">{t("selectDates")}</p>
      </div>
    );
  }

  return (
    <div className="border-surface-strong bg-surface rounded-xl border p-6">
      {content}

      {hasPerks && (
        <div className="border-surface-strong mt-6 space-y-2 border-t pt-4">
          {config.perks!.map((perk) => (
            <p key={perk} className="text-muted text-sm">
              {perk}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
