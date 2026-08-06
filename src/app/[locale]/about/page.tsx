import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/ScrollReveal";

export default function AboutPage() {
  const t = useTranslations("about");

  const principles = ["knowledge", "culture", "innovation"] as const;

  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow about-reveal">{t("eyebrow")}</p>
        <h1 className="about-reveal">{t("title")}</h1>
        <div className="about-hero-bottom about-reveal">
          <p>{t("intro")}</p>
          <span aria-hidden="true">01 / 03</span>
        </div>
      </section>

      <section className="about-story">
        <ScrollReveal>
          <p className="eyebrow">{t("storyEyebrow")}</p>
          <div className="about-story-grid">
            <h2>{t("storyTitle")}</h2>
            <div><p>{t("storyTextOne")}</p><p>{t("storyTextTwo")}</p></div>
          </div>
        </ScrollReveal>
      </section>

      <section className="about-principles">
        <ScrollReveal>
          <div className="about-principles-heading"><p className="eyebrow">{t("principlesEyebrow")}</p><p>{t("principlesIntro")}</p></div>
          <div className="about-principles-list">{principles.map((principle, index) => <article key={principle} className="about-principle"><span>0{index + 1}</span><h2>{t(`${principle}.title`)}</h2><p>{t(`${principle}.text`)}</p><span aria-hidden="true">↗</span></article>)}</div>
        </ScrollReveal>
      </section>

      <section className="about-closing">
        <ScrollReveal><p className="eyebrow">{t("closingEyebrow")}</p><h2>{t("closingTitle")}</h2><Link href="/contact" className="button-link">{t("closingCta")} <span aria-hidden="true">↗</span></Link></ScrollReveal>
      </section>
    </main>
  );
}
