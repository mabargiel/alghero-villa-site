"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import type { DateRange } from "react-day-picker";
import type { PricingConfig } from "@/lib/sanity/queries";
import { calculatePriceBreakdown, type PriceBreakdown } from "@/lib/pricing";
import { checkMinNightsWarning } from "./PricingCalendar";
import PricingModal from "./PricingModal";

type PricingModalContextType = {
  openModal: () => void;
};

const PricingModalContext = createContext<PricingModalContextType>({
  openModal: () => {},
});

export function usePricingModal() {
  return useContext(PricingModalContext);
}

export default function PricingModalProvider({
  config,
  children,
}: Readonly<{
  config: PricingConfig | null;
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const breakdown: PriceBreakdown | null = useMemo(() => {
    if (!config || !range?.from || !range?.to) return null;
    return calculatePriceBreakdown(config, range.from, range.to);
  }, [config, range]);

  const minNightsWarning = useMemo(() => checkMinNightsWarning(range), [range]);

  const openModal = useCallback(() => {
    if (config) setIsOpen(true);
  }, [config]);

  return (
    <PricingModalContext.Provider value={{ openModal }}>
      {children}
      {isOpen && config && (
        <PricingModal
          config={config}
          range={range}
          onRangeChange={setRange}
          breakdown={breakdown}
          minNightsWarning={minNightsWarning}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PricingModalContext.Provider>
  );
}
