import Image from "next/image";
import { getTranslations } from "next-intl/server";
import ScrollReveal from "@/components/ScrollReveal";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <main className="about-page about-page-article">
      <article className="about-article">
        <div className="about-article-hero">
          <header>
            <p className="eyebrow about-reveal">{t("eyebrow")}</p>
            <h1 className="about-reveal">{t("title")}</h1>
          </header>
          <div className="about-article-image about-reveal">
            <Image src="/images/cards/about-mirit-editorial-v2.png" alt="" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
          </div>
        </div>
        <div className="about-article-body">
          <p>{t("intro")}</p>
          <div><p>{t("storyTextOne")}</p><p>{t("storyTextTwo")}</p></div>
        </div>
      </article>

      <section className="about-team about-team-minimal">
        <ScrollReveal>
          <p className="eyebrow">{t("teamEyebrow")}</p>
          <div className="about-team-intro"><h2>{t("teamTitle")}</h2><p>{t("teamIntro")}</p></div>
          <div className="team-profile-card" tabIndex={0} aria-label={t("ritaCardLabel")}>
            <div className="team-profile-card-inner">
              <div className="team-profile-front">
                <span className="team-profile-avatar classroom-comment-avatar classroom-comment-avatar-1" aria-hidden="true" />
                <span className="team-profile-front-copy"><small>MIRIT / 01</small><strong>Rita</strong><em>{t("ritaRole")}</em></span>
                <span className="team-profile-hint">{t("teamCardHint")} <i aria-hidden="true">↻</i></span>
              </div>
              <div className="team-profile-back">
                <small>RITA / MIRIT</small>
                <div className="team-profile-bio"><p>{t("ritaBio")}</p><dl><div><dt>{t("profileBirthplace")}</dt><dd>Tver, Russia</dd></div><div><dt>{t("profileLanguages")}</dt><dd>{t("ritaLanguages")}</dd></div><div><dt>{t("profileInterests")}</dt><dd>{t("ritaInterests")}</dd></div></dl></div>
                <span>{t("teamCardClose")} <i aria-hidden="true">↻</i></span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
