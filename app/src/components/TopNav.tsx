"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/pricing", label: "Cennik" },
  { href: "/gallery", label: "Galeria" },
  { href: "/location", label: "Okolica" },
  { href: "/contact", label: "Kontakt" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const effectivePath =
    pathname || (typeof window !== "undefined" ? window.location.pathname : "");
  const isPathReady = Boolean(effectivePath);
  const isHome = effectivePath === "/";
  const showSolidNav = hasMounted && isPathReady && !isHome;

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <header className="absolute top-0 left-0 z-30 w-full">
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-3 pb-2">
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
              className="block h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h-2.5a4.5 4.5 0 0 0-4.5 4.5V10H6v4h2v7h4v-7h3l1-4h-4V7.5A1.5 1.5 0 0 1 13.5 6H15V3Z" />
            </svg>
          </a>
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
              className="block h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </a>
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
              className="block h-[18px] w-[18px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </a>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-1 pb-6 md:pb-8">
        <div
          className="text-xs tracking-[0.35em] uppercase text-[var(--brand)]"
        >
          Villa Monte Calvia
        </div>

        <nav
          className={`hidden items-center gap-8 text-[18px] font-medium tracking-[0.08em] md:flex ${
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
                  className={`absolute -bottom-2 left-0 h-[2px] w-[70%] origin-left rounded-full transition-transform duration-300 ${
                    isHome ? "bg-white/90" : "bg-[var(--accent-strong)]"
                  } ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
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
                className="text-sm font-medium tracking-[0.08em] text-[#FFFFFFE6] transition hover:text-[#FFFFFFE6]"
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
