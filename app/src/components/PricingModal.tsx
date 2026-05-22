"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import type { DateRange } from "react-day-picker";

import type { PricingConfig } from "@/lib/sanity/queries";
import { calculatePriceBreakdown, type PriceBreakdown } from "@/lib/pricing";
import AvailabilityCalendar, {
  checkMinNightsWarning,
} from "./AvailabilityCalendar";
import CollapsedDateInput from "./CollapsedDateInput";
import GuestCountInput, { isGuestCountValid } from "./GuestCountInput";
import InquiryForm, { type InquiryFormValues } from "./InquiryForm";
import PriceSummary from "./PriceSummary";
import StageProgress from "./StageProgress";

type Stage = "choose" | "choose-calendar" | "review" | "inquiry" | "sent";

type PricingModalProps = Readonly<{
  config: PricingConfig;
  range: DateRange | undefined;
  onRangeChange: (range: DateRange | undefined) => void;
  onClose: () => void;
}>;

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{1,255}$/;
const TOTAL_STAGES = 3;

const initialForm: InquiryFormValues = {
  firstName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
};

export default function PricingModal({
  config,
  range,
  onRangeChange,
  onClose,
}: PricingModalProps) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [stage, setStage] = useState<Stage>("choose");
  const [guests, setGuests] = useState<number | "">("");
  const [triedAdvance, setTriedAdvance] = useState(false);
  const [form, setForm] = useState<InquiryFormValues>(initialForm);
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "error">(
    "idle",
  );
  const [closePrompt, setClosePrompt] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const breakdown: PriceBreakdown | null = useMemo(() => {
    if (!range?.from || !range?.to) return null;
    return calculatePriceBreakdown(config, range.from, range.to);
  }, [config, range]);

  const minNightsWarning = useMemo(() => checkMinNightsWarning(range), [range]);

  const dateRangeValid =
    Boolean(range?.from && range?.to) && !minNightsWarning && Boolean(breakdown);
  const guestsValid = isGuestCountValid(guests);
  const stage1Valid = dateRangeValid && guestsValid;

  const isStage3Dirty =
    form.firstName !== "" ||
    form.email !== "" ||
    form.phone !== "" ||
    form.message !== "";

  const formInvalid: Partial<Record<keyof InquiryFormValues, boolean>> = {};
  if (triedSubmit) {
    if (!form.firstName.trim()) formInvalid.firstName = true;
    if (!EMAIL_RE.test(form.email.trim())) formInvalid.email = true;
  }

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function handleAttemptClose() {
    if (stage === "inquiry" && isStage3Dirty) {
      setClosePrompt(true);
      return;
    }
    onClose();
  }

  function handleAdvanceFromChoose() {
    if (!stage1Valid) {
      setTriedAdvance(true);
      return;
    }
    setStage("review");
  }

  function handleFormChange(field: keyof InquiryFormValues) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTriedSubmit(true);
    if (!form.firstName.trim() || !EMAIL_RE.test(form.email.trim())) {
      return;
    }
    if (!range?.from || !range?.to) return;

    setSubmitState("sending");

    const payload = {
      firstName: form.firstName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: form.message.trim(),
      website: form.website,
      guests: typeof guests === "number" ? guests : 0,
      arriveDate: range.from.toISOString(),
      leaveDate: range.to.toISOString(),
      locale,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send_failed");
      if (typeof fbq !== "undefined") {
        fbq("track", "Contact");
      }
      setSubmitState("idle");
      setStage("sent");
    } catch {
      setSubmitState("error");
    }
  }

  function handleDiscardAndClose() {
    setClosePrompt(false);
    onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      className="pricing-modal-backdrop fixed inset-0 z-50 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-4 backdrop:bg-black/50"
      onCancel={(e) => {
        e.preventDefault();
        if (stage === "choose-calendar") {
          setStage("choose");
          return;
        }
        if (closePrompt) {
          setClosePrompt(false);
          return;
        }
        handleAttemptClose();
      }}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) {
          if (stage === "choose-calendar") {
            setStage("choose");
            return;
          }
          handleAttemptClose();
        }
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className={`pricing-modal-content relative flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl bg-[var(--background)] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] ${
            stage === "choose-calendar" ? "max-w-3xl" : "max-w-lg"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-[var(--surface-strong)]/60 px-5 py-4">
            <div className="flex items-center gap-3">
              {(stage === "review" ||
                stage === "inquiry" ||
                stage === "choose-calendar") && (
                <button
                  type="button"
                  onClick={() => {
                    if (stage === "choose-calendar") setStage("choose");
                    else if (stage === "review") setStage("choose");
                    else if (stage === "inquiry") setStage("review");
                  }}
                  aria-label={t("back")}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                {stage === "choose" && t("stageChoose")}
                {stage === "choose-calendar" && t("stageCalendar")}
                {stage === "review" && t("stageReview")}
                {stage === "inquiry" && t("stageInquiry")}
                {stage === "sent" && t("stageSent")}
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAttemptClose}
              aria-label={t("close")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div
            className="flex-1 overflow-hidden px-5 py-5"
            aria-live="polite"
          >
            {stage === "choose" && (
              <div className="flex h-full flex-col">
                <StageProgress current={1} total={TOTAL_STAGES} />
                <div className="flex flex-1 flex-col gap-4">
                  <div>
                    <CollapsedDateInput
                      range={range}
                      onExpand={() => setStage("choose-calendar")}
                      invalid={
                        triedAdvance && (!dateRangeValid || minNightsWarning)
                      }
                    />
                    {triedAdvance && minNightsWarning && (
                      <p className="mt-2 text-sm text-rose-700" role="alert">
                        {t("minNightsWarning")}
                      </p>
                    )}
                  </div>

                  <GuestCountInput
                    value={guests}
                    onChange={setGuests}
                    invalid={triedAdvance && !guestsValid}
                    errorId="guests-error"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAdvanceFromChoose}
                  className="mt-5 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)]"
                >
                  {t("seePrice")} →
                </button>
              </div>
            )}

            {stage === "choose-calendar" && (
              <AvailabilityCalendar
                config={config}
                range={range}
                onRangeChange={onRangeChange}
                onConfirm={() => setStage("choose")}
              />
            )}

            {stage === "review" && breakdown && (
              <div className="flex h-full flex-col">
                <StageProgress current={2} total={TOTAL_STAGES} />
                <div className="flex-1 overflow-y-auto">
                  <PriceSummary
                    breakdown={breakdown}
                    guests={typeof guests === "number" ? guests : 1}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setStage("inquiry")}
                  className="mt-5 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)]"
                >
                  {t("next")} →
                </button>
              </div>
            )}

            {stage === "inquiry" && (
              <form
                onSubmit={handleSubmit}
                className="flex h-full flex-col"
                autoComplete="off"
              >
                <StageProgress current={3} total={TOTAL_STAGES} />
                <div className="flex-1 overflow-y-auto">
                  <InquiryForm
                    values={form}
                    onChange={handleFormChange}
                    invalid={formInvalid}
                    disabled={submitState === "sending"}
                  />
                  {submitState === "error" && (
                    <p
                      className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
                      role="alert"
                    >
                      {t("submitError")}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitState === "sending"}
                  className="mt-5 rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)] disabled:opacity-60"
                >
                  {submitState === "sending"
                    ? t("sending")
                    : t("sendInquiry")}
                </button>
              </form>
            )}

            {stage === "sent" && (
              <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <Check
                    className="h-8 w-8 text-emerald-600"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  {t("thankYouTitle")}
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  {t("thankYouBody")}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_var(--shadow-brand)] transition hover:-translate-y-0.5 hover:bg-[var(--brand-hover)] hover:shadow-[0_12px_32px_-8px_var(--shadow-brand-strong)]"
                >
                  {t("thankYouClose")}
                </button>
              </div>
            )}
          </div>

          {closePrompt && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 p-5"
              onClick={() => setClosePrompt(false)}
            >
              <div
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-sm text-[var(--foreground)]">
                  {t("closeDirtyPrompt")}
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => setClosePrompt(false)}
                    className="rounded-xl border border-[var(--surface-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface)]"
                  >
                    {t("closeDirtyKeep")}
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscardAndClose}
                    className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                  >
                    {t("closeDirtyDiscard")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
