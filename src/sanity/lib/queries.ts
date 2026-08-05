import { defineQuery } from "next-sanity";

export const articlesListQuery = defineQuery(`
  *[
    _type == "article" &&
    locale == $locale
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    category,
    coverImage,
    publishedAt
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[
    _type == "article" &&
    slug.current == $slug &&
    locale == $locale
  ][0] {
    _id,
    title,
    slug,
    excerpt,
    category,
    coverImage,
    body,
    publishedAt,
    locale
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[
    _type == "gambiaProject" &&
    slug.current == $slug
  ][0] {
    _id,
    _type,
    title,
    slug,
    locale,
    eyebrow,
    heroSubtitle,
    heroImage,
    introTitle,
    introText,
    programTitle,
    programText,
    programItems[] {
      number,
      title,
      description
    },
    gallery,
    ctaTitle,
    ctaText
  }
`);