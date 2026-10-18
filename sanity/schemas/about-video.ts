import { defineType, defineField } from "sanity";

// Singleton: vídeo sobre a história da escola (editável pela escola).
export const aboutVideo = defineType({
  name: "aboutVideo",
  title: "Vídeo da história",
  type: "document",
  fields: [
    defineField({
      name: "youtubeUrl",
      title: "URL do YouTube",
      type: "url",
      description:
        "Cole o link do vídeo (ex. https://www.youtube.com/watch?v=...). Deixe vazio para esconder a secção.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "caption", title: "Legenda", type: "text", rows: 2 }),
    defineField({
      name: "poster",
      title: "Imagem de capa (opcional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Capa mostrada antes de reproduzir. Se vazia, usa a miniatura do YouTube.",
    }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: title || "Vídeo da história" }),
  },
});
