// Seed/atualização dos membros da equipa (fotos + funções colhidas do site antigo).
// Correr: NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-team.mjs
//
// Sem duplicados: faz match por NOME. Se o membro já existe (ex. criado no
// Studio), só acrescenta a foto e a ordem — mantém a função/bio que a escola
// definiu. Caso contrário cria um novo doc com _id determinístico.
// A Cláudia (fundadora) é gerida à parte (já tem foto + detalhes) e não entra aqui.

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";

// Formação por pessoa (colhida das páginas de detalhe do site antigo).
const details = JSON.parse(
  readFileSync(new URL("./team-details.json", import.meta.url), "utf8"),
);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });
const BASE = "https://static.wixstatic.com/media/";

// Ordem = agrupamento do site antigo (pedagógica → educadoras → técnicas → cozinha).
const TEAM = [
  { name: "Maria Luís Martins", role: "Educadora de Infância · Coordenadora Pedagógica", order: 1, photo: "39d8f7_064b29adf13d49babcbb5c1b21b1bbbc.jpg" },
  { name: "Patrícia Peres", role: "Educadora de Infância", order: 2, photo: "39d8f7_4f7b220bf64b4b608bc2c8c1301a43a7~mv2.jpg" },
  { name: "Catarina Pita", role: "Educadora de Infância", order: 3, photo: "39d8f7_694271b8a41b46fb90821b74ea894408~mv2.jpg" },
  { name: "Susana Cardoso", role: "Coordenadora do pessoal não docente — jardim de infância", order: 4, photo: "39d8f7_bb866a4f747b48a7bd7aac72be4a1676.png" },
  { name: "Sofia Cardoso", role: "Coordenadora do pessoal não docente — creche", order: 5, photo: "39d8f7_d289b74a110e4466a0e279d67768cc8d~mv2.jpg" },
  { name: "Gina Pinto", role: "Subcoordenadora do pessoal não docente — creche", order: 6, photo: "39d8f7_dfbb4aa17c6248e481e64b5a8ed6c7d4~mv2.jpg" },
  { name: "Andreia Costa", role: "Técnica de Ação Educativa", order: 7, photo: "39d8f7_1111d0cea79f489f92d5a351b9f7bbfa~mv2.jpg" },
  { name: "Teresa Ferreira", role: "Técnica de Ação Educativa", order: 8, photo: "39d8f7_6b4752d5515141dc93131c41046980f8.jpg" },
  { name: "Carina Ribeiro", role: "Técnica de Ação Educativa", order: 9, photo: "39d8f7_94175da600ab416a963f5fd1cbcb23e2.png" },
  { name: "Elisabete Rabasquinho", role: "Técnica de Ação Educativa", order: 10, photo: "39d8f7_f57849090d2e40469e3aa84960997a9b.jpg" },
  { name: "Alexandra Palhinha", role: "Técnica de Ação Educativa", order: 11, photo: "39d8f7_9b04d0ef1417427d9e1a7848b8d9c1de.jpg" },
  { name: "Mariana Costa", role: "Técnica de Ação Educativa", order: 12, photo: "39d8f7_b7346ff9011b4dfb92a41cb00ca45a7e.jpg" },
  { name: "Fátima Antunes", role: "Técnica Profissional de Hotelaria, Restauração e Controlo", order: 13, photo: "39d8f7_06d6f08ff3d749dbbe5e0fe1df3e01e7.png" },
];

const slug = (s) =>
  "team-" +
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function uploadPhoto(mediaId) {
  const res = await fetch(BASE + mediaId);
  if (!res.ok) throw new Error(`download ${mediaId} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename: mediaId.replace("~", "_") });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function main() {
  const existing = await client.fetch(`*[_type=="teamMember"]{_id, name}`);
  const byName = new Map(existing.map((d) => [d.name.trim().toLowerCase(), d._id]));
  console.log(`${existing.length} membros já existem; a processar ${TEAM.length}…`);

  for (const m of TEAM) {
    const photo = await uploadPhoto(m.photo);
    const quals = details[m.name]?.quals;
    const qf = quals ? { qualifications: quals } : {};
    const existingId = byName.get(m.name.trim().toLowerCase());
    if (existingId) {
      await client.patch(existingId).set({ photo, order: m.order, ...qf }).commit();
      console.log(`  ~ ${m.name} (atualizado: foto + ordem${quals ? " + formação" : ""})`);
    } else {
      await client.createOrReplace({
        _id: slug(m.name),
        _type: "teamMember",
        name: m.name,
        role: m.role,
        order: m.order,
        photo,
        ...qf,
      });
      console.log(`  ✓ ${m.name} (criado${quals ? " + formação" : ""})`);
    }
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
