"use client";

import { useState } from "react";

type FormState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState<string | null>(null);

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
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.message || "Nie udało się wysłać wiadomości.");
      }

      setState("success");
      setMessage("Dziękujemy! Odezwiemy się wkrótce.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Wystąpił błąd podczas wysyłania.",
      );
    }
  }

  return (
    <form
      className="grid gap-6 rounded-2xl border border-[var(--surface)] bg-white p-8"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          Imię *
          <input
            className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
            name="firstName"
            required
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
          Email *
          <input
            className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
            name="email"
            type="email"
            required
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        Telefon *
        <input
          className="rounded-xl border border-[var(--surface)] bg-white px-4 py-3 text-base text-[var(--foreground)]"
          name="phone"
          type="tel"
          required
        />
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
        className="rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--accent-strong)] disabled:opacity-60"
        type="submit"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Wysyłanie..." : "Wyślij zapytanie"}
      </button>
    </form>
  );
}
