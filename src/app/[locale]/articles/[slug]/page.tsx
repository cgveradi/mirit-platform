import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import { articleBySlugQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';

type Article = {
  title: string;
  excerpt?: string;
  category?: string;
  body?: any;
  publishedAt?: string;
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const article = await client.fetch<Article | null>(articleBySlugQuery, {
    slug,
    locale,
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-8 py-24">
      <p className="text-sm text-muted uppercase tracking-wide mb-4">
        {article.category}
      </p>
      <h1 className="text-4xl font-bold mb-8">{article.title}</h1>
      <div className="prose prose-invert max-w-none">
        <PortableText value={article.body} />
      </div>
    </main>
  );
}