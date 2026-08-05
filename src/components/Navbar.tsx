import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";

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
        <Link
          href="/services"
          className="hover:text-foreground transition-colors"
        >
          {t("whatWeDo")}
        </Link>

        <Link
          href="/gambia-project"
          className="hover:text-foreground transition-colors"
        >
          {t("gambiaProject")}
        </Link>

        <Link
          href="/articles"
          className="hover:text-foreground transition-colors"
        >
          {t("research")}
        </Link>

        <Link
          href="/about"
          className="hover:text-foreground transition-colors"
        >
          {t("about")}
        </Link>

        <Link
          href="/contact"
          className="hover:text-foreground transition-colors"
        >
          {t("contact")}
        </Link>

        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
}
