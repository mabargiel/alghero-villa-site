"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useConsent } from "./ConsentProvider";

export default function CookieBanner() {
  const { showBanner, setConsent } = useConsent();
  const t = useTranslations("cookieConsent");

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-label={t("bannerAria")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[var(--surface-strong)] p-4 shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          {t("message")}{" "}
          <Link
            href="/privacy"
            className="underline decoration-[var(--accent)] underline-offset-4 transition hover:text-[var(--accent-strong)]"
          >
            {t("privacyLink")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => setConsent("denied")}
            className="rounded-md border border-white/20 px-4 py-2 text-sm text-[var(--foreground)] transition hover:border-white/40"
          >
            {t("reject")}
          </button>
          <button
            onClick={() => setConsent("granted")}
            className="rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--accent-strong)]"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
