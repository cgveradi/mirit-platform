import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-muted/20 px-8 py-10 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} MIRIT. {t("rights")}</p>
        <div className="flex gap-6">
          <Link href="/about" className="hover:text-foreground transition-colors">{tNav("about")}</Link>
          <Link href="/services" className="hover:text-foreground transition-colors">{tNav("services")}</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">{tNav("contact")}</Link>
        </div>
      </div>
    </footer>
  );
}