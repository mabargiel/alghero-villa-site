"use client";

import { useTranslations } from "next-intl";
import { usePricingModal } from "./PricingModalProvider";

export default function CheckAvailabilityButton({
  className,
  translationNamespace = "pricing",
  translationKey = "checkAvailability",
}: Readonly<{
  className?: string;
  translationNamespace?: string;
  translationKey?: string;
}>) {
  const { openModal } = usePricingModal();
  const t = useTranslations(translationNamespace);

  return (
    <button type="button" className={className} onClick={openModal}>
      {t(translationKey)}
    </button>
  );
}
