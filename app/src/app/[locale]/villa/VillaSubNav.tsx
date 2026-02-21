"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type SubNavGroup = {
  label: string;
  items: { id: string; label: string }[];
};

type VillaSubNavProps = Readonly<{
  groups: SubNavGroup[];
  ariaLabel?: string;
}>;

function labelStyle(isActive: boolean, isHovered: boolean): string {
  if (isActive) return "font-semibold text-[var(--accent-strong)]";
  if (isHovered) return "font-medium text-[var(--foreground)] opacity-70";
  return "font-normal text-[var(--muted)] opacity-40";
}

export default function VillaSubNav({ groups, ariaLabel }: VillaSubNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const allItems = groups.flatMap((g) =>
    g.items.map((item) => ({ ...item, group: g.label })),
  );

  // IntersectionObserver to track which section is in view
  useEffect(() => {
    const ids = allItems.map((item) => item.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [allItems]);

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
      className="fixed top-[58%] right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex 2xl:right-10"
      aria-label={ariaLabel}
    >
      {groups.map((group, gi) => (
        <div key={group.label} className="flex flex-col items-end gap-2">
          {gi > 0 && (
            <div className="my-1 h-px w-4 bg-[var(--surface-strong)]" />
          )}
          {group.items.map((item) => {
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
                {/* Label — always visible, active is bold accent, inactive is muted */}
                <span
                  className={`max-w-[min(200px,30vw)] truncate text-xs transition-all duration-200 ${labelStyle(isActive, isHovered)}`}
                >
                  {item.label}
                </span>

                {/* Dot */}
                <span
                  className={`block shrink-0 rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-2.5 w-2.5 bg-[var(--accent-strong)] shadow-[0_0_6px_rgba(72,104,90,0.4)]"
                      : "h-1.5 w-1.5 bg-[var(--muted)] opacity-40 group-hover:h-2 group-hover:w-2 group-hover:opacity-70"
                  }`}
                />
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
