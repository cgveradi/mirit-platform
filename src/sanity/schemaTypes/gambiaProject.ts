import { defineField, defineType } from "sanity";

export const gambiaProject = defineType({
  name: "gambiaProject",
  title: "Gambia Project",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Russian", value: "ru" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
    }),

    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "introTitle",
      title: "Introduction Title",
      type: "string",
    }),

    defineField({
      name: "introText",
      title: "Introduction Text",
      type: "text",
      rows: 8,
    }),

    defineField({
      name: "programTitle",
      title: "Program Title",
      type: "string",
    }),

    defineField({
      name: "programText",
      title: "Program Introduction",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "programItems",
      title: "Program Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Number",
              type: "string",
            }),

            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "number",
            },
          },
        },
      ],
    }),

    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),

    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
    }),

    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      rows: 5,
    }),
  ],
});