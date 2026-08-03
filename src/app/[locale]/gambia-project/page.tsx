import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function GambiaProjectPage() {
  const t = useTranslations("gambiaProject");

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-8">
    <Image
      src="https://picsum.photos/id/1015/1600/900"
      alt="Gambia Project"
      fill
      priority
      sizes="100vw"
      className="object-cover -z-10 brightness-50"
      />
        <div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-3xl mx-auto">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-3xl mx-auto px-8 py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">{t("missionTitle")}</h2>
        <p className="text-lg text-muted leading-relaxed">{t("missionText")}</p>
      </section>

      {/* Stats */}
      <section className="border-t border-muted/20 py-20 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-5xl font-bold">1,200+</p>
            <p className="mt-2 text-muted">{t("statStudents")}</p>
          </div>
          <div>
            <p className="text-5xl font-bold">15</p>
            <p className="mt-2 text-muted">{t("statSchools")}</p>
          </div>
          <div>
            <p className="text-5xl font-bold">40</p>
            <p className="mt-2 text-muted">{t("statTeachers")}</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-80 rounded-2xl overflow-hidden">
          <Image
            src="https://picsum.photos/id/1016/800/600"
            alt="Community learning center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">{t("storyTitle")}</h2>
          <p className="text-lg text-muted leading-relaxed">{t("storyText")}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-muted/20 py-24 px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{t("ctaTitle")}</h2>
        <p className="text-lg text-muted max-w-xl mx-auto mb-8">{t("ctaText")}</p>
        <Link
          href="/contact"
          className="bg-accent text-background px-8 py-3 rounded-full font-medium hover:opacity-80 transition-opacity inline-block"
        >
          {t("ctaButton")}
        </Link>
      </section>
    </main>
  );
}