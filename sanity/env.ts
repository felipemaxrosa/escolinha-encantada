export const apiVersion = "2024-10-01";

// Lê a convenção do Next (NEXT_PUBLIC_*) e a do Sanity Studio (SANITY_STUDIO_*),
// com fallback para o projeto da Escolinha Encantada (o projectId é público).
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "db2hcomt";
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

export const hasSanity = projectId.length > 0;
