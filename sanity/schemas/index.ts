import type { SchemaTypeDefinition } from "sanity";
import { homeHero } from "./homeHero";
import { aboutVideo } from "./about-video";
import { galleryImage } from "./galleryImage";
import { teamMember } from "./teamMember";
import { facility } from "./facility";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  homeHero,
  aboutVideo,
  galleryImage,
  teamMember,
  facility,
  testimonial,
];
