"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePricingModal } from "./PricingModalProvider";

type FloatingBookingCTAProps = Readonly<{
  /** Selector for the natural CTA the floating bar should defer to when visible. */
  hideWhenVisibleSelector: string;
  /** Scroll-y threshold before the floating CTA is allowed to appear. */
  scrollThreshold?: number;
}>;

export default function FloatingBookingCTA({
  hideWhenVisibleSelector,
  scrollThreshold = 300,
}: FloatingBookingCTAProps) {
  const t = useTranslations("pricing");
  const { openModal } = usePricingModal();
  const [pastThreshold, setPastThreshold] = useState(false);
  const [naturalCtaVisible, setNaturalCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastThreshold(window.scrollY > scrollThreshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollThreshold]);

  useEffect(() => {
    const target = document.querySelector(hideWhenVisibleSelector);
    if (!target) return;
    const observer = new IntersectionObserver(
      (entries) => setNaturalCtaVisible(entries[0].isIntersecting),
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hideWhenVisibleSelector]);

  const visible = pastThreshold && !naturalCtaVisible;

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 border-t border-[var(--surface-strong)]/60 bg-[var(--background)]/95 px-4 py-3 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        type="button"
        onClick={openModal}
        className="pointer-events-auto mx-auto block w-full max-w-md rounded-xl bg-[var(--brand)] px-6 py-3 text-center text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:bg-[var(--brand-hover)]"
      >
        {t("checkAvailability")}
      </button>
    </div>
  );
}
