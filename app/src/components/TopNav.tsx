"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Strona główna" },
  { href: "/gallery", label: "Galeria" },
  { href: "/contact", label: "Kontakt" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <header
      className={`left-0 top-0 z-30 w-full ${
        isHome
          ? "absolute"
          : "sticky border-b border-[var(--surface)] bg-[var(--background)]/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-5">
        <div
          className={`flex items-center gap-4 text-sm ${
            isHome ? "text-white/80" : "text-[var(--muted)]"
          }`}
        >
          <a
            className={`transition ${
              isHome
                ? "hover:text-white"
                : "hover:text-[var(--accent-strong)]"
            }`}
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.5 9.5V7.2c0-.7.4-1.1 1.1-1.1h1.7V4h-2.3C11.8 4 11 5.1 11 6.8v2.7H9v2.6h2v7.9h2.5v-7.9h2.2l.4-2.6h-2.6Z" />
            </svg>
          </a>
          <a
            className={`transition ${
              isHome
                ? "hover:text-white"
                : "hover:text-[var(--accent-strong)]"
            }`}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.5 7.5h.01M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6.5-.6a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:py-8">
        <div
          className={`text-xs uppercase tracking-[0.35em] ${
            isHome ? "text-white/80" : "text-[var(--foreground)]"
          }`}
        >
          Villa Monte Calvia
        </div>

        <nav
          className={`hidden items-center gap-8 text-[15px] font-semibold uppercase tracking-[0.18em] md:flex ${
            isHome ? "text-white/90" : "text-[var(--foreground)]"
          }`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative transition ${
                  isActive
                    ? isHome
                      ? "text-white"
                      : "text-[var(--accent-strong)]"
                    : isHome
                      ? "hover:text-white"
                      : "hover:text-[var(--accent-strong)]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full transition-transform duration-300 ${
                    isHome ? "bg-white/90" : "bg-[var(--accent-strong)]"
                  } ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] md:hidden ${
            isHome
              ? "border-white/40 text-white/90"
              : "border-[var(--surface)] text-[var(--foreground)]"
          }`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={handleToggle}
        >
          Menu
          <span className="relative h-4 w-4">
            <span
              className={`absolute left-0 top-1 block h-[2px] w-4 rounded-full transition ${
                isOpen ? "translate-y-[5px] rotate-45" : ""
              } ${isHome ? "bg-white" : "bg-[var(--foreground)]"}`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-4 -translate-y-1/2 rounded-full transition ${
                isOpen ? "opacity-0" : ""
              } ${isHome ? "bg-white" : "bg-[var(--foreground)]"}`}
            />
            <span
              className={`absolute left-0 bottom-1 block h-[2px] w-4 rounded-full transition ${
                isOpen ? "-translate-y-[5px] -rotate-45" : ""
              } ${isHome ? "bg-white" : "bg-[var(--foreground)]"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden ${
          isHome
            ? "bg-[#0b0f0a]/95 text-white"
            : "bg-[var(--background)] text-[var(--foreground)]"
        } ${
          isOpen ? "max-h-96 border-t border-white/15" : "max-h-0"
        } overflow-hidden transition-all`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "text-[var(--accent)]"
                    : isHome
                      ? "text-white/90 hover:text-white"
                      : "text-[var(--foreground)] hover:text-[var(--accent-strong)]"
                }`}
                onClick={handleClose}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
