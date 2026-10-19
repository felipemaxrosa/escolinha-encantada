// Seed dos programas para o Sanity (fonte editável). Espelha o fallback content/programs.ts.
// Correr: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-programs.mjs
// Idempotente: createOrReplace com _id determinístico (program-<slug>). Sem imagem (opcional no Studio).

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

const PROGRAMS = [
  {
    slug: "bercario",
    name: "Berçário",
    ageBand: "Dos primeiros meses ao 1.º ano",
    tagline: "Colo, segurança e descoberta",
    summary:
      "Um ambiente tranquilo e afetuoso, pensado para o conforto do bebé e para a tranquilidade dos pais. Cada rotina é vivida com calma e atenção individual.",
    highlights: [
      "Rotinas de sono e alimentação respeitadas",
      "Estimulação sensorial e motora suave",
      "Comunicação diária com as famílias",
      "Higiene e cuidados personalizados",
    ],
    tone: "primary",
  },
  {
    slug: "creche",
    name: "Creche",
    ageBand: "1 aos 3 anos",
    tagline: "Autonomia e primeiras amizades",
    summary:
      "A idade da exploração. Através da aprendizagem pela ação, a criança descobre o mundo, desenvolve a linguagem e constrói as primeiras relações — ao seu ritmo.",
    highlights: [
      "Aprendizagem pela ação (High/Scope)",
      "Desenvolvimento da linguagem e do movimento",
      "Socialização e partilha",
      "Progressão da autonomia sem pressas",
    ],
    tone: "mint",
  },
  {
    slug: "pre-escolar",
    name: "Pré-escolar",
    ageBand: "3 aos 6 anos",
    tagline: "Preparar a escola, com encanto",
    summary:
      "Preparamos a entrada na escola respeitando a criança como ser pensante e artístico. Planear, fazer e rever torna-se parte natural de cada dia.",
    highlights: [
      "Ciclo planear – fazer – rever",
      "Pré-leitura, pré-escrita e raciocínio",
      "Expressão artística e criativa",
      "Confiança para os próximos passos",
    ],
    tone: "secondary",
  },
];

async function main() {
  console.log(`A semear ${PROGRAMS.length} programas em ${projectId}/${dataset}…`);
  for (let i = 0; i < PROGRAMS.length; i++) {
    const p = PROGRAMS[i];
    await client.createOrReplace({
      _id: `program-${p.slug}`,
      _type: "program",
      slug: p.slug,
      name: p.name,
      ageBand: p.ageBand,
      tagline: p.tagline,
      summary: p.summary,
      highlights: p.highlights,
      tone: p.tone,
      order: i,
    });
    console.log(`  ✓ ${p.name}`);
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
