import { defineType, defineField } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Citação",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "author", title: "Autor", type: "string" }),
    defineField({
      name: "relation",
      title: "Relação",
      type: "string",
      description: "Ex.: Mãe de uma criança da creche",
    }),
    defineField({
      name: "isPlaceholder",
      title: "É um exemplo?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: { select: { title: "author", subtitle: "relation" } },
});
