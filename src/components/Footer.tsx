import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-muted/20 px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted">
          © MIRIT. {tFooter("rights")}
        </p>

        <div className="flex gap-6">
          <Link
            href="/about"
            className="hover:text-foreground transition-colors"
          >
            {tNav("about")}
          </Link>

          <Link
            href="/work"
            className="hover:text-foreground transition-colors"
          >
            {tNav("work")}
          </Link>

          <Link
            href="/contact"
            className="hover:text-foreground transition-colors"
          >
            {tNav("contact")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
