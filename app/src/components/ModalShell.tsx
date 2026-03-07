"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

type ModalShellProps = Readonly<{
  onClose: () => void;
  closeLabel: string;
  title: string;
  children: React.ReactNode;
}>;

export default function ModalShell({
  onClose,
  closeLabel,
  title,
  children,
}: ModalShellProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="pricing-modal-backdrop fixed inset-0 z-50 bg-transparent p-4 backdrop:bg-black/50"
      onCancel={handleCancel}
      onMouseDown={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="flex min-h-full items-center justify-center">
        <div className="pricing-modal-content relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-[var(--background)] p-6 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35)] sm:p-8">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--muted)] transition hover:bg-[var(--surface-strong)] hover:text-[var(--foreground)]"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </button>

          <h2 className="mb-6 text-xl font-semibold text-[var(--foreground)]">
            {title}
          </h2>

          {children}
        </div>
      </div>
    </dialog>
  );
}
