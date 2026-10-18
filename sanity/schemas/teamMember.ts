import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Membro da Equipa",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "role", title: "Função", type: "string" }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "bio", title: "Bio curta", type: "text", rows: 3 }),
    defineField({
      name: "fullBio",
      title: "Descrição (modal)",
      type: "text",
      rows: 4,
      description: "Texto mais longo, mostrado no modal de detalhes.",
    }),
    defineField({
      name: "qualifications",
      title: "Formação / qualificações",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista mostrada no modal de detalhes.",
    }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});
