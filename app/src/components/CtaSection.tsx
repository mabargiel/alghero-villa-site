"use client";

import { useTranslations } from "next-intl";
import Reveal from "@/components/Reveal";
import CheckAvailabilityButton from "@/components/CheckAvailabilityButton";

export default function CtaSection({
  namespace,
}: Readonly<{ namespace: string }>) {
  const t = useTranslations(namespace);

  return (
    <Reveal>
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="bg-surface-strong rounded-xl p-10 text-center shadow-[0_6px_16px_-10px_rgba(20,20,20,0.28),_0_22px_45px_-28px_rgba(20,20,20,0.4)]">
          <h2 className="text-2xl font-semibold md:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--muted)]">
            {t("ctaDescription")}
          </p>
          <CheckAvailabilityButton className="mt-6 inline-flex rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-12px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_22px_50px_-16px_var(--shadow-brand-strong)]" />
        </div>
      </section>
    </Reveal>
  );
}
