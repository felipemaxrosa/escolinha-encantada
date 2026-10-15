// Seed do Sanity: colhe fotos reais do site Wix antigo e cria documentos de galeria.
// Correr (na máquina com a CA corporativa no keychain):
//   NODE_OPTIONS=--use-system-ca node --env-file=.env.local scripts/seed-sanity.mjs
// Idempotente: usa createOrReplace com _id determinístico; o Sanity deduplica os assets.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Faltam NEXT_PUBLIC_SANITY_PROJECT_ID / SANITY_API_WRITE_TOKEN (no .env.local).",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

const BASE = "https://static.wixstatic.com/media/";

// Fotos reais do site antigo (logos excluídos).
const GALLERY = [
  "39d8f7_4ab28fe9a4d64d5d805e87eaa9be4b2f.jpg",
  "41d000_038e31b9d1a61a0f797be86513324815.jpg",
  "41d000_b96c30206658976dbea90628142766a3.jpg",
  "41d000_d819bec87997135f0c7853f8dbeea370.jpg",
  "39d8f7_32c70b2f949b444495c85a34117435f2.jpg",
  "39d8f7_897bfe4e25bc4cfabdd37e388f44273c~mv2.jpg",
  "39d8f7_fb8b7eca97b04f8ba50b2ad10907d9ee.jpg",
  "39d8f7_9b888b5d5a7441c2946f557c8ea5bb8e.jpg",
  "39d8f7_d77731b8d8074f02b9b0e2807e5c69d9.jpg",
  "39d8f7_ea2845a7f12b4e7f8090167aecd0c392.jpg",
];

function docId(filename) {
  return "gallery-" + filename.replace(/[^a-zA-Z0-9]/g, "").slice(0, 28);
}

async function seedImage(filename, order) {
  const res = await fetch(BASE + filename);
  if (!res.ok) throw new Error(`download ${filename} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  await client.createOrReplace({
    _id: docId(filename),
    _type: "galleryImage",
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
    alt: "Momento na Escolinha Encantada",
    order,
  });
  console.log(`  ✓ ${filename}`);
}

async function main() {
  console.log(`A semear ${GALLERY.length} imagens em ${projectId}/${dataset}…`);
  for (let i = 0; i < GALLERY.length; i++) {
    await seedImage(GALLERY[i], i);
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
