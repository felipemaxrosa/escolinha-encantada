import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "escolinha-encantada",
  deployment: { appId: "mdui2naox58hmq84lwh3f4ve" },
});
