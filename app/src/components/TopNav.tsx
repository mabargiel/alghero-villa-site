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
      className={`top-0 left-0 z-30 w-full ${
        isHome
          ? "absolute"
          : "sticky border-b border-[var(--surface)] bg-[var(--background)]/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-1">
        <div
          className={`flex items-center gap-3 text-sm ${
            isHome ? "text-white/65" : "text-[var(--muted)]"
          }`}
        >
          <a
            className={`transition ${
              isHome ? "hover:text-white" : "hover:text-[var(--accent-strong)]"
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
          <span
            className={`h-4 w-px ${
              isHome ? "bg-white/25" : "bg-[var(--surface-strong)]"
            }`}
            aria-hidden="true"
          />
          <a
            className={`transition ${
              isHome ? "hover:text-white" : "hover:text-[var(--accent-strong)]"
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
          <span
            className={`h-4 w-px ${
              isHome ? "bg-white/25" : "bg-[var(--surface-strong)]"
            }`}
            aria-hidden="true"
          />
          <a
            className={`transition ${
              isHome ? "hover:text-white" : "hover:text-[var(--accent-strong)]"
            }`}
            href="https://www.google.com/search?sca_esv=01e84e26bfa42c3c&hl=pl&authuser=0&sxsrf=ANbL-n6NmWfmS8WlWdzEkLpDLwXNZkgpwA:1770480521981&kgmid=/g/11yy4gd_gs&q=Villa+Monte+Calvia&shndl=30&source=sh/x/loc/uni/m1/1&kgs=16a3d798bec3e108&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
            target="_blank"
            rel="noreferrer"
            aria-label="Google"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 10.2v3.7h5.2c-.5 2.3-2.5 3.7-5.2 3.7a5.9 5.9 0 1 1 0-11.8c1.6 0 2.9.6 3.9 1.5l2.5-2.5A9.3 9.3 0 0 0 12 2.7a9.3 9.3 0 1 0 0 18.6c4.7 0 8.8-3.4 8.8-9.1 0-.6-.1-1.1-.2-2H12Z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-0 pb-4 md:pb-6">
        <div
          className={`text-xs tracking-[0.35em] uppercase ${
            isHome ? "text-white/80" : "text-[var(--foreground)]"
          }`}
        >
          Villa Monte Calvia
        </div>

        <nav
          className={`hidden items-center gap-8 text-[15px] font-semibold tracking-[0.18em] uppercase md:flex ${
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
          className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold tracking-[0.18em] uppercase md:hidden ${
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
              className={`absolute top-1 left-0 block h-[2px] w-4 rounded-full transition ${
                isOpen ? "translate-y-[5px] rotate-45" : ""
              } ${isHome ? "bg-white" : "bg-[var(--foreground)]"}`}
            />
            <span
              className={`absolute top-1/2 left-0 block h-[2px] w-4 -translate-y-1/2 rounded-full transition ${
                isOpen ? "opacity-0" : ""
              } ${isHome ? "bg-white" : "bg-[var(--foreground)]"}`}
            />
            <span
              className={`absolute bottom-1 left-0 block h-[2px] w-4 rounded-full transition ${
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
                className={`text-sm font-semibold tracking-[0.18em] uppercase transition ${
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
