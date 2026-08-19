import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Spanish and German translations are ready but remain unpublished until
  // the wider site content is complete.
  locales: ["en", "ru"],
  defaultLocale: "en",
});
