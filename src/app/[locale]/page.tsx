import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  const t = useTranslations("home");

  return (
    <main>
      <section className="hero-shell">
        <svg className="hero-dot-field" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 17 }, (_, row) => (
            <g key={row} className={`hero-dot-row hero-dot-row-${row % 4}`}>
              {Array.from({ length: 29 }, (_, column) => {
                const x = 20 + column * 50;
                const y = 105 + row * 43 + Math.sin(column * 0.42 + row * 0.62) * (15 + Math.abs(row - 8) * 1.35);
                const distanceFromCenter = Math.abs(column - 14) / 14;
                const distanceFromMiddle = Math.abs(row - 8) / 8;
                const radius = Math.max(.45, 1.25 - distanceFromCenter * .32 - distanceFromMiddle * .22);

                return <circle key={`${row}-${column}`} cx={x} cy={y} r={radius} />;
              })}
            </g>
          ))}
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
        <ScrollReveal>
          <p className="eyebrow">{t("perspectiveEyebrow")}</p>
          <div className="perspective-grid">
            <h2>{t("perspectiveTitle")}</h2>
            <div className="perspective-copy">
              <p>{t("perspectiveText")}</p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="paths-section" aria-label={t("pathsEyebrow")}>
        <ScrollReveal>
          <div className="paths-heading">
            <p className="eyebrow">{t("pathsEyebrow")}</p>
          </div>
          <div className="paths-grid">
            <Link href="/what-we-do" className="path-card path-card-digital">
              <div className="path-card-topline"><span>01</span><em>{t("pathThreeTag")}</em></div>
              <div className="path-card-visual path-card-visual-digital" aria-hidden="true">
                <svg className="digital-blueprint" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet">
                  <g className="digital-guides">
                    <path d="M76 102H564M76 258H564M142 58V300M498 58V300" />
                    <path d="M126 238L262 92M196 274L350 72M286 282L444 86M374 272L516 122" />
                    <path d="M102 180H538M320 48V312" />
                  </g>
                  <text x="320" y="215" textAnchor="middle">MIRIT</text>
                  <circle cx="548" cy="88" r="5" />
                  <circle cx="566" cy="88" r="5" />
                </svg>
              </div>
              <div className="path-card-content"><h2>{t("pathThreeTitle")}</h2><p>{t("pathThreeText")}</p></div>
              <b aria-hidden="true">↗</b>
            </Link>
            <Link href="/gambia-project" className="path-card path-card-warm">
              <div className="path-card-topline"><span>02</span><em>{t("pathOneTag")}</em></div>
              <div className="path-card-visual">
                <Image src="/images/gambia/community-connection-concept.png" alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
              <div className="path-card-content"><h2>{t("pathOneTitle")}</h2><p>{t("pathOneText")}</p></div>
              <b aria-hidden="true">↗</b>
            </Link>
            <Link href="/what-we-do" className="path-card path-card-cool">
              <div className="path-card-topline"><span>03</span><em>{t("pathTwoTag")}</em></div>
              <div className="path-card-visual">
                <Image src="/images/gambia/creative-exchange-concept.png" alt="" fill sizes="(max-width: 760px) 100vw, 33vw" />
              </div>
              <div className="path-card-content"><h2>{t("pathTwoTitle")}</h2><p>{t("pathTwoText")}</p></div>
              <b aria-hidden="true">↗</b>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="closing-section">
        <ScrollReveal><p className="eyebrow">{t("closingEyebrow")}</p><h2>{t("closingTitle")}</h2><Link href="/gambia-project" className="button-link">{t("ctaGambia")} <span aria-hidden="true">→</span></Link></ScrollReveal>
      </section>
    </main>
  );
}
