import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Escolinha Encantada",
    short_name: "Encantada",
    description: "Creche, berçário e pré-escolar no centro de Coimbra desde 1994.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9f3",
    theme_color: "#ca4622",
    lang: "pt-PT",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
