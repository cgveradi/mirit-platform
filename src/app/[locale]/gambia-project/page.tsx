import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import GambiaGallerySlider from "@/components/GambiaGallerySlider";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "@/i18n/navigation";
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

const partners = [
  { name: "Russkiy Mir Foundation", logo: "/images/gambia/partners/russkiy-mir.png", width: 359, height: 156 },
  { name: "Volga Institute", logo: "/images/gambia/partners/volga-institute.png", width: 210, height: 210 },
  { name: "University of The Gambia", logo: "/images/gambia/partners/university-of-the-gambia.jpg", width: 400, height: 400 },
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
  const contentLocale = locale === "es" || locale === "de" ? "en" : locale;

  const { data } = await sanityFetch({
    query: projectBySlugQuery,
    params: {
      slug,
      locale: contentLocale,
    },
  });

  const project = data as GambiaProject | null;

  if (!project) {
    notFound();
  }

  const introText = locale === "ru"
    ? project.introText?.replace("meaningful connections", "содержательных связей")
    : project.introText;
  const galleryImages = [
    {
      src: "/images/gambia/mirit-class.jpeg",
      alt: t("heroAlt"),
      caption: t("photoCaption.class"),
    },
    {
      src: "/images/gambia/mirit-introduction.jpeg",
      alt: t("photoAlt.introduction"),
      caption: t("photoCaption.introduction"),
    },
    {
      src: "/images/gambia/mirit-alphabet.jpeg",
      alt: t("photoAlt.alphabet"),
      caption: t("photoCaption.alphabet"),
    },
    ...(project.gallery && project.gallery.length > 0
      ? project.gallery
      : conceptGallery.filter((_, index) => index !== 1)
    ).map((image) => ({
      src: "src" in image ? image.src : urlFor(image).width(1400).quality(85).url(),
      alt: "altKey" in image ? t(image.altKey) : image.alt || "",
      caption: "caption" in image ? image.caption : undefined,
    })),
  ];

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

      <section className="project-partners" aria-labelledby="project-partners-title">
        <ScrollReveal>
          <div className="project-partners-heading">
            <p className="eyebrow">{t("collaborationEyebrow")}</p>
            <h2 className="sr-only" id="project-partners-title">{t("collaborationTitle")}</h2>
          </div>
          <div className="project-partners-strip">
            {partners.map((partner) => (
              <span className="project-partner-name" key={partner.name}>
                <Image
                  src={partner.logo}
                  alt=""
                  width={partner.width}
                  height={partner.height}
                  aria-hidden="true"
                />
                <b>{partner.name}</b>
                <i aria-hidden="true">✦</i>
              </span>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="project-intro" id="project-overview">
        <p className="eyebrow">
          {t("introEyebrow")}
        </p>
        <div className="project-intro-layout">
          <ScrollReveal className="project-intro-visual">
            <figure className="project-intro-image">
              <Image
                src="/images/gambia/cultural-exchange-abstract.png"
                alt={t("conceptAlt.abstractExchange")}
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
        <ScrollReveal delay={80}>
        <dl className="project-details-grid project-intro-details">
          {(["dates", "location"] as const).map((key) => (
            <div key={key} className="project-detail-card">
              <dt>{t(`details.${key}.label`)}</dt>
              <dd>{t(`details.${key}.value`)}</dd>
            </div>
          ))}
        </dl>
        <a href="#project-program" className="scroll-cue project-details-cta">
          {t("exploreProject")} <span aria-hidden="true">↓</span>
        </a>
        </ScrollReveal>
      </section>

      {project.programItems && project.programItems.length > 0 && (
        <section className="project-program" id="project-program">
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
          <GambiaGallerySlider
            images={galleryImages}
            previousLabel={t("galleryPrevious")}
            nextLabel={t("galleryNext")}
            selectLabel={t("gallerySelect")}
          />
          </ScrollReveal>
        </section>

      <section className="project-cta learning-hub-cta" id="gambia-classroom">
        <ScrollReveal><div>
          <p className="eyebrow">{t("classroom.eyebrow")}</p>
          <h2>{t("classroom.title")}</h2>
          <p>{t("classroom.intro")}</p>
          <div className="learning-hub-features">
            <span>{t("classroom.homework")}</span>
            <span>{t("classroom.resources")}</span>
            <span>{t("classroom.comments")}</span>
          </div>
          <Link href="/gambia-project/classroom" className="button-link">
            {t("classroom.open")} <span aria-hidden="true">→</span>
          </Link>
        </div></ScrollReveal>
      </section>
    </main>
  );
}
