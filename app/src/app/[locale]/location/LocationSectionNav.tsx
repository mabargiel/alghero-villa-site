"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type NavItem = { id: string; label: string };

type LocationSectionNavProps = Readonly<{
  items: NavItem[];
  ariaLabel: string;
  hideUntilPastId?: string;
}>;

function labelStyle(isActive: boolean, isHovered: boolean): string {
  if (isActive) return "font-semibold text-[var(--accent-strong)]";
  if (isHovered) return "font-medium text-[var(--foreground)] opacity-70";
  return "font-normal text-[var(--muted)] opacity-40";
}

export default function LocationSectionNav({
  items,
  ariaLabel,
  hideUntilPastId,
}: LocationSectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(() => !hideUntilPastId);
  const navRef = useRef<HTMLElement>(null);

  // Hide nav while the sentinel element is in view
  useEffect(() => {
    if (!hideUntilPastId) return;
    const sentinel = document.getElementById(hideUntilPastId);
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
  }, [hideUntilPastId]);

  // Track which section is in view
  useEffect(() => {
    const ids = items.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 80;
    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 xl:flex 2xl:right-10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label={ariaLabel}
    >
      {items.map((item) => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group flex items-center gap-2.5 transition-all"
            aria-label={item.label}
            aria-current={isActive ? "true" : undefined}
          >
            <span
              className={`max-w-[min(200px,30vw)] truncate text-xs transition-all duration-200 ${labelStyle(isActive, isHovered)}`}
            >
              {item.label}
            </span>
            <span
              className={`block shrink-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "h-2.5 w-2.5 bg-[var(--accent-strong)] shadow-[0_0_6px_var(--shadow-brand)]"
                  : "h-1.5 w-1.5 bg-[var(--muted)] opacity-40 group-hover:h-2 group-hover:w-2 group-hover:opacity-70"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
