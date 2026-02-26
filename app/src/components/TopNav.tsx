"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useState } from "react";
import SocialIcon from "@/components/SocialIcon";
import { routing } from "@/i18n/routing";

const navItems = [
  { href: "/" as const, key: "home" },
  { href: "/villa" as const, key: "villa" },
  { href: "/location" as const, key: "location" },
  { href: "/gallery" as const, key: "gallery" },
  { href: "/contact" as const, key: "contact" },
];

const localeLabels: Record<string, string> = {
  en: "EN",
  it: "IT",
  pl: "PL",
  es: "ES",
  fr: "FR",
  de: "DE",
};

export default function TopNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <header className="absolute top-0 left-0 z-30 w-full">
      <div className="mx-auto flex max-w-6xl justify-end px-6 pt-3 pb-2">
        <div className="flex items-center gap-4 text-sm text-[var(--nav-text-muted)]">
          <div className="flex items-center gap-4">
            <a
              className="transition hover:text-[var(--nav-text-hover)]"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label={t("facebookAria")}
            >
              <SocialIcon name="facebook" className="block h-[18px] w-[18px]" />
            </a>
            <a
              className="transition hover:text-[var(--nav-text-hover)]"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label={t("instagramAria")}
            >
              <SocialIcon
                name="instagram"
                className="block h-[18px] w-[18px]"
              />
            </a>
            <a
              className="transition hover:text-[var(--nav-text-hover)]"
              href="https://www.google.com/search?sca_esv=01e84e26bfa42c3c&hl=pl&authuser=0&sxsrf=ANbL-n6NmWfmS8WlWdzEkLpDLwXNZkgpwA:1770480521981&kgmid=/g/11yy4gd_gs&q=Villa+Monte+Calvia&shndl=30&source=sh/x/loc/uni/m1/1&kgs=16a3d798bec3e108&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
              target="_blank"
              rel="noreferrer"
              aria-label={t("googleAria")}
            >
              <SocialIcon
                name="googlemaps"
                className="block h-[18px] w-[18px]"
              />
            </a>
          </div>
          <span className="h-3.5 w-px bg-[var(--nav-text-muted)] opacity-40" />
          <div className="flex items-center gap-2">
            {routing.locales.map((loc, index) => (
              <span key={loc} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="h-2.5 w-px bg-[var(--nav-text-muted)] opacity-30" />
                )}
                <Link
                  href={pathname}
                  locale={loc}
                  className={`text-xs tracking-[0.1em] transition ${
                    loc === locale
                      ? "font-bold text-[var(--nav-active)]"
                      : "text-[var(--nav-text-muted)] hover:text-[var(--nav-text-hover)]"
                  }`}
                >
                  {localeLabels[loc]}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-1 pb-6 md:pb-8">
        <Link href="/" aria-label={t("logoAria")}>
          <span
            className="block h-20 w-64 [filter:var(--nav-logo-shadow)]"
            style={{
              maskImage: "url(/logo.svg)",
              WebkitMaskImage: "url(/logo.svg)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "left center",
              WebkitMaskPosition: "left center",
              backgroundColor: "var(--nav-logo-bg)",
            }}
          />
        </Link>

        <nav className="hidden items-center gap-8 text-[18px] font-medium tracking-[0.08em] text-[var(--nav-text)] md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative transition ${
                  isActive
                    ? "text-[var(--nav-active)]"
                    : "hover:text-[var(--nav-text-hover)]"
                }`}
              >
                {t(item.key)}
                <span
                  className={`absolute -bottom-2 left-0 h-[2px] w-[70%] origin-left rounded-full bg-[var(--nav-underline)] transition-transform duration-300 ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          className="flex items-center gap-2 rounded-full border border-[var(--nav-border)] px-3 py-2 text-xs font-semibold tracking-[0.18em] text-[var(--nav-text)] uppercase md:hidden"
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          onClick={handleToggle}
        >
          {t("menu")}
          <span className="relative h-4 w-4">
            <span
              className={`absolute top-1 left-0 block h-[2px] w-4 rounded-full bg-[var(--nav-hamburger)] transition ${
                isOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute top-1/2 left-0 block h-[2px] w-4 -translate-y-1/2 rounded-full bg-[var(--nav-hamburger)] transition ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute bottom-1 left-0 block h-[2px] w-4 rounded-full bg-[var(--nav-hamburger)] transition ${
                isOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`bg-[var(--nav-mobile-bg)] text-[var(--nav-mobile-text)] md:hidden ${
          isOpen
            ? "max-h-96 border-t border-[var(--nav-mobile-border)]"
            : "max-h-0"
        } overflow-hidden transition-all`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-[0.08em] text-inherit transition hover:opacity-80"
                onClick={handleClose}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
