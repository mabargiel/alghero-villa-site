"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import SocialIcon from "@/components/SocialIcon";

const VILLA_COORDS = "40.58021945061172,8.3685655685544";
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${VILLA_COORDS}`;

export default function ContactInfoPanel() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-6">
      {/* Static map with pin overlay */}
      <div className="relative mb-5">
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="group relative block overflow-hidden rounded-2xl"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/map-alghero.png"
            alt={t("mapAlt")}
            className="w-full object-cover transition group-hover:brightness-95"
          />
          {/* Inset border */}
          <span className="pointer-events-none absolute inset-2 rounded-xl border border-black/8" />
          {/* Pin overlay */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <MapPin
              className="h-8 w-8 fill-[var(--accent)] text-white drop-shadow-md"
              strokeWidth={1.5}
            />
          </span>
        </a>
        {/* CTA button — half outside the map */}
        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 rounded-xl bg-gradient-to-r from-[var(--accent-strong)] to-[var(--accent)] px-10 py-2 text-xs font-semibold tracking-[0.15em] text-white uppercase shadow-[0_16px_34px_-22px_rgba(0,0,0,0.7)] transition hover:translate-y-[calc(50%-2px)] hover:shadow-[0_22px_50px_-28px_rgba(0,0,0,0.75)]"
        >
          {t("getDirections")}
        </a>
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-3">
        <a
          href="tel:+393207171841"
          className="inline-flex items-center gap-3 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
        >
          <Phone className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.8} />
          +39 320 717 1841
        </a>
        <a
          href="mailto:contact@montecalvia.com"
          className="inline-flex items-center gap-3 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--accent)]"
        >
          <Mail className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.8} />
          contact@montecalvia.com
        </a>
      </div>

      {/* Social links */}
      <div className="flex items-center gap-4 text-[var(--accent-strong)]">
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <SocialIcon name="facebook" className="h-5 w-5" />
          Facebook
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <SocialIcon name="instagram" className="h-5 w-5" />
          Instagram
        </a>
        <a
          className="inline-flex items-center gap-2 text-sm font-semibold transition hover:text-[var(--accent)]"
          href="https://www.google.com/search?sca_esv=01e84e26bfa42c3c&hl=pl&authuser=0&sxsrf=ANbL-n6NmWfmS8WlWdzEkLpDLwXNZkgpwA:1770480521981&kgmid=/g/11yy4gd_gs&q=Villa+Monte+Calvia&shndl=30&source=sh/x/loc/uni/m1/1&kgs=16a3d798bec3e108&shem=shrtsdl&utm_source=shrtsdl,sh/x/loc/uni/m1/1"
          target="_blank"
          rel="noreferrer"
          aria-label="Google"
        >
          <SocialIcon name="googlemaps" className="h-5 w-5" />
          Google
        </a>
      </div>
    </div>
  );
}
