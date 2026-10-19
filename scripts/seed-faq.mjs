// Seed das FAQs para o Sanity (fonte editável). Espelha o fallback de content/faq.ts.
// Correr: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-faq.mjs
// Idempotente: createOrReplace com _id determinístico.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

const FAQ = [
  {
    question: "A partir de que idade posso inscrever o meu filho?",
    answer:
      "Recebemos crianças desde os primeiros meses de vida, no berçário, passando pela creche e pelo pré-escolar, até à entrada na escola.",
  },
  {
    question: "Qual é o horário?",
    answer:
      "Estamos abertos das 8h00 às 19h30, de segunda a sexta-feira. A componente letiva decorre das 9h30 às 17h30; o restante tempo é dedicado ao acolhimento, às refeições, à higiene e à sesta.",
  },
  {
    question: "Que atividades extracurriculares oferecem?",
    answer:
      "Música (com a Academia de Música de Coimbra), Inglês (International House) e Natação (Académica), integradas no dia a dia da escola.",
  },
  {
    question: "As refeições são fornecidas?",
    answer:
      "Sim. As refeições são confecionadas na escola e adaptadas a cada faixa etária, com ementas pensadas para uma alimentação saudável.",
  },
  {
    question: "Que metodologia utilizam?",
    answer:
      "Inspiramo-nos no modelo High/Scope: aprendizagem pela ação, através do ciclo planear – fazer – rever, com o educador a apoiar a iniciativa de cada criança.",
  },
  {
    question: "Posso visitar a escola antes de decidir?",
    answer:
      "Com todo o gosto. Agende uma visita e mostramos-lhe os espaços, apresentamos a equipa e respondemos a todas as suas questões.",
  },
  {
    question: "Onde ficam localizados?",
    answer:
      "No centro de Coimbra — Travessa Sanches da Gama, 50, na Arregaça. Fácil de chegar e no coração da cidade.",
  },
];

async function main() {
  console.log(`A semear ${FAQ.length} FAQs em ${projectId}/${dataset}…`);
  for (let i = 0; i < FAQ.length; i++) {
    await client.createOrReplace({
      _id: `faq-${i + 1}`,
      _type: "faqItem",
      question: FAQ[i].question,
      answer: FAQ[i].answer,
      order: i,
    });
    console.log(`  ✓ ${FAQ[i].question}`);
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
