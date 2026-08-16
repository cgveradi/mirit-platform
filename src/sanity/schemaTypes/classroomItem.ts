import { defineArrayMember, defineField, defineType } from "sanity";

export const classroomItem = defineType({
  name: "classroomItem",
  title: "Gambia Classroom",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", description: "A short title students will immediately understand.", type: "string", validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, hidden: ({ value }) => value === undefined, readOnly: true, deprecated: { reason: "Classroom items no longer need a slug." } }),
    defineField({ name: "kind", title: "Type", type: "string", initialValue: "homework", options: { list: [{ title: "Homework", value: "homework" }, { title: "Dictionary or resource", value: "resource" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "locale", title: "Website language", description: "English content appears on the English classroom; Russian content appears on the Russian classroom.", type: "string", initialValue: "en", options: { list: [{ title: "English", value: "en" }, { title: "Russian", value: "ru" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "instructions", title: "Homework instructions", description: "Add the steps, vocabulary or exercise students should complete.", type: "array", of: [defineArrayMember({ type: "block" })], hidden: ({ parent }) => parent?.kind !== "homework" }),
    defineField({ name: "dueDate", title: "Due date", type: "datetime", hidden: ({ parent }) => parent?.kind !== "homework" }),
    defineField({ name: "resourceUrl", title: "Resource link", description: "Paste the full website address, beginning with https://", type: "url", hidden: ({ parent }) => parent?.kind !== "resource", validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).custom((value, context) => context.parent && (context.parent as { kind?: string }).kind === "resource" && !value ? "A link is required for a resource." : true) }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime", initialValue: () => new Date().toISOString(), validation: (Rule) => Rule.required() }),
  ],
  orderings: [{ title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", kind: "kind", locale: "locale", dueDate: "dueDate" },
    prepare({ title, kind, locale, dueDate }) {
      const type = kind === "resource" ? "Resource" : "Homework";
      const due = dueDate ? ` · due ${new Date(dueDate).toLocaleDateString("en-GB")}` : "";
      return { title, subtitle: `${type} · ${(locale ?? "en").toUpperCase()}${due}` };
    },
  },
});
