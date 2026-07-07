"use client";

import { useCallback, useEffect, useState } from "react";

/** Height of the fixed header, subtracted so scrolled-to sections aren't hidden under it. */
const NAV_OFFSET = 80;

/**
 * Returns a `scrollTo(id)` that smooth-scrolls an element into view, offset by
 * the fixed header. Shared by every in-page section nav.
 */
export function useScrollToSection(offset = NAV_OFFSET) {
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [offset],
  );
}

/**
 * Tracks which of the given section ids is currently the topmost one in view.
 * The rootMargin biases selection toward the section occupying the upper-middle
 * of the viewport.
 */
export function useActiveSection(ids: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .filter(Boolean)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}

/**
 * Returns whether a nav should be visible: hidden until the sentinel element
 * (e.g. a hero) has been scrolled past above the viewport. When no sentinel id
 * is given the nav is always visible.
 */
export function useVisibleAfterPast(sentinelId: string | undefined): boolean {
  const [visible, setVisible] = useState(() => !sentinelId);

  useEffect(() => {
    if (!sentinelId) return;
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0,
        );
      },
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return visible;
}
