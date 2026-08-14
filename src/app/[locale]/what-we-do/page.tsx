import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "@/i18n/navigation";

const capabilityGroups = ["strategy", "experience", "technology"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("whatWeDo.seo");
  return { title: t("title"), description: t("description") };
}

export default async function WhatWeDoPage() {
  const t = await getTranslations("whatWeDo");

  return (
    <main className="services-page">
      <section className="services-hero services-hero-editorial">
        <div className="services-orbit-field" aria-hidden="true">
          <i className="services-orbit services-orbit-one" />
          <i className="services-orbit services-orbit-two" />
          <i className="services-orbit services-orbit-three" />
          <span className="services-orbit-node services-orbit-node-one" />
          <span className="services-orbit-node services-orbit-node-two" />
          <span className="services-orbit-node services-orbit-node-three" />
        </div>
        <p className="eyebrow services-reveal">{t("eyebrow")}</p>
        <h1 className="services-reveal">{t("title")}</h1>
        <div className="services-hero-bottom services-hero-bottom-index services-reveal">
          <span aria-hidden="true">01 / 03</span>
        </div>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <ScrollReveal className="capabilities-heading">
          <p className="eyebrow">{t("capabilitiesEyebrow")}</p>
          <div className="capabilities-title-wrap">
            <h2 id="capabilities-title">{t("capabilitiesTitle")}</h2>
            <p>{t("capabilitiesIntro")}</p>
          </div>
        </ScrollReveal>
        <div className="capabilities-grid">
          {capabilityGroups.map((group, index) => (
            <ScrollReveal key={group} className="capability-column" delay={index * 90}>
              <div className="capability-topline"><span>0{index + 1}</span><span>{t("capabilityLabel")}</span></div>
              <div className={`capability-visual capability-visual-${group}`} aria-hidden="true">
                <i /><i /><i />
              </div>
              <div className="capability-content">
                <h3>{t(`capabilities.${group}.title`)}</h3>
                <ul>
                  {[0, 1, 2, 3].map((item) => <li key={item}>{t(`capabilities.${group}.items.${item}`)}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="services-closing">
        <ScrollReveal>
          <p className="eyebrow">{t("closingEyebrow")}</p>
          <h2>{t("closingTitle")}</h2>
          <Link href="/contact" className="button-link">{t("closingCta")} <span aria-hidden="true">↗</span></Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
