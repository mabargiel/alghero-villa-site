"use client";

import { useState } from "react";

function labelStyle(isActive: boolean, isHovered: boolean): string {
  if (isActive) return "font-semibold text-[var(--accent-strong)]";
  if (isHovered) return "font-medium text-[var(--foreground)] opacity-70";
  return "font-normal text-[var(--muted)] opacity-40";
}

type SectionNavButtonProps = Readonly<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}>;

/** A single label + dot entry in a vertical section nav (villa / location). */
export default function SectionNavButton({
  label,
  isActive,
  onClick,
}: SectionNavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center gap-2.5 transition-all"
      aria-label={label}
      aria-current={isActive ? "true" : undefined}
    >
      <span
        className={`max-w-[min(200px,30vw)] truncate text-xs transition-all duration-200 ${labelStyle(isActive, isHovered)}`}
      >
        {label}
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
}
