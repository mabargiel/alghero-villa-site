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
import PricingModal from "./PricingModal";

type PricingModalContextType = {
  openModal: () => void;
  range: DateRange | undefined;
  setRange: (range: DateRange | undefined) => void;
  config: PricingConfig | null;
};

const PricingModalContext = createContext<PricingModalContextType>({
  openModal: () => {},
  range: undefined,
  setRange: () => {},
  config: null,
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

  const openModal = useCallback(() => {
    if (config) setIsOpen(true);
  }, [config]);

  const contextValue = useMemo(
    () => ({ openModal, range, setRange, config }),
    [openModal, range, config],
  );

  return (
    <PricingModalContext.Provider value={contextValue}>
      {children}
      {isOpen && config && (
        <PricingModal
          config={config}
          range={range}
          onRangeChange={setRange}
          onClose={() => setIsOpen(false)}
        />
      )}
    </PricingModalContext.Provider>
  );
}
