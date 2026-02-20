import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://montecalvia.com";
  const paths = ["/", "/villa", "/gallery", "/contact"];

  return paths.map((path) => {
    const languages: Record<string, string> = {};
    for (const locale of routing.locales) {
      if (locale === routing.defaultLocale) {
        languages[locale] = `${baseUrl}${path}`;
      } else {
        languages[locale] = `${baseUrl}/${locale}${path}`;
      }
    }

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      alternates: {
        languages,
      },
    };
  });
}
