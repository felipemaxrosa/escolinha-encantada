import type { SchemaTypeDefinition } from "sanity";
import { homeHero } from "./homeHero";
import { galleryImage } from "./galleryImage";
import { teamMember } from "./teamMember";
import { facility } from "./facility";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  homeHero,
  galleryImage,
  teamMember,
  facility,
  testimonial,
];
