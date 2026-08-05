import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import GambiaApplicationForm from "@/components/GambiaApplicationForm";
import { sanityFetch } from "@/sanity/lib/live";
import { projectBySlugQuery } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

type GambiaProject = {
  title: string;
  eyebrow?: string;
  heroSubtitle?: string;

  heroImage: {
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
  }[];

  ctaTitle?: string;
  ctaText?: string;
};

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

  return (
    <main>
      <section className="project-hero">
        <Image
          src={urlFor(project.heroImage)
            .width(2000)
            .quality(85)
            .url()}
          alt={project.title}
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

      <section className="project-intro">
        <p className="eyebrow">
          {t("introEyebrow")}
        </p>

        {project.introTitle && (
          <h2>
            {project.introTitle}
          </h2>
        )}

        {project.introText && (
          <p className="project-intro-copy">
            {project.introText}
          </p>
        )}
      </section>

      {project.programItems && project.programItems.length > 0 && (
        <section className="project-program">
          <div className="project-program-inner">
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
          </div>
        </section>
      )}

      {project.gallery && project.gallery.length > 0 && (
        <section className="project-gallery">
          <div className="project-gallery-heading">
            <p className="eyebrow">
              {t("galleryEyebrow")}
            </p>

            <h2>
              {t("galleryTitle")}
            </h2>
          </div>

          <div className="project-gallery-grid">
            {project.gallery.map((image, index) => (
              <div
                key={image.asset?._ref ?? index}
                className="project-gallery-image"
              >
                <Image
                  src={urlFor(image)
                    .width(1200)
                    .quality(85)
                    .url()}
                  alt={`${project.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="project-cta">
        <div>
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
        </div>
      </section>
    </main>
  );
}
