// Seed dos depoimentos (exemplos) para o Sanity. Espelha content/testimonials.ts.
// Correr: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-testimonials.mjs
// isPlaceholder=true marca-os como EXEMPLO (badge no site); substituir pelos reais depois.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

const TESTIMONIALS = [
  {
    quote:
      "A minha filha entra todas as manhãs a sorrir. Sente-se amada e nós sentimo-nos tranquilos.",
    author: "Exemplo",
    relation: "Mãe de uma criança da creche",
    isPlaceholder: true,
  },
  {
    quote:
      "A equipa acompanha cada passo com um carinho que se nota. A evolução dele foi enorme.",
    author: "Exemplo",
    relation: "Pai de uma criança do pré-escolar",
    isPlaceholder: true,
  },
  {
    quote:
      "Desde o berçário que nos sentimos em família. Comunicam connosco todos os dias.",
    author: "Exemplo",
    relation: "Mãe de um bebé do berçário",
    isPlaceholder: true,
  },
];

async function main() {
  console.log(`A semear ${TESTIMONIALS.length} depoimentos em ${projectId}/${dataset}…`);
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    await client.createOrReplace({
      _id: `testimonial-${i + 1}`,
      _type: "testimonial",
      ...TESTIMONIALS[i],
    });
    console.log(`  ✓ depoimento ${i + 1}`);
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
