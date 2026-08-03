import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("nav");

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-background text-foreground">
      <Link href="/" className="font-bold text-lg tracking-tight">MIRIT</Link>
      <div className="flex gap-6 text-sm text-muted">
        <Link href="/services" className="hover:text-foreground transition-colors">{t("services")}</Link>
        <Link href="/gambia-project" className="hover:text-foreground transition-colors">{t("gambiaProject")}</Link>
        <Link href="/articles" className="hover:text-foreground transition-colors">{t("articles")}</Link>
        <Link href="/about" className="hover:text-foreground transition-colors">{t("about")}</Link>
        <Link href="/contact" className="hover:text-foreground transition-colors">{t("contact")}</Link>
      </div>
    </nav>
  );
}