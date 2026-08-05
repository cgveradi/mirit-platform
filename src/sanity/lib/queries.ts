import { groq } from 'next-sanity';

export const articlesListQuery = groq`
  *[_type == "article" && locale == $locale] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    coverImage,
    publishedAt
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && locale == $locale][0] {
    _id,
    title,
    excerpt,
    category,
    coverImage,
    body,
    publishedAt
  }
`;