"use client";

import SectionNavButton from "@/components/SectionNavButton";
import {
  useActiveSection,
  useScrollToSection,
  useVisibleAfterPast,
} from "@/hooks/useSectionNav";

type SubNavGroup = {
  label: string;
  items: { id: string; label: string }[];
};

type VillaSubNavProps = Readonly<{
  groups: SubNavGroup[];
  ariaLabel?: string;
  /** ID of an element — nav is hidden until this element leaves the viewport */
  hideUntilPastId?: string;
}>;

export default function VillaSubNav({
  groups,
  ariaLabel,
  hideUntilPastId,
}: VillaSubNavProps) {
  const allIds = groups.flatMap((g) => g.items.map((item) => item.id));
  const activeId = useActiveSection(allIds);
  const visible = useVisibleAfterPast(hideUntilPastId);
  const scrollTo = useScrollToSection();

  return (
    <nav
      className={`fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 xl:flex 2xl:right-10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label={ariaLabel}
    >
      {groups.map((group, gi) => (
        <div key={group.label} className="flex flex-col items-end gap-2">
          {gi > 0 && (
            <div className="my-2 h-px w-6 bg-[var(--surface-strong)]" />
          )}
          <span className="text-[10px] font-semibold tracking-[0.15em] text-[var(--muted)] uppercase opacity-60">
            {group.label}
          </span>
          {group.items.map((item) => (
            <SectionNavButton
              key={item.id}
              label={item.label}
              isActive={activeId === item.id}
              onClick={() => scrollTo(item.id)}
            />
          ))}
        </div>
      ))}
    </nav>
  );
}
