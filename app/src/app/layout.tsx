import type { Metadata } from "next";
import { Lato } from "next/font/google";
import TopNav from "@/components/TopNav";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Villa Monte Calvia — Alghero",
    template: "%s | Villa Monte Calvia",
  },
  description:
    "Elegancka, ciepła willa w Alghero z ogromnym ogrodem — idealna dla rodzin i grup szukających wypoczynku wśród natury Sardynii.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://montecalvia.com",
  ),
  openGraph: {
    title: "Villa Monte Calvia — Alghero",
    description:
      "Elegancka, ciepła willa w Alghero z ogromnym ogrodem — idealna dla rodzin i grup szukających wypoczynku wśród natury Sardynii.",
    type: "website",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Monte Calvia — Alghero",
    description:
      "Elegancka, ciepła willa w Alghero z ogromnym ogrodem — idealna dla rodzin i grup szukających wypoczynku wśród natury Sardynii.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${lato.variable} antialiased`}>
        <TopNav />
        {children}
        <footer className="mt-12 w-full bg-[var(--surface-strong)]">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-white/30 p-6 pt-8 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
            <span>
              © {new Date().getFullYear()} Villa Monte Calvia TM. All rights
              reserved.
            </span>
            <span>
              Designed and implemented by{" "}
              <a
                href="https://github.com/mabargiel/alghero-villa-site"
                className="font-semibold text-[var(--foreground)] underline decoration-[var(--accent)] underline-offset-4 transition hover:text-[var(--accent-strong)]"
                target="_blank"
                rel="noreferrer"
              >
                Mateusz Bargiel
              </a>
              .
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
