import type { MetadataRoute } from "next";

const base =
  process.env.NEXT_PUBLIC_SITE_URL || "https://escolinha-encantada.vercel.app";

const routes = [
  "",
  "/programas",
  "/metodologia",
  "/equipa",
  "/instalacoes",
  "/galeria",
  "/inscricao",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
