import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

function AnimatedNavLabel({ label }: { label: string }) {
  return (
    <span className="nav-label" aria-hidden="true">
      {Array.from(label).map((character, index) => (
        <span
          key={`${character}-${index}`}
          className="nav-label-char"
          style={{ animationDelay: `${index * 24}ms` }}
        >
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="site-nav">
      <Link
        href="/"
        className="mirit-wordmark"
      >
        MIRIT
      </Link>

      <div className="nav-links">
        <Link href="/what-we-do" aria-label={t("whatWeDo")}>
          <AnimatedNavLabel label={t("whatWeDo")} />
        </Link>

        <Link
          href="/gambia-project"
          aria-label={t("gambiaProject")}
        >
          <AnimatedNavLabel label={t("gambiaProject")} />
        </Link>

        <Link
          href="/articles"
          aria-label={t("research")}
        >
          <AnimatedNavLabel label={t("research")} />
        </Link>

        <Link
          href="/about"
          aria-label={t("about")}
        >
          <AnimatedNavLabel label={t("about")} />
        </Link>

        <Link
          href="/contact"
          aria-label={t("contact")}
        >
          <AnimatedNavLabel label={t("contact")} />
        </Link>

        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
