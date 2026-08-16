import Image from "next/image";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "@/i18n/navigation";

const paths = ["digital", "culture", "research"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("work.seo");
  return { title: t("title"), description: t("description") };
}

export default async function WorkPage() {
  const t = await getTranslations("work");

  return (
    <main className="work-page">
      <section className="work-hero">
        <p className="eyebrow work-reveal">{t("eyebrow")}</p>
        <div className="work-hero-copy">
          <h1 className="work-reveal">{t("title")}</h1>
          <p className="work-reveal">{t("intro")}</p>
        </div>
      </section>

      <section className="work-paths" aria-label={t("pathsLabel")}>
        {paths.map((path, index) => (
          <a key={path} href={`#work-${path}`} className={`work-path-card work-path-card-${path}`}>
            <div className="work-path-media">
              {path === "digital" ? (
                <svg viewBox="0 0 640 460" aria-hidden="true" className="work-path-blueprint">
                  <g><path d="M72 112H568M72 348H568M150 54V406M490 54V406" /><path d="M110 334L270 92M194 392L366 62M290 398L474 102M382 372L542 158" /><path d="M94 230H546M320 42V418" /></g>
                  <text x="320" y="270" textAnchor="middle">MIRIT</text>
                </svg>
              ) : (
                <Image
                  src={path === "culture" ? "/images/gambia/community-connection-concept.png" : "/images/gambia/community-dialogue-concept.png"}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
              )}
              <span className="work-path-number">0{index + 1}</span>
            </div>
            <div className="work-path-label"><h2>{t(`paths.${path}.title`)}</h2><span aria-hidden="true">↓</span></div>
          </a>
        ))}
      </section>

      <div className="work-entries">
        {paths.map((path, index) => (
          <section key={path} id={`work-${path}`} className={`work-entry work-entry-${path}`}>
            <ScrollReveal className="work-entry-heading">
              <div><span>0{index + 1}</span><p className="eyebrow">{t(`paths.${path}.eyebrow`)}</p></div>
              <h2>{t(`paths.${path}.title`)}</h2>
            </ScrollReveal>
            <div className="work-entry-layout">
              <ScrollReveal className="work-entry-visual">
                {path === "digital" ? (
                  <div className="work-digital-canvas" aria-hidden="true">
                    <span>M</span><span>I</span><span>R</span><span>I</span><span>T</span>
                    <i /><i /><i />
                  </div>
                ) : (
                  <Image
                    src={path === "culture" ? "/images/gambia/creative-exchange-concept.png" : "/images/gambia/russia-gambia-cultural-bridge-concept.png"}
                    alt={t(`paths.${path}.imageAlt`)}
                    fill
                    sizes="(max-width: 760px) 100vw, 52vw"
                  />
                )}
              </ScrollReveal>
              <ScrollReveal className="work-entry-content" delay={100}>
                <p className="work-entry-status">{t(`paths.${path}.status`)}</p>
                <p className="work-entry-description">{t(`paths.${path}.text`)}</p>
                <ul>{[0, 1, 2, 3].map((item) => <li key={item}>{t(`paths.${path}.services.${item}`)}</li>)}</ul>
                <Link href={path === "culture" ? "/gambia-project" : path === "research" ? "/articles" : "/what-we-do"} className="text-link">
                  {t(`paths.${path}.cta`)} <span aria-hidden="true">↗</span>
                </Link>
              </ScrollReveal>
            </div>
          </section>
        ))}
      </div>

      <section className="work-closing">
        <ScrollReveal><p className="eyebrow">{t("closingEyebrow")}</p><h2>{t("closingTitle")}</h2><Link href="/contact" className="button-link">{t("closingCta")} <span aria-hidden="true">→</span></Link></ScrollReveal>
      </section>
    </main>
  );
}
