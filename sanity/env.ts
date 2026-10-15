export const apiVersion = "2024-10-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** True quando o projeto Sanity está configurado (.env.local definido). */
export const hasSanity = projectId.length > 0;
