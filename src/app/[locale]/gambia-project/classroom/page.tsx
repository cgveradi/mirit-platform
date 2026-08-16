import type { Metadata } from "next";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { getLocale, getTranslations } from "next-intl/server";

import ClassroomComments from "@/components/ClassroomComments";
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
};

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
            <ClassroomComments itemId={item._id} />
          </article>
        ))}</div> : <p className="classroom-empty">{t("homeworkEmpty")}</p>}
      </section>

      <section className="classroom-section">
        <div className="classroom-section-heading"><p className="eyebrow">02</p><h2>{t("resourcesTitle")}</h2></div>
        {resources.length ? <div className="classroom-grid">{resources.map((item) => (
          <article className="classroom-card" key={item._id}>
            <p className="classroom-card-meta">{t("resource")}</p><h3>{item.title}</h3><p>{item.summary}</p>
            {item.resourceUrl && <a className="text-link" href={item.resourceUrl} target="_blank" rel="noreferrer">{t("openResource")} ↗</a>}
          </article>
        ))}</div> : <p className="classroom-empty">{t("resourcesEmpty")}</p>}
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
