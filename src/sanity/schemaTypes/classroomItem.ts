import { defineArrayMember, defineField, defineType } from "sanity";

export const classroomItem = defineType({
  name: "classroomItem",
  title: "Gambia Classroom",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", description: "A short title students will immediately understand.", type: "string", validation: (Rule) => Rule.required().max(120) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, hidden: ({ value }) => value === undefined, readOnly: true, deprecated: { reason: "Classroom items no longer need a slug." } }),
    defineField({ name: "kind", title: "Type", type: "string", initialValue: "homework", options: { list: [{ title: "Homework", value: "homework" }, { title: "Dictionary or resource", value: "resource" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "locale", title: "Website language", description: "Choose the language version where this content should appear.", type: "string", initialValue: "en", options: { list: [{ title: "English", value: "en" }, { title: "Russian", value: "ru" }, { title: "Spanish", value: "es" }, { title: "German", value: "de" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "instructions", title: "Homework instructions", description: "Add the steps, vocabulary or exercise students should complete.", type: "array", of: [defineArrayMember({ type: "block" })], hidden: ({ parent }) => parent?.kind !== "homework" }),
    defineField({
      name: "questions",
      title: "Interactive exercise",
      description: "Add questions students can answer, check and submit directly in the classroom.",
      type: "array",
      hidden: ({ parent }) => parent?.kind !== "homework",
      of: [
        defineArrayMember({
          name: "interactiveQuestion",
          title: "Question",
          type: "object",
          fields: [
            defineField({ name: "questionType", title: "Answer format", type: "string", initialValue: "shortAnswer", options: { list: [{ title: "Short answer", value: "shortAnswer" }, { title: "Multiple choice", value: "multipleChoice" }, { title: "Fill in the blank", value: "fillBlank" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
            defineField({ name: "prompt", title: "Question", type: "text", rows: 2, validation: (Rule) => Rule.required().max(500) }),
            defineField({ name: "hint", title: "Optional hint", type: "string", validation: (Rule) => Rule.max(200) }),
            defineField({
              name: "acceptedAnswers",
              title: "Accepted answers",
              description: "Add spelling variants as separate answers. Checking ignores capitalisation and extra spaces.",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              hidden: ({ parent }) => parent?.questionType === "multipleChoice",
              validation: (Rule) => Rule.custom((value, context) => {
                const questionType = (context.parent as { questionType?: string } | undefined)?.questionType;
                return questionType !== "multipleChoice" && (!value || value.length === 0) ? "Add at least one accepted answer." : true;
              }),
            }),
            defineField({
              name: "options",
              title: "Choices",
              type: "array",
              hidden: ({ parent }) => parent?.questionType !== "multipleChoice",
              of: [defineArrayMember({ name: "answerOption", title: "Choice", type: "object", fields: [defineField({ name: "label", title: "Answer", type: "string", validation: (Rule) => Rule.required().max(200) }), defineField({ name: "isCorrect", title: "Correct answer", type: "boolean", initialValue: false })], preview: { select: { title: "label", isCorrect: "isCorrect" }, prepare({ title, isCorrect }) { return { title, subtitle: isCorrect ? "Correct answer" : "Incorrect answer" }; } } })],
              validation: (Rule) => Rule.custom((value, context) => {
                const questionType = (context.parent as { questionType?: string } | undefined)?.questionType;
                if (questionType !== "multipleChoice") return true;
                if (!value || value.length < 2) return "Add at least two choices.";
                return (value as { isCorrect?: boolean }[]).filter((option) => option.isCorrect).length === 1 ? true : "Select exactly one correct answer.";
              }),
            }),
            defineField({ name: "explanation", title: "Explanation after checking", type: "text", rows: 2, validation: (Rule) => Rule.max(500) }),
          ],
          preview: { select: { title: "prompt", questionType: "questionType" }, prepare({ title, questionType }) { const labels: Record<string, string> = { shortAnswer: "Short answer", multipleChoice: "Multiple choice", fillBlank: "Fill in the blank" }; return { title, subtitle: labels[questionType] ?? "Question" }; } },
        }),
      ],
    }),
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
