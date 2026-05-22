"use client";

import { Users } from "lucide-react";
import { useTranslations } from "next-intl";

type GuestCountInputProps = Readonly<{
  value: number | "";
  onChange: (value: number | "") => void;
  invalid?: boolean;
  errorId?: string;
}>;

const MIN_GUESTS = 1;
const MAX_GUESTS = 12;

export function isGuestCountValid(value: number | ""): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= MIN_GUESTS &&
    value <= MAX_GUESTS
  );
}

export default function GuestCountInput({
  value,
  onChange,
  invalid,
  errorId,
}: GuestCountInputProps) {
  const t = useTranslations("pricing");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw === "") {
      onChange("");
      return;
    }
    const num = Number.parseInt(raw, 10);
    if (Number.isNaN(num)) {
      onChange("");
      return;
    }
    onChange(num);
  }

  return (
    <div>
      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <Users className="h-4 w-4 text-[var(--muted)]" aria-hidden="true" />
          {t("guestsLabel")}
        </span>
        <input
          type="number"
          inputMode="numeric"
          min={MIN_GUESTS}
          max={MAX_GUESTS}
          step={1}
          value={value}
          onChange={handleChange}
          aria-invalid={invalid || undefined}
          aria-describedby={errorId}
          className={`rounded-xl border bg-white px-4 py-3 text-base text-[var(--foreground)] focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-1 focus:outline-none ${
            invalid ? "border-rose-300" : "border-[var(--surface-strong)]"
          }`}
        />
        <span className="text-xs text-[var(--muted)]">{t("guestsHelper")}</span>
      </label>
      {invalid && (
        <p id={errorId} className="mt-2 text-sm text-rose-700" role="alert">
          {t("guestsErrorRange")}
        </p>
      )}
    </div>
  );
}
