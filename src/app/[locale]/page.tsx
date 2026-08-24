import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedHeroTitle from "@/components/AnimatedHeroTitle";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const localizedMetadata = {
    en: {
      title: "MIRIT — Research, Culture & Innovation",
      description: "MIRIT connects research, culture and technology through international programmes, practical research and purposeful digital solutions.",
      openGraphLocale: "en_GB",
    },
    ru: {
      title: "MIRIT — Исследования, культура и инновации",
      description: "MIRIT объединяет исследования, культуру и технологии, создавая международные программы, практические исследования и полезные цифровые решения.",
      openGraphLocale: "ru_RU",
    },
    es: {
      title: "MIRIT — Investigación, cultura e innovación",
      description: "MIRIT conecta la investigación, la cultura y la tecnología mediante programas internacionales, investigación aplicada y soluciones digitales con propósito.",
      openGraphLocale: "es_ES",
    },
    de: {
      title: "MIRIT — Forschung, Kultur und Innovation",
      description: "MIRIT verbindet Forschung, Kultur und Technologie durch internationale Programme, praxisnahe Forschung und sinnvolle digitale Lösungen.",
      openGraphLocale: "de_DE",
    },
  } as const;
  const current = localizedMetadata[locale as keyof typeof localizedMetadata] ?? localizedMetadata.en;
  const { title, description } = current;
  const canonicalPath = `/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en",
        ru: "/ru",
        "x-default": "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      locale: current.openGraphLocale,
    },
    twitter: { title, description },
  };
}

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <main className="home-page">
      <section className="hero-shell">
        <svg className="hero-wave-field" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 11 }, (_, row) => {
            const path = Array.from({ length: 29 }, (_, point) => {
              const x = -120 + point * 60;
              const y = 130 + row * 64
                + Math.sin(point * .38 + row * .72) * (22 + Math.abs(row - 5) * 2.2)
                + Math.sin(point * .17 - row * .46) * 12;

              return `${point === 0 ? "M" : "L"} ${x} ${y.toFixed(2)}`;
            }).join(" ");

            return <path key={row} className={`hero-wave hero-wave-${row % 3}`} d={path} />;
          })}
        </svg>
        <div className="hero-content">
          <p className="eyebrow hero-reveal">MIRIT / 01—26</p>
          <div className="hero-main hero-reveal">
            <AnimatedHeroTitle>{t("title")}</AnimatedHeroTitle>
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

      <section id="perspective" className="paths-section" aria-label={t("pathsEyebrow")}>
        <ScrollReveal>
          <div className="paths-heading">
            <p className="eyebrow">{t("pathsEyebrow")}</p>
          </div>
          <div className="paths-grid">
            <Link href="/gambia-project" className="path-card path-card-warm">
              <div className="path-card-topline"><span>01</span><em>{t("pathOneTag")}</em></div>
              <div className="path-card-visual">
                <Image src="/images/cards/gambia-cultural-exchange-editorial.png" alt="" fill sizes="(max-width: 760px) 42vw, 18rem" />
              </div>
              <div className="path-card-content"><h2>{t("pathOneTitle")}</h2><p>{t("pathOneText")}</p></div>
            </Link>
            <Link href="/articles" className="path-card path-card-cool">
              <div className="path-card-topline"><span>02</span><em>{t("pathTwoTag")}</em></div>
              <div className="path-card-visual">
                <Image src="/images/cards/research-articles-editorial.png" alt="" fill sizes="(max-width: 760px) 42vw, 18rem" />
              </div>
              <div className="path-card-content"><h2>{t("pathTwoTitle")}</h2><p>{t("pathTwoText")}</p></div>
            </Link>
            <Link href="/what-we-do" className="path-card path-card-digital">
              <div className="path-card-topline"><span>03</span><em>{t("pathThreeTag")}</em></div>
              <div className="path-card-visual">
                <Image
                  src="/images/miritai/data-ai-software-systems.png"
                  alt=""
                  fill
                  sizes="(max-width: 760px) 42vw, 18rem"
                />
              </div>
              <div className="path-card-content"><h2>{t("pathThreeTitle")}<span>{t("pathThreeTitleLineTwo")}</span></h2><p>{t("pathThreeText")}</p></div>
            </Link>
            <Link href="/about" className="path-card path-card-about">
              <div className="path-card-topline"><span>04</span><em>{t("pathFourTag")}</em></div>
              <div className="path-card-visual">
                <Image src="/images/cards/about-mirit-editorial-v2.png" alt="" fill sizes="(max-width: 760px) 42vw, 18rem" />
              </div>
              <div className="path-card-content"><h2>{t("pathFourTitle")}<span>{t("pathFourTitleLineTwo")}</span></h2><p>{t("pathFourText")}</p></div>
            </Link>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
