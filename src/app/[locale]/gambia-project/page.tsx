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

  console.log("GAMBIA DEBUG:", {
  locale,
  slug,
  project: data,
});

  const project = data as GambiaProject | null;

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center justify-center text-center px-8 overflow-hidden">
        <Image
          src={urlFor(project.heroImage)
            .width(2000)
            .quality(85)
            .url()}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.45]"
        />

        <div className="relative z-10 max-w-4xl">
          {project.eyebrow && (
            <p className="text-sm uppercase tracking-[0.25em] text-white/70 mb-6">
              {project.eyebrow}
            </p>
          )}

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            {project.title}
          </h1>

          {project.heroSubtitle && (
            <p className="mt-6 text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              {project.heroSubtitle}
            </p>
          )}
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="max-w-4xl mx-auto px-8 py-24 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-muted mb-4">
          {t("introEyebrow")}
        </p>

        {project.introTitle && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {project.introTitle}
          </h2>
        )}

        {project.introText && (
          <p className="text-lg text-muted leading-relaxed whitespace-pre-line">
            {project.introText}
          </p>
        )}
      </section>

      {/* PROGRAM */}
      {project.programItems && project.programItems.length > 0 && (
        <section className="border-t border-muted/20 px-8 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mb-16">
              <p className="text-sm uppercase tracking-[0.2em] text-muted mb-4">
                {t("programEyebrow")}
              </p>

              {project.programTitle && (
                <h2 className="text-3xl md:text-5xl font-bold">
                  {project.programTitle}
                </h2>
              )}

              {project.programText && (
                <p className="mt-6 text-lg text-muted leading-relaxed">
                  {project.programText}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-muted/20">
              {project.programItems.map((item, index) => (
                <div
                  key={`${item.number ?? index}-${item.title}`}
                  className="bg-background p-10"
                >
                  {item.number && (
                    <span className="text-sm text-muted">
                      {item.number}
                    </span>
                  )}

                  <h3 className="text-2xl font-semibold mt-4">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-4 text-muted leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 py-24">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              {t("galleryEyebrow")}
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              {t("galleryTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.map((image, index) => (
              <div
                key={image.asset?._ref ?? index}
                className="relative aspect-4/3 rounded-2xl overflow-hidden"
              >
                <Image
                  src={urlFor(image)
                    .width(1200)
                    .quality(85)
                    .url()}
                  alt={`${project.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-muted/20 py-24 px-8 text-center">
        {project.ctaTitle && (
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {project.ctaTitle}
          </h2>
        )}

        {project.ctaText && (
          <p className="text-lg text-muted max-w-2xl mx-auto mb-10">
            {project.ctaText}
          </p>
        )}

        <GambiaApplicationForm />
      </section>
    </main>
  );
}