import { defineType, defineField, defineArrayMember } from "sanity";

// O slug liga-se ao formulário de inscrição e ao sugestor de idade — por isso
// é uma lista fixa, não texto livre. O tom liga-se às cores do site.
const SLUGS = [
  { title: "Berçário", value: "bercario" },
  { title: "Creche", value: "creche" },
  { title: "Pré-escolar", value: "pre-escolar" },
];
const TONES = [
  { title: "Coral (Berçário)", value: "primary" },
  { title: "Menta (Creche)", value: "mint" },
  { title: "Lavanda (Pré-escolar)", value: "secondary" },
];

export const program = defineType({
  name: "program",
  title: "Programa",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identificador",
      type: "string",
      options: { list: SLUGS },
      description:
        "Ligado ao formulário de inscrição e ao sugestor de idade. Não alterar sem necessidade.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "ageBand", title: "Faixa etária", type: "string" }),
    defineField({ name: "tagline", title: "Frase curta", type: "string" }),
    defineField({ name: "summary", title: "Resumo", type: "text", rows: 3 }),
    defineField({
      name: "highlights",
      title: "Destaques",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "tone",
      title: "Cor",
      type: "string",
      options: { list: TONES },
      initialValue: "primary",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem (opcional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "ageBand", media: "image" } },
});
