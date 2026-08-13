import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "@/i18n/navigation";

const services = ["digital", "research", "culture"] as const;
const capabilityGroups = ["strategy", "experience", "technology"] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("whatWeDo.seo");
  return { title: t("title"), description: t("description") };
}

export default async function WhatWeDoPage() {
  const t = await getTranslations("whatWeDo");

  return (
    <main className="services-page">
      <section className="services-hero">
        <p className="eyebrow services-reveal">{t("eyebrow")}</p>
        <div className="services-hero-grid">
          <h1 className="services-reveal">{t("title")}</h1>
          <p className="services-lead services-reveal">{t("intro")}</p>
        </div>
      </section>

      <section className="services-list-section" aria-labelledby="services-list-title">
        <ScrollReveal className="services-list-heading">
          <p className="eyebrow">{t("servicesEyebrow")}</p>
          <h2 id="services-list-title">{t("servicesTitle")}</h2>
        </ScrollReveal>
        <div className="services-list">
          {services.map((service, index) => (
            <ScrollReveal key={service} delay={index * 65}>
              <article className="service-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{t(`services.${service}.title`)}</h3>
                  <p>{t(`services.${service}.text`)}</p>
                </div>
                <span className="service-row-arrow" aria-hidden="true">↗</span>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <ScrollReveal className="capabilities-heading">
          <p className="eyebrow">{t("capabilitiesEyebrow")}</p>
          <h2 id="capabilities-title">{t("capabilitiesTitle")}</h2>
        </ScrollReveal>
        <div className="capabilities-grid">
          {capabilityGroups.map((group, index) => (
            <ScrollReveal key={group} className="capability-column" delay={index * 90}>
              <h3>{t(`capabilities.${group}.title`)}</h3>
              <ul>
                {[0, 1, 2, 3].map((item) => <li key={item}>{t(`capabilities.${group}.items.${item}`)}</li>)}
              </ul>
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
