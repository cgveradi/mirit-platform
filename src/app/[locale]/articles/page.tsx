import { client } from '@/sanity/lib/client';
import { articlesListQuery } from '@/sanity/lib/queries';
import { Link } from '@/i18n/navigation';
import ScrollReveal from '@/components/ScrollReveal';

type Article = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: string;
  publishedAt?: string;
};

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const articles = await client.fetch<Article[]>(articlesListQuery, { locale });

  return (
    <main className="max-w-3xl mx-auto px-8 py-24">
      <ScrollReveal><h1 className="text-4xl font-bold mb-12 text-center">Insights</h1></ScrollReveal>

      <div className="flex flex-col gap-10">
        {articles.map((article, index) => (
          <ScrollReveal key={article._id} delay={Math.min(index * 60, 180)}>
            <Link href={`/articles/${article.slug.current}`} className="block border-b border-muted/20 pb-8">
              <p className="text-sm text-muted uppercase tracking-wide mb-2">{article.category}</p>
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-muted">{article.excerpt}</p>
            </Link>
          </ScrollReveal>
        ))}

        {articles.length === 0 && (
          <p className="text-muted text-center">No articles yet — check back soon.</p>
        )}
      </div>
    </main>
  );
}
