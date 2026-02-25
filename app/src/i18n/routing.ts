import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it", "pl", "es", "fr", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
