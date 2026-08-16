import { defineField, defineType } from "sanity";

export const classroomItem = defineType({
  name: "classroomItem",
  title: "Gambia Classroom",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "kind", title: "Type", type: "string", options: { list: [{ title: "Homework", value: "homework" }, { title: "Resource", value: "resource" }] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "locale", title: "Language", type: "string", options: { list: [{ title: "English", value: "en" }, { title: "Russian", value: "ru" }] }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "instructions", title: "Instructions", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "dueDate", title: "Due date", type: "datetime", hidden: ({ parent }) => parent?.kind !== "homework" }),
    defineField({ name: "resourceUrl", title: "Resource link", type: "url", hidden: ({ parent }) => parent?.kind !== "resource" }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
  ],
  preview: { select: { title: "title", subtitle: "kind" } },
});
