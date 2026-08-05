"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "ru" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      className="language-toggle"
      aria-label={`Switch language to ${otherLocale.toUpperCase()}`}
    >
      {otherLocale.toUpperCase()}
    </button>
  );
}
