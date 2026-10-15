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

// Fotos reais das instalações/salas (colhidas do slideshow do site antigo).
// Ordem = a do próprio slideshow da escola (exterior primeiro).
const FACILITIES = [
  "39d8f7_c74e63f5b47e4e039f0018b72d17b37f.jpg",
  "39d8f7_c157d76c5cc948f0b40a7f64c320ace5.jpg",
  "39d8f7_91c948332fb544b6b51e76d808296513.jpg",
  "39d8f7_23166bc628d6402099d756d1207a87c6.jpg",
  "39d8f7_61d60618df0044e1a6d14cbecdd4bdc7.jpg",
  "39d8f7_ae7ff94a76db4f9794c4c253e870f3b1.jpg",
  "39d8f7_5c8c9eafd1a3a669ea22789320a0b8e8.jpg",
  "39d8f7_8b0d6a4d696c4a038a991342f9128d1c.jpg",
  "39d8f7_0bebe74dbfcb4ded85db8d06ca2c45da.jpg",
  "39d8f7_dda25c7b4b71492d8150db17bba9a57c.jpg",
  "39d8f7_0113f0921a9f437a89c671aa97bddf7c.jpg",
  "39d8f7_ab0f773b4e82453ca57fc99e9cba5cad.jpg",
  "39d8f7_08e7b6bb19af6ee27e4dd436bbd2f667.jpg",
  "39d8f7_07a0caf4ecfa7aad3fc4e23dfed8744c.jpg",
  "39d8f7_65d8506c08fbf871e3bb79f3be14952e.jpg",
  "39d8f7_849ead34fdf044189a33a172089e5f9a.jpg",
  "39d8f7_68009a0865be4044a4437304d4cef92b.jpg",
  "39d8f7_419b47bfb2f14899b6005ad634c68356.jpg",
  "39d8f7_7f8318ffc428419e8a20330404b589d0.jpg",
  "39d8f7_4821d5ebec3549d111a4128689143830.jpg",
  "39d8f7_5245571024c84edf9f133d8addb3ff12.jpg",
  "39d8f7_9c08d0c0141a4a9c8286949134a94809.jpg",
  "39d8f7_9e6d3190c766900e0fab948adeadb395.jpg",
  "39d8f7_014e1813a37f4a099768152a391c6407.jpg",
  "39d8f7_4c83037b1c7947b186d588f771b22b3b.jpg",
  "39d8f7_8be6288229e046b9b06058ad4699ff61.jpg",
  "39d8f7_1aea8f6c64c44ef6a932eda872490940.jpg",
  "39d8f7_71e181a711030fccd5675640a5b5d9cd.jpg",
  "39d8f7_88e86e7b64464527b91e986722210553.jpg",
  "39d8f7_331dea15e1ef4253a977383bf7183587.jpg",
  "39d8f7_7d43e396302345328da8e942ab9b86fb.jpg",
  "39d8f7_3def6e55e3a54e9d85707cb36480d8a9.jpg",
  "39d8f7_7377c00e0aaf4054b6ba9b895cd1e54c.jpg",
  "39d8f7_c9c7a0a2644941ce9bb421ddba40fd3f.jpg",
  "39d8f7_9805597a91db4015c7a6fa8c6dea9405.jpg",
  "39d8f7_84f5f849661a4749a1c094b8c1a3e36b.jpg",
  "39d8f7_da20f64c036e4b8d980be301e42efd13.jpg",
  "39d8f7_34a9d1c739704d0ba7d5de5c705e8f71.jpg",
  "39d8f7_6da0c575c55749bd9689c6d29ecb6a75.jpg",
  "39d8f7_731739f44f80d4a36df9c5d1b5e5b4e0.jpg",
  "39d8f7_dda87c867c2f02ea90b690bd59a238cd.jpg",
  "39d8f7_e00d0ecb8bcd43ff8a411b18d84acb5a.jpg",
  "39d8f7_30139a34d5524a787a01494a447b859e.jpg",
  "39d8f7_e9e0e6d85aa1c6a2b777e545f7fda14a.jpg",
  "39d8f7_aa65ec4efddea7494d0302cb0a74e488.jpg",
  "39d8f7_a5720a18a73f43479b10f065c47bb571.jpg",
  "39d8f7_237b108f1531454085749286bc649351.jpg",
  "39d8f7_e05a9fa60b8e44c4a0b4d5ec3952a1de.jpg",
  "39d8f7_cdc3b37a28fa45ddb2286e1368eb5b0e.jpg",
  "39d8f7_cce0887b493f4d818ac97ba762bf889f.jpg",
  "39d8f7_3e082d11e8b546db96917dbefd21a894.jpg",
  "39d8f7_1dd5355e8be64c298ac081dbc1c87aec.jpg",
  "39d8f7_9e0070a231124a669dad78edcdca33ec.jpg",
  "39d8f7_c84ec93171784380b8c813bf087deaad.jpg",
  "39d8f7_d945c611096942a8ac932a4f1d38020b.jpg",
  "39d8f7_d5c5c2ef77034307bc3ff4a25113c9c6.jpg",
  "39d8f7_1827ebd101c34328a01002d52bb357fb.jpg",
  "39d8f7_f2cd4820ab864fc6acd2d9ea1177efad.jpg",
  "39d8f7_d495e64742f44dbd89c0845f6844cb62.jpg",
  "39d8f7_f75fa374002e4c42a98c4e5072b79688.jpg",
  "39d8f7_6c35a23f804c4f168dfc713f12d0e3f1.jpg",
  "39d8f7_055d0fd42c6e43b19d6c1bd555b64143.jpg",
  "39d8f7_7159e4724a2c47a9947e1b5a3778e415.jpg",
  "39d8f7_a89a1fdc427f473d8b72eb8b60b007f6.jpg",
  "39d8f7_30b3aefdf6db434cb2a1f1eed5b0d531.jpg",
  "39d8f7_56e3a7938bfc4add9c08f5287f31b208.jpg",
  "39d8f7_d120c4bfc18b45efa097d0c43d7429e4.jpg",
  "39d8f7_8d335aeda71747bd9a771f98820ea917.jpg",
  "39d8f7_f6213d4052f24dfaaa33ef7ec9129fea.jpg",
  "39d8f7_e4ef827e850c431ca490514b295f9f07.jpg",
  "39d8f7_c98564eefbac451982b1a1fbf643afa7.jpg",
  "39d8f7_dfc9fc91d63f4f6bb9690e47bbbdc208.jpg",
  "39d8f7_f82963a864af430087d4822c5811b4e6.jpg",
  "39d8f7_15ebe6c3507a4409ba99e442826f34f2.jpg",
  "39d8f7_dd1a250241074ba8a43a8d1c563197f0.jpg",
  "39d8f7_ceeb892a64c74a09b56edf5949a25ef2.jpg",
  "39d8f7_5068d4cb3d4f4ecbafc5ef6bab61f44f.jpg",
  "39d8f7_9c889c9e39794201aa7a504ab9cf6aab.jpg",
  "39d8f7_e14c59cebad240faba6dccc3ee328f72.jpg",
  "39d8f7_5b7602df5c6b410e9499d8df589e245f.jpg",
  "39d8f7_f616a81bf73b4761b320687c5b47ca68.jpg",
];

function docId(filename) {
  return "gallery-" + filename.replace(/[^a-zA-Z0-9]/g, "").slice(0, 28);
}

function facilityId(filename) {
  return "facility-" + filename.replace(/[^a-zA-Z0-9]/g, "").slice(0, 28);
}

async function seedFacility(filename, order) {
  const res = await fetch(BASE + filename);
  if (!res.ok) throw new Error(`download ${filename} → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buf, { filename });
  await client.createOrReplace({
    _id: facilityId(filename),
    _type: "facility",
    title: `Instalações — ${String(order + 1).padStart(2, "0")}`,
    image: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    },
    order,
  });
  console.log(`  ✓ instalação ${filename}`);
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
  console.log(`A semear ${GALLERY.length} fotos de galeria em ${projectId}/${dataset}…`);
  for (let i = 0; i < GALLERY.length; i++) {
    await seedImage(GALLERY[i], i);
  }
  console.log(`A semear ${FACILITIES.length} fotos de instalações…`);
  for (let i = 0; i < FACILITIES.length; i++) {
    await seedFacility(FACILITIES[i], i);
  }
  console.log("Concluído.");
}

main().catch((e) => {
  console.error("Erro no seed:", e.message);
  process.exit(1);
});
