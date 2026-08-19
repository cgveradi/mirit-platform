import type { MetadataRoute } from "next";

const siteUrl = "https://mirit.org";
const routes = ["", "/about", "/what-we-do", "/work", "/articles", "/gambia-project", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) => {
    const locales = ["en", "ru"] as const;
    const urls = Object.fromEntries(locales.map((locale) => [locale, `${siteUrl}/${locale}${route}`]));
    const alternates = {
      languages: {
        ...urls,
        "x-default": urls.en,
      },
    };

    return locales.map((locale) => ({
        url: urls[locale],
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? (locale === "en" ? 1 : 0.9) : 0.7,
        alternates,
      }));
  });
}
