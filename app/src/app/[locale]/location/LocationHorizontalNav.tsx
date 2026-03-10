"use client";

import { useCallback } from "react";

type NavItem = { id: string; label: string };

type LocationHorizontalNavProps = Readonly<{
  items: NavItem[];
  ariaLabel: string;
}>;

export default function LocationHorizontalNav({
  items,
  ariaLabel,
}: LocationHorizontalNavProps) {
  const handleClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return (
    <nav
      id="location-horizontal-nav"
      className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-1 gap-y-2 px-6 pt-8 pb-4"
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <span key={item.id} className="inline-flex items-center gap-1">
          <button
            onClick={() => handleClick(item.id)}
            className="text-sm font-medium text-[var(--foreground)]/70 transition-colors hover:text-[var(--accent-strong)] md:text-base"
          >
            {item.label}
          </button>
          {index < items.length - 1 && (
            <span
              className="mx-1.5 inline-block h-1 w-1 rounded-full bg-[var(--muted)] opacity-40"
              aria-hidden="true"
            />
          )}
        </span>
      ))}
    </nav>
  );
}
