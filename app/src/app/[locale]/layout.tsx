import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import ConsentProvider from "@/components/ConsentProvider";
import CookieBanner from "@/components/CookieBanner";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import TopNav from "@/components/TopNav";
import TrackingPixels from "@/components/TrackingPixels";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    title: {
      default: t("title"),
      template: `%s | Villa Monte Calvia`,
    },
    description: t("description"),
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://montecalvia.com",
    ),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: t("ogLocale"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <NextIntlClientProvider messages={messages}>
      <ConsentProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: String.raw`(function(){if(window.location.pathname==='/'||window.location.pathname.match(/^\/[a-z]{2}\/?$/)){document.documentElement.classList.add('is-home')}})()`,
          }}
        />
        <TopNav />
        {children}
        <footer className="mt-12 w-full bg-[var(--surface-strong)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-white/30 p-6 pt-8 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
            <span>
              {t("allRightsReserved", { year: new Date().getFullYear() })}
            </span>
            <div className="flex items-center gap-3">
              <Link
                href="/privacy"
                className="underline decoration-[var(--accent)] underline-offset-4 transition hover:text-[var(--accent-strong)]"
              >
                {t("privacyPolicy")}
              </Link>
              <span className="text-white/30">|</span>
              <CookiePreferencesButton />
              <span className="text-white/30">|</span>
              <span>
                {t("designedBy")}{" "}
                <a
                  href="https://github.com/mabargiel/alghero-villa-site"
                  className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4 transition hover:text-[var(--accent-strong)]"
                  target="_blank"
                  rel="noreferrer"
                >
                  Mateusz Bargiel
                </a>
                {"."}
              </span>
            </div>
          </div>
        </footer>
        <CookieBanner />
        <TrackingPixels />
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
