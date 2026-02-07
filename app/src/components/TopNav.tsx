"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Strona główna" },
  { href: "/gallery", label: "Galeria" },
  { href: "/contact", label: "Kontakt" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
      <div className="text-base uppercase tracking-[0.3em] text-[var(--muted)]">
        Villa Monte Calvia
      </div>
      <nav className="flex items-center gap-8 text-base text-[var(--muted)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative transition ${
                isActive
                  ? "text-[var(--foreground)]"
                  : "hover:text-[var(--foreground)]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-[var(--accent)] transition ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
