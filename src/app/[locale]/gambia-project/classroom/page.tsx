import type { Metadata } from "next";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getLocale, getTranslations } from "next-intl/server";

import ClassroomComments from "@/components/ClassroomComments";
import ClassroomResourceGallery from "@/components/ClassroomResourceGallery";
import InteractiveHomework, { type InteractiveQuestion } from "@/components/InteractiveHomework";
import { sanityFetch } from "@/sanity/lib/live";
import { classroomItemsQuery } from "@/sanity/lib/queries";

type ClassroomItem = {
  _id: string;
  title: string;
  kind: "homework" | "resource";
  summary: string;
  instructions?: PortableTextBlock[];
  dueDate?: string;
  resourceUrl?: string;
  questions?: InteractiveQuestion[];
};

const visualResources = [
  {
    src: "/images/classroom/english-russian-alphabet.jpeg",
    width: 1280,
    height: 657,
    titleKey: "alphabetTitle",
    summaryKey: "alphabetSummary",
    altKey: "alphabetAlt",
    layout: "wide",
  },
  {
    src: "/images/classroom/russian-syllable-chart.png",
    width: 1024,
    height: 1536,
    titleKey: "syllablesTitle",
    summaryKey: "syllablesSummary",
    altKey: "syllablesAlt",
    layout: "portrait",
  },
  {
    src: "/images/classroom/russian-syllable-practice.png",
    width: 1024,
    height: 1536,
    titleKey: "practiceTitle",
    summaryKey: "practiceSummary",
    altKey: "practiceAlt",
    layout: "portrait",
  },
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("classroom");
  return { title: t("seoTitle"), description: t("seoDescription") };
}

export default async function ClassroomPage() {
  const locale = await getLocale();
  const t = await getTranslations("classroom");
  let items: ClassroomItem[] = [];
  try {
    const { data } = await sanityFetch({ query: classroomItemsQuery, params: { locale } });
    items = (data ?? []) as ClassroomItem[];
  } catch {
    // Keep the classroom available with its empty states if the CMS is temporarily unreachable.
  }
  const homework = items.filter((item) => item.kind === "homework");
  const resources = items.filter((item) => item.kind === "resource");

  return (
    <main className="classroom-page">
      <header className="classroom-hero">
        <p className="eyebrow">{t("eyebrow")}</p>
        <div className="classroom-hero-grid">
          <h1>{t("title")}</h1>
          <div className="classroom-hero-intro">
            <p>{t("intro")}</p>
            <span>{t("venue")}</span>
          </div>
        </div>
        <div className="classroom-bridge-system" aria-label={t("bannerAlt")}>
          <div className="classroom-bridge-place"><i /> <span>Russia</span></div>
          <div className="classroom-bridge-route" aria-hidden="true"><i /><i /><i /></div>
          <div className="classroom-bridge-place classroom-bridge-place-gambia"><i /> <span>The Gambia</span></div>
        </div>
      </header>

      <section className="classroom-section">
        <div className="classroom-section-heading"><p className="eyebrow">01</p><h2>{t("homeworkTitle")}</h2></div>
        {homework.length ? <div className="classroom-grid">{homework.map((item) => (
          <article className="classroom-card" key={item._id}>
            <p className="classroom-card-meta">{item.dueDate ? t("due", { date: new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(new Date(item.dueDate)) }) : t("homework")}</p>
            <h3>{item.title}</h3><p>{item.summary}</p>
            {item.instructions && <div className="classroom-instructions"><PortableText value={item.instructions} /></div>}
            {item.questions && item.questions.length > 0 && <InteractiveHomework itemId={item._id} questions={item.questions} />}
            <ClassroomComments itemId={item._id} />
          </article>
        ))}</div> : <p className="classroom-empty">{t("homeworkEmpty")}</p>}
      </section>

      <section className="classroom-section">
        <div className="classroom-section-heading"><p className="eyebrow">02</p><h2>{t("resourcesTitle")}</h2></div>
        <ClassroomResourceGallery
          resources={visualResources.map((resource) => ({ ...resource, title: t(resource.titleKey), summary: t(resource.summaryKey), alt: t(resource.altKey) }))}
          visualGuideLabel={t("visualGuide")}
          viewFullSizeLabel={t("viewFullSize")}
          closeLabel={t("closeViewer")}
        />
        {resources.length > 0 && <div className="classroom-grid classroom-linked-resources">{resources.map((item) => (
          <article className="classroom-card" key={item._id}>
            <p className="classroom-card-meta">{t("resource")}</p><h3>{item.title}</h3><p>{item.summary}</p>
            {item.resourceUrl && <a className="text-link" href={item.resourceUrl} target="_blank" rel="noreferrer">{t("openResource")} ↗</a>}
          </article>
        ))}</div>}
      </section>

      <section className="classroom-section classroom-questions-section">
        <div className="classroom-section-heading"><p className="eyebrow">03</p><h2>{t("questionsTitle")}</h2></div>
        <div className="classroom-question-card">
          <p>{t("questionsIntro")}</p>
          <ClassroomComments itemId="general" />
        </div>
      </section>
    </main>
  );
}
