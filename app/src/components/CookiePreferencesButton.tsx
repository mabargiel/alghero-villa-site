"use client";

import { useTranslations } from "next-intl";
import { useConsent } from "./ConsentProvider";

export default function CookiePreferencesButton() {
  const { setShowBanner } = useConsent();
  const t = useTranslations("cookieConsent");

  return (
    <button
      onClick={() => setShowBanner(true)}
      className="underline decoration-[var(--accent-sky)] underline-offset-4 transition hover:text-[var(--accent-sky)]"
    >
      {t("cookiePreferences")}
    </button>
  );
}
