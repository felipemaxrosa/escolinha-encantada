import type { StructureResolver } from "sanity/structure";

// Hero da Home como singleton; restantes como coleções.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Hero da Home")
        .id("homeHero")
        .child(S.document().schemaType("homeHero").documentId("homeHero")),
      S.listItem()
        .title("Vídeo da história")
        .id("aboutVideo")
        .child(S.document().schemaType("aboutVideo").documentId("aboutVideo")),
      S.divider(),
      S.documentTypeListItem("galleryImage").title("Galeria"),
      S.documentTypeListItem("teamMember").title("Equipa"),
      S.documentTypeListItem("facility").title("Instalações"),
      S.documentTypeListItem("testimonial").title("Depoimentos"),
    ]);
