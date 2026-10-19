import type { SchemaTypeDefinition } from "sanity";
import { homeHero } from "./homeHero";
import { aboutVideo } from "./about-video";
import { program } from "./program";
import { faqItem } from "./faqItem";
import { galleryImage } from "./galleryImage";
import { teamMember } from "./teamMember";
import { facility } from "./facility";
import { testimonial } from "./testimonial";

export const schemaTypes: SchemaTypeDefinition[] = [
  homeHero,
  aboutVideo,
  program,
  faqItem,
  galleryImage,
  teamMember,
  facility,
  testimonial,
];
