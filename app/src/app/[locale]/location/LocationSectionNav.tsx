"use client";

import SectionNavButton from "@/components/SectionNavButton";
import {
  useActiveSection,
  useScrollToSection,
  useVisibleAfterPast,
} from "@/hooks/useSectionNav";

type NavItem = { id: string; label: string };

type LocationSectionNavProps = Readonly<{
  items: NavItem[];
  ariaLabel: string;
  hideUntilPastId?: string;
}>;

export default function LocationSectionNav({
  items,
  ariaLabel,
  hideUntilPastId,
}: LocationSectionNavProps) {
  const activeId = useActiveSection(items.map((item) => item.id));
  const visible = useVisibleAfterPast(hideUntilPastId);
  const scrollTo = useScrollToSection();

  return (
    <nav
      className={`fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 transition-opacity duration-300 xl:flex 2xl:right-10 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <SectionNavButton
          key={item.id}
          label={item.label}
          isActive={activeId === item.id}
          onClick={() => scrollTo(item.id)}
        />
      ))}
    </nav>
  );
}
