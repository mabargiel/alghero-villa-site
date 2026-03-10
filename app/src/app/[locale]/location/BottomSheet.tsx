"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type BottomSheetProps = Readonly<{
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}>;

const DRAG_THRESHOLD = 100;

export default function BottomSheet({
  open,
  onClose,
  children,
  ariaLabel,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);

  // Capture the element that opened the sheet for focus restoration
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the sheet container
      requestAnimationFrame(() => sheetRef.current?.focus());
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
    // Return focus
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, [onClose]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, handleClose]);

  // Touch drag handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    setDragging(true);
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!dragging) return;
      const dy = e.touches[0].clientY - startY.current;
      setDragY(Math.max(0, dy)); // Only allow dragging down
    },
    [dragging],
  );

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    if (dragY > DRAG_THRESHOLD) {
      handleClose();
    }
    setDragY(0);
  }, [dragY, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center xl:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl bg-[var(--background)] shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.3)] transition-transform outline-none"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragging ? "none" : "transform 300ms ease",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Drag handle */}
        <div className="sticky top-0 z-10 flex justify-center bg-[var(--background)] pt-3 pb-2">
          <div className="h-1 w-10 rounded-full bg-[var(--surface-strong)]" />
        </div>

        <div className="px-5 pb-8">{children}</div>
      </div>
    </div>
  );
}
