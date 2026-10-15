import { groq } from "next-sanity";
import { client } from "./client";
import { hasSanity } from "./env";
import type { ImageSource } from "./image";

export interface GalleryItem {
  _id: string;
  alt: string;
  image: ImageSource;
}
export interface TeamMemberItem {
  _id: string;
  name: string;
  role?: string;
  bio?: string;
  photo?: ImageSource;
}
export interface FacilityItem {
  _id: string;
  title: string;
  caption?: string;
  image: ImageSource;
}
export interface TestimonialItem {
  _id: string;
  quote: string;
  author?: string;
  relation?: string;
  isPlaceholder?: boolean;
}
export interface HeroSlide {
  alt: string;
  image: ImageSource;
}
export interface HeroDoc {
  heading?: string;
  subheading?: string;
  slides?: HeroSlide[];
}

// ISR com revalidação por tag (acionada pelo webhook do Sanity).
const opts = (tags: string[]) => ({ next: { tags, revalidate: 60 } });

export async function getHero(): Promise<HeroDoc | null> {
  if (!hasSanity) return null;
  return client.fetch(
    groq`*[_type == "homeHero"][0]{heading, subheading, slides[]{alt, image}}`,
    {},
    opts(["hero"]),
  );
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (!hasSanity) return [];
  return client.fetch(
    groq`*[_type == "galleryImage"]|order(order asc){_id, alt, image}`,
    {},
    opts(["gallery"]),
  );
}

export async function getTeam(): Promise<TeamMemberItem[]> {
  if (!hasSanity) return [];
  return client.fetch(
    groq`*[_type == "teamMember"]|order(order asc){_id, name, role, bio, photo}`,
    {},
    opts(["team"]),
  );
}

export async function getFacilities(): Promise<FacilityItem[]> {
  if (!hasSanity) return [];
  return client.fetch(
    groq`*[_type == "facility"]|order(order asc){_id, title, caption, image}`,
    {},
    opts(["facilities"]),
  );
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!hasSanity) return [];
  return client.fetch(
    groq`*[_type == "testimonial"]|order(_createdAt asc){_id, quote, author, relation, isPlaceholder}`,
    {},
    opts(["testimonials"]),
  );
}
