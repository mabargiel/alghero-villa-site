import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import ConsentProvider from "@/components/ConsentProvider";
import CookieBanner from "@/components/CookieBanner";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";
import PricingModalProvider from "@/components/PricingModalProvider";
import TopNav from "@/components/TopNav";
import TrackingPixels from "@/components/TrackingPixels";
import { getPricingConfig } from "@/lib/sanity/queries";

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

  const [messages, pricingConfig] = await Promise.all([
    getMessages(),
    getPricingConfig(),
  ]);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <NextIntlClientProvider messages={messages}>
      <ConsentProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: String.raw`(function(){if(window.location.pathname==='/'||window.location.pathname.match(/^\/[a-z]{2}\/?$/)){document.documentElement.classList.add('is-home')}})()`,
          }}
        />
        <PricingModalProvider config={pricingConfig}>
          <TopNav />
          {children}
          <footer className="mt-12 w-full bg-[var(--surface-strong)]">
            <div className="mx-auto max-w-6xl px-6 py-10">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
                    Villa Monte Calvia
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--muted)]">
                    Alghero, Sardinia
                  </p>
                  <div className="space-y-1 text-xs text-[var(--muted)]">
                    <a
                      href="tel:+393207171841"
                      className="block transition hover:text-[var(--accent-warm)]"
                    >
                      +39 320 717 1841
                    </a>
                    <a
                      href="mailto:contact@montecalvia.com"
                      className="block transition hover:text-[var(--accent-warm)]"
                    >
                      contact@montecalvia.com
                    </a>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
                    Legal
                  </h3>
                  <div className="flex flex-col gap-1.5 text-xs text-[var(--muted)]">
                    <Link
                      href="/privacy"
                      className="transition hover:text-[var(--accent-sky)]"
                    >
                      {t("privacyPolicy")}
                    </Link>
                    <Link
                      href="/house-rules"
                      className="transition hover:text-[var(--accent-sky)]"
                    >
                      {t("houseRules")}
                    </Link>
                    <Link
                      href="/privacy"
                      className="transition hover:text-[var(--accent-sky)]"
                    >
                      {t("cookiePolicy")}
                    </Link>
                    <CookiePreferencesButton />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
                    {t("designedBy")}
                  </h3>
                  <a
                    href="https://github.com/mabargiel/alghero-villa-site"
                    className="text-xs font-semibold text-[var(--muted)] transition hover:text-[var(--accent-sky)]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mateusz Bargiel
                  </a>
                </div>
              </div>

              <div className="mt-8 border-t border-white/20 pt-6 text-center text-xs text-[var(--muted)]">
                {t("allRightsReserved", { year: new Date().getFullYear() })}
              </div>
            </div>
          </footer>
          <CookieBanner />
          <TrackingPixels />
        </PricingModalProvider>
      </ConsentProvider>
    </NextIntlClientProvider>
  );
}
