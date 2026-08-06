import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import GambiaApplicationForm from "@/components/GambiaApplicationForm";
import ScrollReveal from "@/components/ScrollReveal";
import { sanityFetch } from "@/sanity/lib/live";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type GambiaProject = {
  title: string;
  eyebrow?: string;
  heroSubtitle?: string;

  heroImage?: {
    asset: {
      _ref: string;
    };
  };

  introTitle?: string;
  introText?: string;

  programTitle?: string;
  programText?: string;

  programItems?: {
    number?: string;
    title: string;
    description?: string;
  }[];

  gallery?: {
    asset?: {
      _ref: string;
    };
    alt?: string;
    caption?: string;
  }[];

  ctaTitle?: string;
  ctaText?: string;
};

const conceptGallery = [
  { src: "/images/gambia/language-workshop-concept.png", altKey: "conceptAlt.language" },
  { src: "/images/gambia/creative-exchange-concept.png", altKey: "conceptAlt.creative" },
  { src: "/images/gambia/community-dialogue-concept.png", altKey: "conceptAlt.dialogue" },
  { src: "/images/gambia/community-connection-concept.png", altKey: "conceptAlt.community" },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("gambiaProject.seo");

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function GambiaProjectPage() {
  const locale = await getLocale();
  const t = await getTranslations("gambiaProject");

  // Each Sanity document has its own slug.
  const slug =
    locale === "ru"
      ? "proekt-v-gambii"
      : "gambia-project";

  const { data } = await sanityFetch({
    query: projectBySlugQuery,
    params: {
      slug,
      locale,
    },
  });

  const project = data as GambiaProject | null;

  if (!project) {
    notFound();
  }

  const introText = locale === "ru"
    ? project.introText?.replace("meaningful connections", "содержательных связей")
    : project.introText;

  return (
    <main>
      <section className="project-hero">
        <Image
          src={project.heroImage
            ? urlFor(project.heroImage).width(2000).quality(85).url()
            : "/images/gambia/language-workshop-concept.png"}
          alt={t("heroAlt")}
          fill
          priority
          sizes="100vw"
          className="project-hero-image"
        />

        <div className="project-hero-overlay" />
        <div className="project-hero-content">
          {project.eyebrow && (
            <p className="project-eyebrow project-reveal">
              {project.eyebrow}
            </p>
          )}

          <h1 className="project-hero-title project-reveal">
            {project.title}
          </h1>

          {project.heroSubtitle && (
            <p className="project-hero-subtitle project-reveal">
              {project.heroSubtitle}
            </p>
          )}
        </div>
        <p className="project-hero-index" aria-hidden="true">01 / MIRIT</p>
      </section>

      <section className="project-details" aria-labelledby="project-details-title">
        <ScrollReveal><div className="project-details-heading">
          <p className="eyebrow">{t("detailsEyebrow")}</p>
          <h2 id="project-details-title">{t("detailsTitle")}</h2>
          <p>{t("detailsIntro")}</p>
        </div></ScrollReveal>
        <ScrollReveal delay={80}>
        <dl className="project-details-grid">
          {(["dates", "location", "deadline", "fee", "capacity", "eligibility"] as const).map((key) => (
            <div key={key} className="project-detail-card">
              <dt>{t(`details.${key}.label`)}</dt>
              <dd>{t(`details.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
        <p className="project-details-note">{t("detailsNote")}</p>
        </ScrollReveal>
      </section>

      <section className="project-intro">
        <p className="eyebrow">
          {t("introEyebrow")}
        </p>
        <div className="project-intro-layout">
          <ScrollReveal className="project-intro-visual">
            <figure className="project-intro-image">
              <Image
                src="/images/gambia/russia-gambia-cultural-bridge-concept.png"
                alt={t("introImageAlt")}
                fill
                sizes="(max-width: 760px) 100vw, 42vw"
                className="object-cover"
              />
            </figure>
          </ScrollReveal>
          <ScrollReveal className="project-intro-content" delay={120}>
            {project.introTitle && <h2>{project.introTitle}</h2>}
            {introText && <p className="project-intro-copy">{introText}</p>}
          </ScrollReveal>
        </div>
      </section>

      {project.programItems && project.programItems.length > 0 && (
        <section className="project-program">
          <div className="project-program-inner">
            <ScrollReveal>
            <div className="project-program-heading">
              <p className="eyebrow">
                {t("programEyebrow")}
              </p>

              {project.programTitle && (
                <h2>
                  {project.programTitle}
                </h2>
              )}

              {project.programText && (
                <p>
                  {project.programText}
                </p>
              )}
            </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
            <div className="project-program-grid">
              {project.programItems.map((item, index) => (
                <div
                  key={`${item.number ?? index}-${item.title}`}
                  className="project-program-card"
                >
                  {item.number && (
                    <span>
                      {item.number}
                    </span>
                  )}

                  <h3>
                    {item.title}
                  </h3>

                  {item.description && (
                    <p>
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <section className="project-gallery">
          <ScrollReveal>
          <div className="project-gallery-heading">
            <p className="eyebrow">
              {t("galleryEyebrow")}
            </p>

            <h2>
              {t("galleryTitle")}
            </h2>
          </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
          <div className="project-gallery-grid">
            {(project.gallery && project.gallery.length > 0 ? project.gallery : conceptGallery).map((image, index) => (
              <figure
                key={"src" in image ? image.src : image.asset?._ref ?? index}
                className="project-gallery-image"
              >
                <Image
                  src={"src" in image ? image.src : urlFor(image).width(1200).quality(85).url()}
                  alt={"altKey" in image ? t(image.altKey) : image.alt || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                {"caption" in image && image.caption && <figcaption>{image.caption}</figcaption>}
              </figure>
            ))}
          </div>
          </ScrollReveal>
        </section>

      <section className="project-cta">
        <ScrollReveal><div>
        {project.ctaTitle && (
          <h2>
            {project.ctaTitle}
          </h2>
        )}

        {project.ctaText && (
          <p>
            {project.ctaText}
          </p>
        )}

        <GambiaApplicationForm />
        </div></ScrollReveal>
      </section>
    </main>
  );
}
