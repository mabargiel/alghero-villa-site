import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import TopNav from "@/components/TopNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <TopNav />
        {children}
      </body>
    </html>
  );
}
