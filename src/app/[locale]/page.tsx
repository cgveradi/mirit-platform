import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main>
      <section className="hero-shell">
        <svg className="hero-waves" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          <path d="M-100 340C140 140 260 540 520 330S930 135 1160 318s340 50 440-120" />
          <path d="M-100 450c230-190 385 205 630 2s410-220 630-15 342 44 440-120" />
          <path d="M-100 585c225-180 420 185 657-7s400-202 615-2 330 35 428-114" />
          <path d="M-90 720c210-168 410 150 625-22s407-180 620 7 310 24 380-92" />
        </svg>
        <div className="hero-content">
          <p className="eyebrow hero-reveal">MIRIT / 01—26</p>
          <div className="hero-main hero-reveal">
            <h1 className="hero-title">{t("title")}</h1>
            <p className="hero-intro">{t("subtitle")}</p>
          </div>
          <div className="hero-bottom hero-reveal">
            <a className="scroll-cue" href="#perspective">
              <span>{t("scroll")}</span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section id="perspective" className="perspective-section">
        <p className="eyebrow">{t("perspectiveEyebrow")}</p>
        <div className="perspective-grid">
          <h2>{t("perspectiveTitle")}</h2>
          <div className="perspective-copy">
            <p>{t("perspectiveText")}</p>
            <Link href="/about" className="text-link">
              {t("ctaAbout")} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="paths-section" aria-label={t("pathsEyebrow")}>
        <div className="paths-heading">
          <p className="eyebrow">{t("pathsEyebrow")}</p>
          <p>{t("pathsIntro")}</p>
        </div>
        <div className="paths-grid">
          <Link href="/gambia-project" className="path-card path-card-warm">
            <span>01</span>
            <h2>{t("pathOneTitle")}</h2>
            <p>{t("pathOneText")}</p>
            <b aria-hidden="true">↗</b>
          </Link>
          <Link href="/what-we-do" className="path-card path-card-cool">
            <span>02</span>
            <h2>{t("pathTwoTitle")}</h2>
            <p>{t("pathTwoText")}</p>
            <b aria-hidden="true">↗</b>
          </Link>
        </div>
      </section>

      <section className="closing-section">
        <p className="eyebrow">{t("closingEyebrow")}</p>
        <h2>{t("closingTitle")}</h2>
        <Link href="/gambia-project" className="button-link">
          {t("ctaGambia")} <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
