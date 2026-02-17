import type { PricingConfig, PricingRange, PricingPromotion } from "./sanity/queries";

export type PriceSegment = {
  startDate: Date;
  endDate: Date;
  nights: number;
  total: number;
  promotion?: {
    label: string;
    type: "percentage" | "fixed";
    value: number;
    originalTotal: number;
  };
};

export type PriceBreakdown = {
  segments: PriceSegment[];
  totalNights: number;
  totalPrice: number;
};

function daysBetween(start: Date, end: Date): number {
  const ms = end.getTime() - start.getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function parseDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function findRangeForDate(
  date: Date,
  ranges: PricingRange[],
): PricingRange | undefined {
  return ranges.find((range) => {
    const start = parseDate(range.startDate);
    const end = parseDate(range.endDate);
    return date >= start && date <= end;
  });
}

function findPromotionForDate(
  date: Date,
  promotions: PricingPromotion[] | undefined,
): PricingPromotion | undefined {
  if (!promotions) return undefined;
  return promotions.find((promo) => {
    const start = parseDate(promo.startDate);
    const end = parseDate(promo.endDate);
    return date >= start && date <= end;
  });
}

function calculateDayPrice(
  basePricePerDay: number,
  promotion: PricingPromotion | undefined,
): { price: number; promotion: PricingPromotion | undefined } {
  if (!promotion) return { price: basePricePerDay, promotion: undefined };

  if (promotion.type === "fixed") {
    return { price: promotion.value, promotion };
  }

  // percentage discount
  const discounted = basePricePerDay * (1 - promotion.value / 100);
  return { price: Math.round(discounted * 100) / 100, promotion };
}

type SegmentKey = string;

function getSegmentKey(
  range: PricingRange,
  promotion: PricingPromotion | undefined,
): SegmentKey {
  return promotion ? `${range._key}:${promotion._key}` : range._key;
}

export function calculatePriceBreakdown(
  config: PricingConfig,
  startDate: Date,
  endDate: Date,
): PriceBreakdown | null {
  const nights = daysBetween(startDate, endDate);
  if (nights < 1) return null;

  // Build segments by walking day-by-day
  const segments: PriceSegment[] = [];
  let currentSegmentKey: SegmentKey | null = null;
  let currentSegment: {
    startDate: Date;
    nights: number;
    total: number;
    baseTotal: number;
    range: PricingRange;
    promotion: PricingPromotion | undefined;
  } | null = null;

  for (let i = 0; i < nights; i++) {
    const day = addDays(startDate, i);
    const range = findRangeForDate(day, config.baseRanges);

    if (!range) continue; // skip days without pricing

    const promotion = findPromotionForDate(day, range.promotions);
    const { price } = calculateDayPrice(range.pricePerDay, promotion);
    const segmentKey = getSegmentKey(range, promotion);

    if (segmentKey === currentSegmentKey && currentSegment) {
      currentSegment.nights += 1;
      currentSegment.total += price;
      currentSegment.baseTotal += range.pricePerDay;
    } else {
      // Flush previous segment
      if (currentSegment) {
        segments.push(buildSegment(currentSegment));
      }

      currentSegmentKey = segmentKey;
      currentSegment = {
        startDate: day,
        nights: 1,
        total: price,
        baseTotal: range.pricePerDay,
        range,
        promotion,
      };
    }
  }

  // Flush last segment
  if (currentSegment) {
    segments.push(buildSegment(currentSegment));
  }

  if (segments.length === 0) return null;

  const totalNights = segments.reduce((sum, s) => sum + s.nights, 0);
  const totalPrice = segments.reduce((sum, s) => sum + s.total, 0);

  return { segments, totalNights, totalPrice };
}

function buildSegment(current: {
  startDate: Date;
  nights: number;
  total: number;
  baseTotal: number;
  range: PricingRange;
  promotion: PricingPromotion | undefined;
}): PriceSegment {
  const endDate = addDays(current.startDate, current.nights);
  const total = Math.round(current.total * 100) / 100;

  const segment: PriceSegment = {
    startDate: current.startDate,
    endDate,
    nights: current.nights,
    total,
  };

  if (current.promotion) {
    segment.promotion = {
      label: current.promotion.label,
      type: current.promotion.type,
      value: current.promotion.value,
      originalTotal: Math.round(current.baseTotal * 100) / 100,
    };
  }

  return segment;
}

export function isDateInPricingRange(
  date: Date,
  config: PricingConfig,
): boolean {
  return findRangeForDate(date, config.baseRanges) !== undefined;
}

export function isDateInPromotion(
  date: Date,
  config: PricingConfig,
): boolean {
  const range = findRangeForDate(date, config.baseRanges);
  if (!range) return false;
  return findPromotionForDate(date, range.promotions) !== undefined;
}

export function getPriceTier(
  date: Date,
  config: PricingConfig,
): number | null {
  const range = findRangeForDate(date, config.baseRanges);
  return range ? range.pricePerDay : null;
}
