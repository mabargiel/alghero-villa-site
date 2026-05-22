"use client";

import { useTranslations } from "next-intl";

export type InquiryFormValues = {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

type InquiryFormProps = Readonly<{
  values: InquiryFormValues;
  onChange: (
    field: keyof InquiryFormValues,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  invalid: Partial<Record<keyof InquiryFormValues, boolean>>;
  disabled?: boolean;
}>;

export default function InquiryForm({
  values,
  onChange,
  invalid,
  disabled,
}: InquiryFormProps) {
  const t = useTranslations("pricing");

  const inputClass =
    "rounded-xl border bg-white px-4 py-3 text-base text-[var(--foreground)] focus:ring-2 focus:ring-[var(--brand)] focus:ring-offset-1 focus:outline-none";
  const borderClass = (key: keyof InquiryFormValues) =>
    invalid[key]
      ? "border-rose-300"
      : "border-[var(--surface-strong)]";

  return (
    <div className="grid gap-4">
      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        {t("nameLabel")}
        <input
          name="firstName"
          required
          autoComplete="given-name"
          disabled={disabled}
          value={values.firstName}
          onChange={onChange("firstName")}
          aria-invalid={invalid.firstName || undefined}
          className={`${inputClass} ${borderClass("firstName")}`}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        {t("emailLabel")}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          disabled={disabled}
          value={values.email}
          onChange={onChange("email")}
          aria-invalid={invalid.email || undefined}
          className={`${inputClass} ${borderClass("email")}`}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        {t("phoneLabelOptional")}
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          disabled={disabled}
          value={values.phone}
          onChange={onChange("phone")}
          className={`${inputClass} ${borderClass("phone")}`}
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-[var(--muted)]">
        {t("messageLabelOptional")}
        <textarea
          name="message"
          rows={3}
          disabled={disabled}
          value={values.message}
          onChange={onChange("message")}
          className={`${inputClass} ${borderClass("message")} min-h-[88px] resize-y`}
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input
          tabIndex={-1}
          autoComplete="new-password"
          className="sr-only"
          name="website"
          value={values.website}
          onChange={onChange("website")}
        />
      </label>
    </div>
  );
}
