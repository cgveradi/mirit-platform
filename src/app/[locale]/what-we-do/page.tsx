import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("whatWeDo.seo");
  return { title: t("title"), description: t("description") };
}

export default async function WhatWeDoPage() {
  const t = await getTranslations("whatWeDo");

  return (
    <main className="miritai-page miritai-page-minimal">
      <section className="miritai-hero">
        <div className="miritai-hero-copy">
          <p className="eyebrow services-reveal">{t("eyebrow")}</p>
          <h1 className="services-reveal">MIRITAI</h1>
          <p className="miritai-lead services-reveal">{t("intro")}</p>
          <a className="button-link services-reveal" href="https://miritai.com" target="_blank" rel="noreferrer">{t("visitCta")} <span aria-hidden="true">↗</span></a>
        </div>
        <div className="miritai-hero-image services-reveal"><Image src="/images/miritai/data-ai-software-systems.png" alt="" fill priority sizes="(max-width: 760px) 100vw, 48vw" /></div>
      </section>
    </main>
  );
}
