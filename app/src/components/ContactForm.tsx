"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { DateRange } from "react-day-picker";
import { Link } from "@/i18n/navigation";
import { usePricingModal } from "./PricingModalProvider";
import { useConsent } from "./ConsentProvider";
import { readFbCookies } from "@/lib/meta/fb-cookies";
import DatePickerModal from "./DatePickerModal";

type FormState = "idle" | "sending" | "success" | "error";

function PrivacyLink(chunks: React.ReactNode) {
  return (
    <Link
      href="/privacy"
      className="font-medium text-[var(--accent-sky)] underline underline-offset-2"
      target="_blank"
    >
      {chunks}
    </Link>
  );
}

function RulesLink(chunks: React.ReactNode) {
  return (
    <Link
      href="/house-rules"
      className="font-medium text-[var(--accent-sky)] underline underline-offset-2"
      target="_blank"
    >
      {chunks}
    </Link>
  );
}

export default function ContactForm() {
  const { range: sharedRange, config } = usePricingModal();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    sharedRange,
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const t = useTranslations("contact");
  const locale = useLocale();
  const { consent } = useConsent();

  useEffect(() => {
    window.fbq?.("track", "ViewContent", { content_name: "Contact Page" });
  }, []);

  function formatDate(date: Date): string {
    return date.toLocaleDateString(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("sending");
    setMessage(null);

    const formData = new FormData(form);
    const eventId = crypto.randomUUID();
    const consentGranted = consent === "granted";
    const { fbp, fbc } = consentGranted ? readFbCookies() : {};
    const payload = {
      firstName: String(formData.get("firstName") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      guests: Number(formData.get("guests") || 0),
      message: (formData.get("message") as string) ?? "",
      website: String(formData.get("website") || ""),
      arriveDate: dateRange?.from?.toISOString() || "",
      leaveDate: dateRange?.to?.toISOString() || "",
      locale,
      eventId,
      consent: consentGranted,
      fbp,
      fbc,
    };

    if (!payload.arriveDate || !payload.leaveDate) {
      setState("error");
      setMessage(t("errorDates"));
      return;
    }

    // Fire the browser-side Lead event BEFORE awaiting the fetch so it
    // still fires if the user navigates away during the request. CAPI
    // mirrors this server-side with the same eventId for dedup.
    if (consentGranted) {
      window.fbq?.(
        "track",
        "Lead",
        { value: 0, currency: "EUR" },
        { eventID: eventId },
      );
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || t("errorGeneric"));
      }

      setState("success");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : t("errorUnknown"));
    }
  }

  const inputClass =
    "rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]";

  if (state === "success") {
    return (
      <div className="grid place-items-center gap-6 rounded-2xl border border-[var(--surface)] bg-white px-8 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-emerald-600"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[var(--foreground)]">
          {t("successTitle")}
        </h2>
        <p className="text-[var(--muted)]">{t("successMessage")}</p>
        <p className="text-sm text-[var(--muted)]">{t("successEmailNote")}</p>
        <Link
          href="/villa"
          className="mt-2 inline-block rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-12px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_22px_50px_-16px_var(--shadow-brand-strong)]"
        >
          {t("successCta")}
        </Link>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 rounded-2xl border border-[var(--surface)] bg-white p-8"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          {t("firstName")} *
          <input className={inputClass} name="firstName" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          {t("email")} *
          <input className={inputClass} name="email" type="email" required />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          {t("phone")}
          <input className={inputClass} name="phone" type="tel" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          {t("guests")} *
          <input
            className={inputClass}
            name="guests"
            type="number"
            min={1}
            max={12}
            required
          />
        </label>
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-medium text-[var(--muted)]">
          {t("arriveDate")} / {t("leaveDate")} *
        </span>
        <button
          type="button"
          className={`${inputClass} cursor-pointer text-left ${
            dateRange?.from ? "text-[var(--foreground)]" : "text-[var(--muted)]"
          }`}
          onClick={() => setShowCalendar(true)}
        >
          {dateRange?.from && dateRange?.to
            ? `${formatDate(dateRange.from)} → ${formatDate(dateRange.to)}`
            : t("selectDates")}
        </button>
        {showCalendar && config && (
          <DatePickerModal
            config={config}
            range={dateRange}
            onRangeChange={setDateRange}
            onClose={() => setShowCalendar(false)}
          />
        )}
      </div>

      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        {t("message")}
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          name="message"
        />
      </label>

      <label className="flex items-start gap-3 text-sm text-[var(--muted)]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--brand)]"
        />
        <span>
          {t.rich("consent", {
            privacy: PrivacyLink,
            rules: RulesLink,
          })}
        </span>
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="new-password"
          className="sr-only"
          name="website"
        />
      </label>

      {message && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {message}
        </div>
      )}

      <button
        className="rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-12px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_22px_50px_-16px_var(--shadow-brand-strong)] disabled:opacity-60"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
