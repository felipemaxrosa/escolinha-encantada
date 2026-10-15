import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// projectId cai para "placeholder" quando não configurado, para o build não quebrar;
// as queries verificam `hasSanity` e devolvem fallback antes de chamar a API.
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});
