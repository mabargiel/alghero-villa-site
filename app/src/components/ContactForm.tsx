"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { DateRange } from "react-day-picker";
import { Link } from "@/i18n/navigation";
import DateRangePicker from "./DateRangePicker";

type FormState = "idle" | "sending" | "success" | "error";

function PrivacyLink(chunks: React.ReactNode) {
  return (
    <Link
      href="/privacy"
      className="font-medium text-[var(--accent-strong)] underline underline-offset-2"
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
      className="font-medium text-[var(--accent-strong)] underline underline-offset-2"
      target="_blank"
    >
      {chunks}
    </Link>
  );
}

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const t = useTranslations("contact");
  const locale = useLocale();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disablePast = (date: Date) => date < today;

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
    };

    if (!payload.arriveDate || !payload.leaveDate) {
      setState("error");
      setMessage(t("errorDates"));
      return;
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
      setMessage(t("success"));
      form.reset();
      setDateRange(undefined);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : t("errorUnknown"));
    }
  }

  const inputClass =
    "rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]";

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
          {t("phone")} *
          <input className={inputClass} name="phone" type="tel" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          {t("guests")} *
          <input
            className={inputClass}
            name="guests"
            type="number"
            min={1}
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
          onClick={() => setShowCalendar((v) => !v)}
        >
          {dateRange?.from && dateRange?.to
            ? `${formatDate(dateRange.from)} → ${formatDate(dateRange.to)}`
            : t("selectDates")}
        </button>
        {showCalendar && (
          <div className="rounded-xl border border-[var(--surface)] bg-white p-4">
            <DateRangePicker
              range={dateRange}
              onRangeChange={(r) => {
                setDateRange(r);
                if (r?.from && r?.to) setShowCalendar(false);
              }}
              disabled={disablePast}
              numberOfMonths={1}
            />
          </div>
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
          className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
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
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${
            state === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {message}
        </div>
      )}

      <button
        className="rounded-xl bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_-22px_rgba(0,0,0,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75)] disabled:opacity-60"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? t("sending") : t("send")}
      </button>
    </form>
  );
}
