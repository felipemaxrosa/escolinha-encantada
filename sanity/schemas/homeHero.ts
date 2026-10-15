import { defineType, defineField, defineArrayMember } from "sanity";

export const homeHero = defineType({
  name: "homeHero",
  title: "Hero da Home",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Título", type: "string" }),
    defineField({
      name: "subheading",
      title: "Subtítulo",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "slides",
      title: "Slides do carrossel",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "slide",
          fields: [
            defineField({
              name: "image",
              title: "Imagem",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Texto alternativo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "alt", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { select: { title: "heading" } },
});
