import { Analytics } from "@vercel/analytics/next";
import { Lato } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${lato.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
